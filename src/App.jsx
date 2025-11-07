import React from 'react';
import Hero from './components/Hero';
import ProjectsSkills from './components/ProjectsSkills';
import GuestBoard from './components/GuestBoard';
import AboutContact from './components/AboutContact';
import SpaceShot from './components/SpaceShot';

function App() {
  return (
    <div className="min-h-screen bg-[#07081A] text-white font-inter">
      <Hero />
      <ProjectsSkills />
      <SpaceShot />
      <GuestBoard />
      <AboutContact />
      <footer id="contact" className="bg-[#07081A] border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Zidane Inside • Nexus Tech x Digital Art
        </div>
      </footer>
    </div>
  );
}

export default App;
