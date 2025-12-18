import { motion } from 'framer-motion';

// src/components/Hero.jsx
export default function Hero({ name = "Ayu" }) {
    return (
      <section className="h-screen flex flex-col items-center justify-center relative bg-linear-to-b from-slate-950 to-black">
        <div className="z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-sans tracking-[0.5em] text-xs text-gold-500 uppercase mb-6 block"
          >
            An Eternal Memory
          </motion.span>
          
          <h1 className="font-serif text-6xl md:text-8xl mb-4 italic text-white">
            Happy Birthday,
          </h1>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-serif text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gold-200 via-gold-500 to-gold-200"
          >
            {name}
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-linear-to-b from-gold-500 to-transparent"></div>
        </motion.div>
      </section>
    );
}