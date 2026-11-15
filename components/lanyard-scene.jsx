"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function makeBadgeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e9e4d8"; ctx.fillRect(0, 0, 768, 1024);
  ctx.fillStyle = "#122449"; ctx.fillRect(0, 0, 768, 178);
  ctx.fillStyle = "#75a2ff"; ctx.font = "600 28px Arial"; ctx.letterSpacing = "7px"; ctx.fillText("W / A     DIGITAL STUDIO", 56, 72);
  ctx.fillStyle = "#f6f3eb"; ctx.font = "700 76px Arial"; ctx.fillText("PORTFOLIO", 54, 144);
  ctx.strokeStyle = "rgba(18,36,73,.08)"; ctx.lineWidth = 2;
  for (let x = 0; x < 768; x += 42) { ctx.beginPath(); ctx.moveTo(x, 178); ctx.lineTo(x, 1024); ctx.stroke(); }
  for (let y = 178; y < 1024; y += 42) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(768, y); ctx.stroke(); }
  const cx = 384; const cy = 425;
  const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, 235); halo.addColorStop(0, "#d4e1fa"); halo.addColorStop(1, "#e9e4d8"); ctx.fillStyle = halo; ctx.fillRect(68, 196, 632, 450);
  ctx.strokeStyle = "#244a8c"; ctx.lineWidth = 3;
  [80, 132, 184].forEach((radius, i) => { ctx.beginPath(); ctx.ellipse(cx, cy, radius * 1.23, radius * 0.56, -0.35 + i * 0.2, 0, Math.PI * 2); ctx.stroke(); });
  ctx.fillStyle = "#3974d5"; ctx.beginPath(); ctx.arc(cx, cy, 38, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#f6f3eb"; ctx.font = "700 30px Arial"; ctx.textAlign = "center"; ctx.fillText("BUILDING FOR THE WEB", cx, 624); ctx.textAlign = "left";
  ctx.fillStyle = "#122449"; ctx.font = "700 60px Arial"; ctx.fillText("WAZAH", 56, 760); ctx.fillText("AHMAD", 56, 828);
  ctx.fillStyle = "#3974d5"; ctx.font = "600 26px Arial"; ctx.fillText("WEB DEVELOPER  /  LAHORE, PK", 60, 882);
  ctx.fillStyle = "#5b6474"; ctx.font = "24px Arial"; ctx.fillText("REACT  ·  WORDPRESS  ·  THREE.JS", 60, 940);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}

function Badge() {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => makeBadgeTexture(), []);
  const strap = useMemo(() => {
    const points = [new THREE.Vector3(-0.2, 2.7, 0), new THREE.Vector3(-0.28, 2.2, 0), new THREE.Vector3(0.24, 1.72, 0), new THREE.Vector3(0.18, 1.2, 0)];
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 48, 0.075, 10, false);
  }, []);
  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = -state.pointer.y * 0.32 + Math.sin(state.clock.elapsedTime * 0.7) * 0.035;
    const targetY = state.pointer.x * 0.45 + Math.sin(state.clock.elapsedTime * 0.55) * 0.06;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 5, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, hovered ? 0.12 : Math.sin(state.clock.elapsedTime * 1.1) * 0.045, 3, delta);
  });
  return (
    <group ref={group} position={[0, -0.12, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh geometry={strap}><meshStandardMaterial color="#111a2c" metalness={0.62} roughness={0.3} /></mesh>
      <mesh position={[0.18, 1.17, 0.01]} rotation={[0, 0, -0.08]}><torusGeometry args={[0.13, 0.035, 12, 32]} /><meshStandardMaterial color="#c8b78e" metalness={0.82} roughness={0.21} /></mesh>
      <Float speed={1.3} rotationIntensity={0.04} floatIntensity={0.08}>
        <group position={[0.1, 0.23, 0]} rotation={[0, 0, -0.035]}>
          <RoundedBox args={[1.72, 2.28, 0.12]} radius={0.1} smoothness={6}><meshStandardMaterial color="#d3cbb9" metalness={0.2} roughness={0.34} /></RoundedBox>
          <mesh position={[0, 0, 0.066]}><planeGeometry args={[1.6, 2.14]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
          <mesh position={[0, 1.02, 0.08]}><circleGeometry args={[0.07, 24]} /><meshStandardMaterial color="#b49f77" metalness={0.8} roughness={0.25} /></mesh>
        </group>
      </Float>
    </group>
  );
}

export default function LanyardScene() {
  return <div className="lanyard-scene" aria-label="Interactive 3D portfolio badge. Move your pointer to tilt it."><div className="lanyard-halo" /><Canvas camera={{ position: [0, 0.62, 6.6], fov: 34 }} dpr={[1, 1.6]}><ambientLight intensity={1.35} /><directionalLight position={[3, 5, 4]} intensity={2.6} color="#d9e7ff" /><pointLight position={[-3, 1, 2]} intensity={55} color="#3974d5" /><Badge /></Canvas><span className="scene-hint"><span className="hint-dot" /> move to explore</span></div>;
}
