import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Rocket, MousePointerClick } from 'lucide-react';

const Hero = () => {
  const scrollToExplore = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full bg-[#07081A] text-white overflow-hidden">
      {/* 3D Spline Scene as full-bleed background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Glow gradients overlay (non-blocking) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/30 to-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-purple-600/20 blur-3xl" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Top simple nav */}
            <div className="flex items-center justify-between py-6">
              <div className="font-semibold tracking-wider text-sm sm:text-base text-white/80">
                Zidane Inside
              </div>
              <nav className="hidden sm:flex gap-6 text-white/70 text-sm">
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#works" className="hover:text-white transition-colors">Works</a>
                <a href="#board" className="hover:text-white transition-colors">Guest Wall</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </nav>
            </div>

            {/* Headline */}
            <div className="mt-10 sm:mt-20 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-6xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                Zidane Achmad Nurjayyin
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="mt-4 text-lg sm:text-xl text-white/80"
              >
                Game Developer & Digital Artist
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 flex items-center gap-4"
              >
                <button
                  onClick={scrollToExplore}
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 transition-all"
                >
                  <Rocket className="h-4 w-4 text-violet-300 group-hover:scale-110 transition-transform" />
                  Explore My World
                </button>
                <div className="hidden sm:flex items-center gap-2 text-white/60">
                  <MousePointerClick className="h-4 w-4" />
                  <span>Drag the scene</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
