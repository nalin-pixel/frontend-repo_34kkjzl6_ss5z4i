import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Globe, Music2, Pause, PlayCircle, MessageSquare } from 'lucide-react';

const AboutContact = () => {
  const [musicOn, setMusicOn] = useState(false);

  return (
    <section id="about" className="relative w-full bg-[#0A0B22] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-500/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">About</h2>
          <p className="text-white/80 leading-relaxed">
            I’m Zidane Achmad Nurjayyin — a Game Developer & Digital Artist obsessed with the fusion of
            interactive worlds and visual sound. My craft lives at the edge of Nexus Tech and Digital Art:
            shaders that breathe, textures that sing, and gameplay that feels like it came from a neon future.
            I’m the creator of indie titles like <span className="text-violet-300">That’s Trash</span>, <span className="text-violet-300">2D Frits</span>, and <span className="text-violet-300">Snake Snike</span> — playful experiments that explore mechanics, mood, and motion.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMusicOn(!musicOn)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition"
            >
              {musicOn ? <Pause className="h-4 w-4 text-cyan-300" /> : <Music2 className="h-4 w-4 text-cyan-300" />}
              {musicOn ? 'Mute ambience' : 'Play ambience'}
            </button>
            <span className="text-xs text-white/60">Optional ambience toggle</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact</h2>
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-3">
              <a href="mailto:zidaneachmadnurjayyin@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition">
                <Mail className="h-4 w-4 text-violet-300" /> Email
              </a>
              <a href="https://github.com/Zidandev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition">
                <Github className="h-4 w-4 text-violet-300" /> GitHub
              </a>
              <a href="https://zidandev.itch.io/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition">
                <Globe className="h-4 w-4 text-violet-300" /> itch.io
              </a>
              <a href="https://youtube.com/@zidaneangamer8?si=79Uop8CcqyPQGNor" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition">
                <PlayCircle className="h-4 w-4 text-violet-300" /> YouTube
              </a>
              <a href="https://discord.com/invite/cbRTEcVCAR" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition">
                <MessageSquare className="h-4 w-4 text-violet-300" /> Discord
              </a>
            </div>

            <form
              className="mt-4 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks! Your message has been captured locally for this demo.');
              }}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm placeholder-white/50 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-400"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm placeholder-white/50 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-400"
                required
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm placeholder-white/50 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-violet-400"
                required
              />
              <button
                type="submit"
                className="inline-flex justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-500/20 hover:brightness-110 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContact;
