"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  vx: number;   // x velocity
  vy: number;   // y velocity
  depth: number; // 0=far(slow/small) 1=close(fast/big)
}

interface NebulaCloud {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
}

const STAR_COLORS = [
  "#ffffff",
  "#eef0ff",
  "#c8d4ff",
  "#aabbff",
  "#ffeedd",
  "#ffe8c0",
  "#b8d8ff",
  "#ddeeff",
];

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const starsRef  = useRef<Star[]>([]);
  const nebulaeRef = useRef<NebulaCloud[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── Helper ──────────────────────────────────────────
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    // ── Generate stars ───────────────────────────────────
    const makeStar = (): Star => {
      const depth = Math.random();               // 0=far 1=near
      const speed = 0.03 + depth * 0.18;        // near stars move faster
      const angle = rand(0, Math.PI * 2);
      return {
        x: rand(0, W),
        y: rand(0, H),
        depth,
        size:        0.3 + depth * 2.2,
        baseOpacity: 0.25 + depth * 0.75,
        opacity:     0.25 + depth * 0.75,
        twinkleSpeed: rand(0.008, 0.025),
        twinkleOffset: rand(0, Math.PI * 2),
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        vx:   Math.cos(angle) * speed,
        vy:   Math.sin(angle) * speed,
      };
    };

    const NUM_STARS = 750;
    starsRef.current = Array.from({ length: NUM_STARS }, makeStar);

    // Scatter some bright hero stars
    const BRIGHT = 20;
    for (let i = 0; i < BRIGHT; i++) {
      const s = starsRef.current[i];
      s.size *= 1.6;
      s.baseOpacity = 0.9;
      s.opacity = 0.9;
    }

    // ── Nebula clouds ─────────────────────────────────────
    nebulaeRef.current = [
      { x: W*0.5,  y: H*0.45, radiusX: W*0.55, radiusY: H*0.6,  color:"28,58,190",  opacity:0.18, vx:0.012,  vy:0.006  },
      { x: W*0.28, y: H*0.3,  radiusX: W*0.38, radiusY: H*0.42, color:"75,18,165",  opacity:0.14, vx:-0.008, vy:0.01   },
      { x: W*0.72, y: H*0.68, radiusX: W*0.42, radiusY: H*0.48, color:"10,38,145",  opacity:0.12, vx:0.01,   vy:-0.008 },
      { x: W*0.12, y: H*0.72, radiusX: W*0.28, radiusY: H*0.32, color:"55,0,145",   opacity:0.10, vx:0.007,  vy:0.012  },
      { x: W*0.87, y: H*0.18, radiusX: W*0.30, radiusY: H*0.34, color:"95,38,210",  opacity:0.10, vx:-0.01,  vy:0.007  },
      // Milky Way core band
      { x: W*0.5,  y: H*0.5,  radiusX: W*0.14, radiusY: H*0.92, color:"45,78,210",  opacity:0.09, vx:0.004,  vy:0.002  },
    ];

    // ── Draw loop ─────────────────────────────────────────
    const draw = (ts: number) => {
      const t = ts / 1000;
      W = canvas.width;
      H = canvas.height;

      // Clear
      ctx.fillStyle = "#03030e";
      ctx.fillRect(0, 0, W, H);

      // ── Move & draw nebulae ─────────────────────────────
      nebulaeRef.current.forEach((n) => {
        // Slow drift
        n.x += n.vx;
        n.y += n.vy;

        // Gentle bounce off edges
        if (n.x < -n.radiusX * 0.5) n.vx =  Math.abs(n.vx);
        if (n.x >  W + n.radiusX * 0.5) n.vx = -Math.abs(n.vx);
        if (n.y < -n.radiusY * 0.5) n.vy =  Math.abs(n.vy);
        if (n.y >  H + n.radiusY * 0.5) n.vy = -Math.abs(n.vy);

        const pulse = 1 + Math.sin(t * 0.1 + n.x * 0.002) * 0.05;
        const maxR  = Math.max(n.radiusX, n.radiusY) * pulse;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, maxR);
        grad.addColorStop(0,   `rgba(${n.color}, ${n.opacity})`);
        grad.addColorStop(0.45,`rgba(${n.color}, ${n.opacity * 0.45})`);
        grad.addColorStop(1,   `rgba(${n.color}, 0)`);

        ctx.save();
        ctx.scale(n.radiusX / maxR, n.radiusY / maxR);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x / (n.radiusX / maxR), n.y / (n.radiusY / maxR), maxR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Move & draw stars ───────────────────────────────
      starsRef.current.forEach((star) => {
        // Move
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges seamlessly
        if (star.x < -5)  star.x = W + 5;
        if (star.x > W+5) star.x = -5;
        if (star.y < -5)  star.y = H + 5;
        if (star.y > H+5) star.y = -5;

        // Twinkle
        const tw = Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset);
        const alpha = Math.max(0, Math.min(1, star.baseOpacity * (0.7 + tw * 0.3)));

        // Bright star: draw glow halo first
        if (star.size > 2) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5);
          glow.addColorStop(0, `rgba(210,225,255,${alpha * 0.55})`);
          glow.addColorStop(1, "rgba(210,225,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star dot
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        -1,
        display:       "block",
        pointerEvents: "none",
      }}
    />
  );
}
