import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Utility to parse a minimal set of games from an itch.io profile page using a CORS-friendly reader
// Primary source: r.jina.ai proxy of the public page (read-only, no keys). Fallback to curated list.
const useItchProjects = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('https://r.jina.ai/http://zidandev.itch.io/');
        const text = await res.text();
        if (!mounted) return;
        // crude parsing: find blocks like https://zidandev.itch.io/<slug> and thumbnails https://img.itch.zone/... .jpg/.png
        const linkRegex = /https?:\/\/zidandev\.itch\.io\/[a-z0-9-]+/gi;
        const imgRegex = /https?:\\/\\/img\.itch\.zone\\/.*?\.(?:png|jpg|jpeg|webp)/gi;
        const titleRegex = /<h2[^>]*>(.*?)<\\/h2>/gi;

        const links = Array.from(new Set(text.match(linkRegex) || []));
        const imgs = Array.from(new Set(text.match(imgRegex) || []));
        const titlesRaw = [];
        let m;
        // Extract a few H2 titles (best-effort)
        while ((m = titleRegex.exec(text)) !== null) {
          const t = m[1].replace(/<[^>]*>/g, '').trim();
          if (t && t.length < 120) titlesRaw.push(t);
        }

        const combined = links.slice(0, 6).map((href, i) => ({
          link: href,
          img: imgs[i] || imgs[0],
          title: titlesRaw[i] || href.replace('https://zidandev.itch.io/', '').replace(/-/g, ' '),
          desc: 'Play on itch.io',
        }));

        if (combined.length) {
          setItems(combined);
        } else {
          throw new Error('No parsed items');
        }
      } catch (e) {
        // Fallback curated entries with direct links
        setItems([
          {
            title: "That’s Trash",
            desc: 'A quirky indie experiment about turning chaos into playful mechanics.',
            img: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?q=80&w=1400&auto=format&fit=crop',
            link: 'https://zidandev.itch.io/',
          },
          {
            title: '2D Frits',
            desc: 'A crisp 2D platformer prototype focused on feel, flow, and frames.',
            img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1400&auto=format&fit=crop',
            link: 'https://zidandev.itch.io/',
          },
          {
            title: 'Snake Snike',
            desc: 'A modern neon twist on a retro classic with juicy FX and shape language.',
            img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop',
            link: 'https://zidandev.itch.io/',
          },
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { items, loading };
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
  const { items, loading } = useItchProjects();

  const gridItems = useMemo(() => items.slice(0, 6), [items]);

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((p, i) => (
              <motion.a
                key={(p.link || '') + i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07081A]/60 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold capitalize">{p.title}</h3>
                    <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white transition" />
                  </div>
                  <p className="mt-1 text-sm text-white/70">{p.desc || 'View project on itch.io'}</p>
                </div>
              </motion.a>
            ))}
          </div>
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
