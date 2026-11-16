"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
function faceTexture(photo, qr, back) {
  const c = document.createElement("canvas");
  c.width = 960;
  c.height = 1360;
  const x = c.getContext("2d");
  x.fillStyle = "#171a20";
  x.fillRect(0, 0, 960, 1360);
  x.fillStyle = "#e1e0c9";
  x.fillRect(28, 28, 904, 1304);
  // Technical paper, fine grid, and contour linework are drawn locally.
  x.strokeStyle = "#53627a30";
  x.lineWidth = 1;
  for (let n = 35; n < 940; n += 32) {
    x.beginPath();
    x.moveTo(n, 28);
    x.lineTo(n - 50, 1332);
    x.stroke();
  }
  for (let n = 28; n < 1350; n += 32) {
    x.beginPath();
    x.moveTo(28, n);
    x.lineTo(932, n + 24);
    x.stroke();
  }
  x.strokeStyle = "#79847355";
  for (let i = 0; i < 18; i++) {
    x.beginPath();
    x.ellipse(550, 570, 220 + i * 22, 370 + i * 16, -0.4, 0, Math.PI * 2);
    x.stroke();
  }
  const text = (s, px, py, size, color = "#252b39", max) => {
    x.fillStyle = color;
    x.font = `900 ${size}px Arial`;
    x.fillText(s, px, py, max);
  };
  if (back) {
    text("LET’S CONNECT", 65, 150, 76, "#202c45", 830);
    x.fillStyle = "#fff";
    x.fillRect(140, 270, 680, 680);
    x.imageSmoothingEnabled = false;
    x.drawImage(qr.image, 160, 290, 640, 640);
    x.imageSmoothingEnabled = true;
    text("WAZAH AHMAD", 130, 1060, 68, "#202c45", 700);
    text("SENIOR DEVELOPER", 183, 1125, 38, "#314c79", 600);
    x.font = "28px Arial";
    x.fillStyle = "#293c5d";
    x.textAlign = "center";
    x.fillText("linkedin.com/in/wazahahmad", 480, 1210);
    x.textAlign = "left";
  } else {
    x.fillStyle = "#26334b";
    x.fillRect(78, 64, 230, 66);
    text("SENIOR", 99, 112, 47, "#eeecd6", 190);
    text("W / A", 738, 111, 44, "#26334b", 150);
    x.strokeStyle = "#3a4655";
    x.lineWidth = 3;
    x.strokeRect(65, 156, 830, 230);
    for (const [a, b] of [
      [65, 156],
      [895, 156],
      [65, 386],
      [895, 386],
    ]) {
      x.fillStyle = "#526174";
      x.beginPath();
      x.arc(a, b, 9, 0, Math.PI * 2);
      x.fill();
    }
    x.save();
    x.translate(74, 335);
    x.scale(0.65, 1);
    text("DEVELOPER", 0, 0, 155, "#262c39", 1240);
    x.restore();
    x.save();
    x.translate(852, 427);
    x.rotate(Math.PI / 2);
    text("WEB / AUTOMATION", 0, 0, 76, "#253047", 790);
    x.restore();
    const g = x.createLinearGradient(90, 440, 650, 980);
    g.addColorStop(0, "#7f99a3");
    g.addColorStop(0.45, "#1a3b50");
    g.addColorStop(1, "#536f72");
    x.fillStyle = g;
    x.fillRect(102, 439, 540, 665);
    x.strokeStyle = "#bfd5d455";
    for (let i = 0; i < 40; i++) {
      x.beginPath();
      for (let j = 0; j < 20; j++) {
        const px = 102 + j * 28,
          py = 450 + i * 16 + Math.sin(j * 0.9 + i) * 10;
        j ? x.lineTo(px, py) : x.moveTo(px, py);
      }
      x.stroke();
    }
    const im = photo.image;
    const crop = {
      x: im.width * 0.19,
      y: im.height * 0.065,
      w: im.width * 0.64,
      h: im.height * 0.935,
    };
    x.save();
    x.beginPath();
    x.rect(28, 170, 904, 1100);
    x.clip();
    x.drawImage(im, crop.x, crop.y, crop.w, crop.h, 60, 225, 810, 1420);
    x.restore();
    x.fillStyle = "#edead5";
    x.save();
    x.translate(131, 990);
    x.rotate(-0.025);
    x.fillRect(0, 0, 642, 76);
    text("WAZAH AHMAD", 16, 56, 53, "#242d3e", 610);
    x.restore();
    x.fillStyle = "#19263e";
    x.save();
    x.translate(28, 1194);
    x.rotate(-0.035);
    x.fillRect(0, 0, 925, 145);
    text("PORTFOLIO", 35, 102, 77, "#eeecd5", 590);
    x.font = "20px Arial";
    x.fillStyle = "#c0c6cd";
    x.fillText("Built with purpose.", 630, 65);
    x.fillText("Made to matter.", 630, 95);
    x.restore();
    // Metallic corner rings and a dark card slot echo the reference badge construction.
    for (const [cx, cy, r] of [
      [56, 1230, 100],
      [904, 1260, 88],
    ]) {
      x.strokeStyle = "#4b5359";
      x.lineWidth = 28;
      x.beginPath();
      x.arc(cx, cy, r, -1, 3.8);
      x.stroke();
      x.strokeStyle = "#dce1de";
      x.lineWidth = 12;
      x.beginPath();
      x.arc(cx - 4, cy - 3, r, -1, 3.8);
      x.stroke();
    }
  }
  x.fillStyle = "#090e17";
  x.beginPath();
  x.roundRect(373, 30, 214, 42, 20);
  x.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function strapTexture() {
  const c = document.createElement("canvas");
  c.width = 160;
  c.height = 1024;
  const x = c.getContext("2d");
  x.fillStyle = "#16191b";
  x.fillRect(0, 0, 160, 1024);
  for (let i = 0; i < 160; i += 4) {
    x.fillStyle = i % 8 ? "#ffffff07" : "#0004";
    x.fillRect(i, 0, 1, 1024);
  }
  x.save();
  x.translate(110, 180);
  x.rotate(Math.PI / 2);
  x.fillStyle = "#efefea";
  x.font = "bold 44px Arial";
  x.fillText("ⓦ Wazah Ahmad", 0, 0);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
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
    "/images/card-portrait.webp",
    "/images/linkedin-qr.gif",
  ]);
  const faces = useMemo(
    () => [faceTexture(photo, qr, false), faceTexture(photo, qr, true)],
    [photo, qr],
  );
  useEffect(() => () => faces.forEach((t) => t.dispose()), [faces]);
  const bandTexture = useMemo(strapTexture, []);
  useEffect(() => () => bandTexture.dispose(), [bandTexture]);
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
    const uv = new Float32Array(33 * 4);
    for (let i = 0; i <= 32; i++) {
      uv.set([0, 1 - i / 32, 1, 1 - i / 32], i * 4);
    }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
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
      const restX = reduced ? 0 : Math.sin(s.clock.elapsedTime * 0.65) * 0.07;
      v.x += (-p.x + restX) * 17 * dt;
      v.y += (-0.15 - p.y) * 20 * dt;
      v.multiplyScalar(Math.exp(-3.1 * dt));
      p.addScaledVector(v, dt);
    }
    if (group.current) {
      group.current.position.copy(p);
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        -0.025 - p.x * 0.27,
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
      a.setXYZ(i * 2, x - 0.11, y, z);
      a.setXYZ(i * 2 + 1, x + 0.11, y, z);
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
          map={bandTexture}
          color="#c7c7c7"
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
        <mesh position={[0, 1.58, 0]}>
          <boxGeometry args={[0.29, 0.16, 0.09]} />
          <meshStandardMaterial
            color="#aeb6be"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
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
            color="#22252b"
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
        camera={{ position: [0, 0.5, 7.5], fov: 36 }}
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
