import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const DEFAULT_IMAGES = [
  `${BASE}/hero-fields.jpg`,
  `${BASE}/hero-leaf.jpg`,
  `${BASE}/about-farmer.jpg`,
  `${BASE}/hero-scan.png`,
  `${BASE}/dashboard-bg.jpg`,
];

export function AnimatedBackground({ images = DEFAULT_IMAGES, intervalMs = 7000 }: { images?: string[]; intervalMs?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), intervalMs);
    return () => clearInterval(t);
  }, [images.length, intervalMs]);
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.img
          key={i}
          src={images[i]}
          alt=""
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ opacity: { duration: 2 }, scale: { duration: 9, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-lime-400/15 blur-[140px]"
        animate={{ x: [0, -60, 0], y: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
