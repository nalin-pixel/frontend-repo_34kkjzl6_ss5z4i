import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import ProjectsSkills from './components/ProjectsSkills';
import GuestBoard from './components/GuestBoard';
import AboutContact from './components/AboutContact';
import SpaceShot from './components/SpaceShot';

function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSkills />
      <GuestBoard />
      <AboutContact />
      <footer id="contact" className="bg-[#07081A] border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Zidane Inside • Nexus Tech x Digital Art
        </div>
      </footer>
    </>
  );
}

function GamePage() {
  return (
    <div className="min-h-screen bg-[#07081A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-white/80 hover:text-white transition">← Back Home</Link>
        <div className="text-white/70 text-sm">Space Shot</div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <SpaceShot />
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#07081A] text-white font-inter">
        <div className="fixed top-4 right-4 z-50">
          <Link
            to="/game"
            className="rounded-full bg-white/10 hover:bg-white/15 text-white px-4 py-2 backdrop-blur-md border border-white/10 transition"
          >
            Play Space Shot
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          {/* Fallbacks to ensure no blank page on unknown hash paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
