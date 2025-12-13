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
      <div className="backdrop-blur-xl bg-slate-900/80 dark:bg-white/90 rounded-2xl px-4 py-2 border border-slate-700/50 dark:border-slate-300/50 shadow-lg">
        <p className="text-slate-300 dark:text-slate-600 text-sm font-medium">
          Made by{' '}
          <a 
            href="https://param20h.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white dark:text-slate-900 font-bold hover:text-blue-400 dark:hover:text-blue-600 transition-colors duration-200"
          >
            param20h
          </a>{' '}
          
        </p>
      </div>
    </motion.footer>
  );
}