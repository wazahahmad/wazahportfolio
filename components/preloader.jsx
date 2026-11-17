"use client";
import { useState } from "react";
export default function Preloader() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return (
    <div
      className="site-preloader"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setDone(true);
      }}
    >
      <div>
        <span className="preloader-mark">WA</span>
        <div className="preloader-word">
          {"LOADING".split("").map((letter, i) => (
            <span key={i} style={{ animationDelay: i * 0.035 + "s" }}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
