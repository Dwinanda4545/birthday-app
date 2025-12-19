import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Star, Cake } from 'lucide-react';

// src/components/Hero.jsx
export default function Hero({ name = "Ayu" }) {
    const [confetti, setConfetti] = useState([]);

    // Handler untuk klik yang menghasilkan confetti
    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
        angle: (Math.PI * 2 * i) / 20,
        velocity: Math.random() * 4 + 2,
        color: ['#FF6B9D', '#FFC312', '#4ECDC4', '#AA96DA', '#F38181', '#95E1D3'][Math.floor(Math.random() * 6)],
        size: Math.random() * 12 + 6,
        rotation: Math.random() * 360
      }));
      
      setConfetti(prev => [...prev, ...newConfetti]);
      
      setTimeout(() => {
        setConfetti(prev => prev.filter(c => !newConfetti.find(nc => nc.id === c.id)));
      }, 1500);
    };

    return (
      <section 
        className="min-h-screen h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 via-purple-950/20 to-black overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* Falling Snowflakes */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`snow-${i}`}
            className="absolute text-white/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px'
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(i) * 50, Math.cos(i) * 30],
              rotate: [0, 360],
              opacity: [0, 1, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 8,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          >
            ❄️
          </motion.div>
        ))}

        {/* Floating Birthday Balloons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`balloon-${i}`}
            className="absolute text-4xl sm:text-5xl md:text-6xl"
            style={{
              left: `${(i * 12) + 5}%`,
              bottom: '-100px'
            }}
            animate={{
              y: [0, -window.innerHeight - 200],
              x: [0, Math.sin(i * 2) * 30],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            {['🎈', '🎉', '🎊', '🎁'][i % 4]}
          </motion.div>
        ))}

        {/* Twinkling Christmas Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          </motion.div>
        ))}

        {/* Decorative Rotating Gifts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`gift-${i}`}
            className="absolute"
            style={{
              left: i < 3 ? `${i * 10}%` : `${100 - (i - 3) * 10}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: i * 0.8
            }}
          >
            <Gift className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400/30" />
          </motion.div>
        ))}

        {/* Christmas Lights String */}
        <div className="absolute top-0 left-0 right-0 flex justify-around py-4">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
              style={{
                backgroundColor: ['#FF0000', '#00FF00', '#FFD700', '#FF69B4', '#00CED1'][i % 5]
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>

        {/* Interactive Confetti from clicks */}
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              rotate: particle.rotation
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(particle.angle) * particle.velocity * 100,
              y: Math.sin(particle.angle) * particle.velocity * 100 + 200,
              scale: 0,
              opacity: 0,
              rotate: particle.rotation + 360
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}

        {/* Main Content */}
        <div className="z-10 text-center px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="inline-block"
            >
              <Cake className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-pink-400 mx-auto mb-2" />
            </motion.div>
            
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="font-sans tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[10px] sm:text-xs text-gold-500 uppercase block"
            >
              🎄 Merry Christmas & Happy Birthday 🎂
            </motion.span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-3 sm:mb-4 italic text-white leading-tight"
          >
            Happy Birthday,
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative inline-block"
          >
            <motion.div
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 40px rgba(255,215,0,0.8)',
                  '0 0 20px rgba(255,215,0,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-200 via-gold-500 to-gold-200 break-words"
            >
              {name}
            </motion.div>
            
            <Sparkles className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 text-pink-400 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 sm:mt-8 text-sm sm:text-base text-purple-200 italic"
          >
            ✨ Click anywhere for confetti magic! ✨
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2 hidden sm:flex z-10"
        >
          <span className="text-xs text-gold-500 uppercase tracking-wider">Scroll</span>
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-gold-500 to-transparent"></div>
        </motion.div>
      </section>
    );
}