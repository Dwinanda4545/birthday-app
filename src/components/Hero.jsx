import { motion } from 'framer-motion';

// src/components/Hero.jsx
export default function Hero({ name = "Ayu" }) {
    return (
      <section className="min-h-screen h-screen flex flex-col items-center justify-center relative bg-linear-to-b from-slate-950 to-black overflow-hidden">
        <div className="z-10 text-center px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-sans tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[10px] sm:text-xs text-gold-500 uppercase mb-4 sm:mb-6 block"
          >
            An Eternal Memory
          </motion.span>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-3 sm:mb-4 italic text-white leading-tight">
            Happy Birthday,
          </h1>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gold-200 via-gold-500 to-gold-200 break-words"
          >
            {name}
          </motion.div>
        </div>
        
        {/* Scroll Indicator - Hidden on very small screens */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2 hidden sm:flex"
        >
          <div className="w-[1px] h-8 sm:h-12 bg-linear-to-b from-gold-500 to-transparent"></div>
        </motion.div>
      </section>
    );
}