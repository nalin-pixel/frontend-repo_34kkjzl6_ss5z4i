import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Lightweight reader for itch.io links only (no thumbnails)
// Uses a public read-only proxy for CORS, then extracts project URLs.
const useItchProjectLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('https://r.jina.ai/http://zidandev.itch.io/');
        const text = await res.text();
        if (!mounted) return;
        // Find links like https://zidandev.itch.io/<slug>
        const linkRegex = /https?:\/\/zidandev\.itch\.io\/[a-z0-9-]+/gi;
        const found = Array.from(new Set(text.match(linkRegex) || []));
        if (found.length) {
          setLinks(found.slice(0, 9));
        } else {
          // Fallback: just the profile page
          setLinks(['https://zidandev.itch.io/']);
        }
      } catch (e) {
        setLinks(['https://zidandev.itch.io/']);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return { links, loading };
};

const skills = [
  { name: 'Unity', level: 90 },
  { name: 'C#', level: 85 },
  { name: 'JavaScript', level: 80 },
  { name: 'HTML', level: 85 },
  { name: 'CSS (Tailwind)', level: 80 },
  { name: 'Digital Art / 2D', level: 88 },
];

const Progress = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm text-white/80">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ProjectsSkills = () => {
  const { links, loading } = useItchProjectLinks();

  const items = useMemo(() => {
    // Map links to simple title from slug
    return links.map((href) => {
      const slug = href.replace('https://zidandev.itch.io/', '').replace(/\/$/, '');
      const title = slug ? slug.replace(/-/g, ' ') : 'Visit my itch.io';
      return { href, title: title || 'Visit my itch.io' };
    });
  }, [links]);

  return (
    <section id="works" className="relative w-full bg-[#07081A] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-violet-500/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          Projects Gallery
        </motion.h2>

        {loading ? (
          <div className="text-white/70">Loading projects…</div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <motion.a
                  key={p.href + i}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition"
                >
                  <span className="capitalize">{p.title}</span>
                  <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white transition" />
                </motion.a>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="https://zidandev.itch.io/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-2 text-[#07081A] font-medium shadow-[0_0_18px_rgba(139,92,246,0.6)] hover:brightness-110 transition"
              >
                Visit my itch.io profile <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </>
        )}

        <motion.h2
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mt-16 mb-6"
        >
          Skills
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="space-y-4">
              {skills.map((s) => (
                <Progress key={s.name} label={s.name} value={s.level} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 p-6 backdrop-blur-xl"
          >
            <h3 className="font-semibold mb-2">Creative Stack</h3>
            <p className="text-white/80 text-sm">
              I build interactive experiences at the intersection of games and digital art. My toolkit spans Unity + C#,
              web tech (HTML/CSS/JS), shader-driven visuals, and 2D art pipelines. I love blending gameplay feel with
              striking neon aesthetics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSkills;
