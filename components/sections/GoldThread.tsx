"use client";

import { useEffect, useRef } from "react";

export default function GoldThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        pathRef.current.style.strokeDasharray = `${length}`;
        pathRef.current.style.strokeDashoffset = `${length * (1 - progress)}`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed right-4 md:right-6 top-0 h-screen w-6 z-40 pointer-events-none hidden sm:flex items-center"
      aria-hidden
    >
      <svg width="24" height="100%" viewBox="0 0 24 200" preserveAspectRatio="none" className="h-[70vh] w-full">
        <path
          d="M12 0 C 4 25, 20 50, 12 75 C 4 100, 20 125, 12 150 C 6 165, 16 185, 12 200"
          fill="none"
          stroke="rgba(246,244,239,0.12)"
          strokeWidth="1"
        />
        <path
          ref={pathRef}
          d="M12 0 C 4 25, 20 50, 12 75 C 4 100, 20 125, 12 150 C 6 165, 16 185, 12 200"
          className="thread-path"
        />
      </svg>
    </div>
  );
}
