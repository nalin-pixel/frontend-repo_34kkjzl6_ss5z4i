import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Simple canvas minigame: move ship with mouse/touch, auto-fire bullets, meteors fall.
const W = 700; // drawing logical width, scaled to container
const H = 420;

const rand = (min, max) => Math.random() * (max - min) + min;

const SpaceShot = () => {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(() => Number(localStorage.getItem('space-shot-high') || 0));

  const ship = useRef({ x: W / 2, y: H - 60, r: 16 });
  const bullets = useRef([]);
  const meteors = useRef([]);
  const lastSpawn = useRef(0);
  const lastShot = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let last = 0;

    const onMove = (e) => {
      const rect = c.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      const sx = (x / rect.width) * W;
      const sy = (y / rect.height) * H;
      ship.current.x = Math.max(20, Math.min(W - 20, sx));
      ship.current.y = Math.max(H * 0.4, Math.min(H - 20, sy));
    };

    c.addEventListener('mousemove', onMove);
    c.addEventListener('touchmove', onMove, { passive: true });

    const loop = (t) => {
      if (!running) return;
      const dt = (t - last) / 1000;
      last = t;

      // spawn meteors
      if (t - lastSpawn.current > 700) {
        lastSpawn.current = t;
        meteors.current.push({ x: rand(20, W - 20), y: -20, r: rand(12, 26), vy: rand(60, 120) });
      }

      // auto shoot
      if (t - lastShot.current > 240) {
        lastShot.current = t;
        bullets.current.push({ x: ship.current.x, y: ship.current.y - 20, vy: -320 });
      }

      // update
      bullets.current.forEach((b) => (b.y += b.vy * dt));
      meteors.current.forEach((m) => (m.y += m.vy * dt));
      bullets.current = bullets.current.filter((b) => b.y > -30);
      meteors.current = meteors.current.filter((m) => m.y < H + 30);

      // collisions
      outer: for (let i = meteors.current.length - 1; i >= 0; i--) {
        const m = meteors.current[i];
        for (let j = bullets.current.length - 1; j >= 0; j--) {
          const b = bullets.current[j];
          const dx = m.x - b.x;
          const dy = m.y - b.y;
          if (dx * dx + dy * dy < (m.r + 6) * (m.r + 6)) {
            meteors.current.splice(i, 1);
            bullets.current.splice(j, 1);
            setScore((s) => s + 10);
            break outer;
          }
        }
      }

      // ship hit
      for (let i = 0; i < meteors.current.length; i++) {
        const m = meteors.current[i];
        const dx = m.x - ship.current.x;
        const dy = m.y - ship.current.y;
        if (dx * dx + dy * dy < (m.r + ship.current.r) * (m.r + ship.current.r)) {
          endGame();
          return;
        }
      }

      // draw
      ctx.clearRect(0, 0, W, H);
      // background grid + stars
      ctx.fillStyle = '#07081A';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(88, 101, 242, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 28) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 28) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = 'rgba(139,92,246,0.4)';
        ctx.fillRect((i * 37) % W, (i * 97 + t * 0.02) % H, 2, 2);
      }

      // ship
      const g = ctx.createLinearGradient(ship.current.x - 10, ship.current.y - 20, ship.current.x + 10, ship.current.y + 20);
      g.addColorStop(0, '#60a5fa');
      g.addColorStop(1, '#a78bfa');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ship.current.x, ship.current.y - 18);
      ctx.lineTo(ship.current.x - 14, ship.current.y + 18);
      ctx.lineTo(ship.current.x + 14, ship.current.y + 18);
      ctx.closePath();
      ctx.fill();
      // glow
      ctx.shadowColor = 'rgba(167,139,250,0.6)';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // bullets
      ctx.fillStyle = '#93c5fd';
      bullets.current.forEach((b) => {
        ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      // meteors
      ctx.fillStyle = '#f59e0b';
      meteors.current.forEach((m) => {
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.stroke();
      });

      raf.current = requestAnimationFrame(loop);
    };

    const start = () => {
      setScore(0);
      bullets.current = [];
      meteors.current = [];
      lastSpawn.current = 0;
      lastShot.current = 0;
      setRunning(true);
      last = 0;
      raf.current = requestAnimationFrame(loop);
    };

    const endGame = () => {
      setRunning(false);
      if (raf.current) cancelAnimationFrame(raf.current);
      setHigh((h) => {
        const nh = Math.max(h, score);
        localStorage.setItem('space-shot-high', String(nh));
        return nh;
      });
    };

    // expose controls
    (SpaceShot.__controls = SpaceShot.__controls || {}).__start = start;
    (SpaceShot.__controls = SpaceShot.__controls || {}).__end = endGame;

    return () => {
      c.removeEventListener('mousemove', onMove);
      c.removeEventListener('touchmove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const startGame = () => {
    if (SpaceShot.__controls && SpaceShot.__controls.__start) SpaceShot.__controls.__start();
  };

  return (
    <section id="space-shot" className="relative w-full bg-[#07081A] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-400/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Space Shot Minigame
        </motion.h2>
        <p className="text-white/70 mb-6 max-w-2xl">
          Pilot a neon ship and blast falling meteors. Move with mouse or touch, auto-fire enabled. Avoid collisions to
          keep your run going.
        </p>

        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">Score: {score}</div>
          <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">High Score: {high}</div>
        </div>

        <div className="relative w-full max-w-3xl aspect-[7/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <canvas ref={canvasRef} width={W} height={H} className="h-full w-full" />
          {!running && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startGame}
                className="group rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-medium text-[#07081A] shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-shadow"
              >
                <span className="inline-block translate-y-px">Play Game</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpaceShot;
