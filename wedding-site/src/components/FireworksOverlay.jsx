import { useEffect, useRef, useState, useCallback } from "react";

const COLORS = ["#c4a35a", "#d4bc7c", "#5c7c5a", "#8ba888", "#b7cdb3", "#f5f0e8"];
const DURATION = 3500;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FireworksOverlay({ onComplete }) {
  const canvasRef = useRef(null);
  const [fading, setFading] = useState(false);
  const dismissedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setFading(true);
    setTimeout(() => onCompleteRef.current?.(), 900);
  }, []);

  // Guaranteed auto-dismiss
  useEffect(() => {
    const timer = setTimeout(dismiss, DURATION);
    return () => clearTimeout(timer);
  }, [dismiss]);

  // Canvas animation — fire and forget
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf;
    let alive = true;
    const particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const explode = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 28; i++) {
        const angle = (Math.PI * 2 / 28) * i;
        const speed = random(1.5, 5);
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: random(0.015, 0.03),
          size: random(1.5, 3.5),
          color,
        });
      }
    };

    // Schedule all explosions upfront
    const timers = [];
    for (let i = 0; i < 8; i++) {
      const delay = i * 400 + random(0, 150);
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          explode(
            random(canvas.width * 0.15, canvas.width * 0.85),
            random(canvas.height * 0.12, canvas.height * 0.5)
          );
        }, delay)
      );
    }

    const loop = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className={`fireworks-overlay ${fading ? "fireworks-overlay--fading" : ""}`}
      onClick={dismiss}
    >
      <canvas ref={canvasRef} className="fireworks-canvas" />
    </div>
  );
}