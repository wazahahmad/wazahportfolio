"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
export default function MetalBorder() {
  const host = useRef(null);
  const [Metal, setMetal] = useState(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    let alive = true;
    let requested = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (!entry.isIntersecting || requested) return;
        requested = true;
        import("@paper-design/shaders-react")
          .then((module) => {
            if (alive) setMetal(() => module.LiquidMetal);
          })
          .catch(() => {});
      },
      { rootMargin: "80px" },
    );
    if (host.current) observer.observe(host.current);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, []);
  return (
    <div ref={host} className="metal-border" aria-hidden="true">
      {Metal && visible && (
        <Metal
          width="100%"
          height="100%"
          shape="none"
          colorBack="#00000000"
          colorTint="#ffffff"
          repetition={4}
          softness={0.5}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={0}
          contour={0}
          angle={45}
          scale={8}
          offsetX={0.1}
          offsetY={-0.1}
          speed={reduced ? 0 : 0.6}
          minPixelRatio={1}
          maxPixelCount={180000}
        />
      )}
    </div>
  );
}
