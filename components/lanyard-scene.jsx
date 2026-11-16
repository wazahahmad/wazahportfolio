"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
function faceTexture(photo, qr, back) {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 1080;
  const x = c.getContext("2d");
  x.fillStyle = "#edf1f5";
  x.fillRect(0, 0, 768, 1080);
  x.fillStyle = "#102044";
  x.fillRect(0, 0, 768, 155);
  x.fillStyle = "#85b9ff";
  x.font = "600 21px Arial";
  x.fillText("WAZAH / DIGITAL EXPERIENCES", 50, 55);
  x.fillStyle = "#ffffff";
  x.font = "bold 48px Arial";
  x.fillText(back ? "LET’S CONNECT" : "DEVELOPER", 50, 116);
  if (back) {
    x.fillStyle = "#ffffff";
    x.fillRect(94, 235, 580, 580);
    x.imageSmoothingEnabled = false;
    x.drawImage(qr.image, 114, 255, 540, 540);
    x.imageSmoothingEnabled = true;
    x.fillStyle = "#102044";
    x.textAlign = "center";
    x.font = "bold 40px Arial";
    x.fillText("Wazah Ahmad", 384, 900);
    x.font = "24px Arial";
    x.fillText("linkedin.com/in/wazahahmad", 384, 950);
    x.font = "20px Arial";
    x.fillText("SCAN TO CONNECT", 384, 1015);
  } else {
    const im = photo.image;
    const scale = Math.min(670 / im.width, 640 / im.height);
    x.drawImage(
      im,
      (768 - im.width * scale) / 2,
      170,
      im.width * scale,
      im.height * scale,
    );
    x.fillStyle = "#102044";
    x.fillRect(0, 805, 768, 275);
    x.fillStyle = "#fff";
    x.font = "bold 53px Arial";
    x.fillText("WAZAH AHMAD", 44, 886);
    x.fillStyle = "#8ebdff";
    x.font = "bold 28px Arial";
    x.fillText("SENIOR DEVELOPER", 46, 941);
    x.fillStyle = "#becce2";
    x.font = "20px Arial";
    x.fillText("WORDPRESS · PHP · AUTOMATION", 46, 995);
    x.font = "18px Arial";
    x.fillText("GUJRANWALA, PAKISTAN", 46, 1040);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function Badge({ flipped, setFlipped, reduced }) {
  const group = useRef(),
    ribbon = useRef(),
    drag = useRef(null),
    pos = useRef(new THREE.Vector3(0, -0.15, 0)),
    velocity = useRef(new THREE.Vector3()),
    { camera, invalidate } = useThree();
  const [photo, qr] = useTexture([
    "/images/portrait.webp",
    "/images/linkedin-qr.gif",
  ]);
  const faces = useMemo(
    () => [faceTexture(photo, qr, false), faceTexture(photo, qr, true)],
    [photo, qr],
  );
  useEffect(() => () => faces.forEach((t) => t.dispose()), [faces]);
  const strip = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(33 * 2 * 3), 3),
    );
    const idx = [];
    for (let i = 0; i < 32; i++) {
      const k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
    g.setIndex(idx);
    return g;
  }, []);
  useEffect(() => () => strip.dispose(), [strip]);
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    [],
  );
  const temp = useMemo(() => new THREE.Vector3(), []);
  useFrame((s, dt) => {
    dt = Math.min(dt, 0.03);
    const p = pos.current,
      v = velocity.current;
    const target = drag.current?.target;
    if (target) {
      v.set(0, 0, 0);
      p.lerp(target, 1 - Math.exp(-18 * dt));
    } else {
      const restX = reduced ? 0 : Math.sin(s.clock.elapsedTime * 0.65) * 0.025;
      v.x += (-p.x + restX) * 17 * dt;
      v.y += (-0.15 - p.y) * 20 * dt;
      v.multiplyScalar(Math.exp(-3.1 * dt));
      p.addScaledVector(v, dt);
    }
    if (group.current) {
      group.current.position.copy(p);
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        -p.x * 0.27,
        5,
        dt,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        reduced ? 0 : s.pointer.y * 0.06,
        5,
        dt,
      );
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        (flipped ? Math.PI : 0) + (reduced ? 0 : s.pointer.x * 0.12),
        6,
        dt,
      );
    }
    const a = strip.attributes.position;
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      const x = p.x * t * t;
      const y = 3.6 + (p.y + 1.32 - 3.6) * t;
      const z = Math.sin(t * Math.PI) * (0.16 + Math.abs(p.x) * 0.16);
      a.setXYZ(i * 2, x - 0.075, y, z);
      a.setXYZ(i * 2 + 1, x + 0.075, y, z);
    }
    a.needsUpdate = true;
    strip.computeVertexNormals();
    if (
      !reduced ||
      drag.current ||
      Math.abs((group.current?.rotation.y || 0) - (flipped ? Math.PI : 0)) >
        0.001
    )
      invalidate();
  });
  const release = (e) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    e.target.releasePointerCapture?.(e.pointerId);
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) setFlipped((f) => !f);
    else {
      velocity.current.x = d.target.x * 2;
      velocity.current.y = d.target.y * 0.7;
    }
    invalidate();
  };
  return (
    <>
      <mesh geometry={strip} ref={ribbon}>
        <meshStandardMaterial
          color="#182b55"
          roughness={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>
      <group
        ref={group}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            target: pos.current.clone(),
          };
          invalidate();
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          e.ray.intersectPlane(plane, temp);
          drag.current.target.set(
            THREE.MathUtils.clamp(temp.x, -1.65, 1.65),
            THREE.MathUtils.clamp(temp.y, -1.4, 0.8),
            0,
          );
          invalidate();
        }}
        onPointerUp={release}
        onPointerCancel={() => {
          drag.current = null;
          invalidate();
        }}
      >
        <mesh position={[0, 1.3, 0]}>
          <torusGeometry args={[0.13, 0.035, 12, 32]} />
          <meshStandardMaterial
            color="#bccde6"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <RoundedBox args={[1.85, 2.6, 0.1]} radius={0.095} smoothness={4}>
          <meshStandardMaterial
            color="#afbdd0"
            metalness={0.4}
            roughness={0.3}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.057]}>
          <planeGeometry args={[1.73, 2.44]} />
          <meshBasicMaterial map={faces[0]} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.057]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.73, 2.44]} />
          <meshBasicMaterial map={faces[1]} toneMapped={false} />
        </mesh>
      </group>
    </>
  );
}
export default function LanyardScene() {
  const [flipped, setFlipped] = useState(false),
    [visible, setVisible] = useState(true);
  const container = useRef();
  const reduced = useReducedMotion();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "100px" },
    );
    if (container.current) obs.observe(container.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      className="lanyard-scene"
      ref={container}
      aria-label="Interactive portfolio card: drag to swing, click to flip"
    >
      <Canvas
        camera={{ position: [0, 0.6, 7], fov: 37 }}
        dpr={[1, 1.5]}
        frameloop={visible ? (reduced ? "demand" : "always") : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 5, 5]} intensity={2.8} />
        <Suspense fallback={null}>
          <Badge flipped={flipped} setFlipped={setFlipped} reduced={reduced} />
        </Suspense>
      </Canvas>
      <div className="lanyard-controls">
        <button onClick={() => setFlipped(!flipped)} aria-pressed={flipped}>
          {flipped ? "↶ Show portrait" : "↻ Flip card to see QR"} · Drag to
          swing
        </button>
        <a
          href="https://www.linkedin.com/in/wazahahmad/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
