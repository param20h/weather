'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="backdrop-blur-xl bg-slate-900/80 rounded-2xl px-4 py-2 border border-slate-700/50 shadow-lg">
        <p className="text-slate-300 text-sm font-medium">
          Made by <span className="text-white font-bold">param20h</span> with ❤️ & AI
        </p>
      </div>
    </motion.footer>
  );
}