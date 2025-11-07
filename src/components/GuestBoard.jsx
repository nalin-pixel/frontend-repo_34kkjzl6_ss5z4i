import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Send } from 'lucide-react';

const strokesKey = 'zidane-inside-strokes-v1';

const GuestBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#a78bfa');
  const [size, setSize] = useState(4);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);

  // Load saved strokes
  useEffect(() => {
    const saved = localStorage.getItem(strokesKey);
    if (saved) setStrokes(JSON.parse(saved));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem(strokesKey, JSON.stringify(strokes));
    drawAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    return ctx;
  };

  const drawAll = () => {
    const ctx = getCtx();
    if (!ctx) return;
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // dark board background with grid
    const { width, height } = canvas.getBoundingClientRect();
    ctx.fillStyle = '#0b0d2a';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    const grid = 24;
    for (let x = 0; x < width; x += grid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += grid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // draw strokes
    strokes.forEach(s => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      s.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    });
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e) => {
    setIsDrawing(true);
    const p = getPos(e);
    setCurrentStroke([{ x: p.x, y: p.y }]);
  };
  const move = (e) => {
    if (!isDrawing) return;
    const p = getPos(e);
    setCurrentStroke(prev => [...prev, { x: p.x, y: p.y }]);
    // live draw for feedback
    const ctx = getCtx();
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    const pts = currentStroke.length ? currentStroke : [{x:p.x,y:p.y}];
    ctx.beginPath();
    pts.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const end = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 1) {
      setStrokes(prev => [...prev, { color, size, points: currentStroke }]);
    }
    setCurrentStroke([]);
  };

  const clearBoard = () => {
    setStrokes([]);
    localStorage.removeItem(strokesKey);
    drawAll();
  };

  return (
    <section id="board" className="relative w-full bg-[#0A0B22] text-white">
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-6"
        >
          Visitor History Wall
        </motion.h2>
        <p className="text-white/70 mb-4">Draw or leave a small note. Your strokes are saved locally and appear for anyone on this device.</p>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-10 rounded overflow-hidden cursor-pointer border border-white/20 bg-white/10"
            aria-label="Brush color"
          />
          <input
            type="range"
            min="1"
            max="16"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-40"
            aria-label="Brush size"
          />
          <button
            onClick={clearBoard}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition"
          >
            <Eraser className="h-4 w-4" /> Clear
          </button>
          <span className="text-xs text-white/60 flex items-center gap-2"><Send className="h-4 w-4" /> Tip: scribble and release to post</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            className="block w-full h-[360px] sm:h-[420px]"
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={(e) => { e.preventDefault(); start(e); }}
            onTouchMove={(e) => { e.preventDefault(); move(e); }}
            onTouchEnd={(e) => { e.preventDefault(); end(); }}
          />
        </div>
      </div>
    </section>
  );
};

export default GuestBoard;
