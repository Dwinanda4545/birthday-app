import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Gift } from 'lucide-react';

// Memo untuk mencegah re-render jika value tidak berubah
const TimeBox = memo(({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl rounded-2xl"></div>
      
      {/* Main box - selalu terlihat tanpa animasi */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 min-w-[70px] sm:min-w-[100px] md:min-w-[140px] shadow-2xl">
        <div className="flex flex-col items-center gap-2">
          <Icon className="text-indigo-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          {/* Hanya angka yang beranimasi ketika value berubah */}
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ y: -10, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent"
            >
              {String(value).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
    <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-400 uppercase tracking-wider">
      {label}
    </p>
  </div>
));

TimeBox.displayName = 'TimeBox';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: 25 Desember 2025, 00:00 WIB (GMT+7)
      const targetDate = new Date('2025-12-25T00:00:00+07:00');
      
      // Current time in Jakarta timezone
      const now = new Date();
      const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      
      const difference = targetDate - jakartaTime;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <Gift className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gold-500 mx-auto" />
          </motion.div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 italic">
            Something Special
          </h1>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gold-200 via-gold-500 to-gold-200 bg-clip-text text-transparent">
            is Coming...
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Sebuah momen spesial akan segera tiba. Hitung mundur dimulai untuk hari yang istimewa.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 px-2">
          <TimeBox value={timeLeft.days} label="Hari" icon={Calendar} />
          <TimeBox value={timeLeft.hours} label="Jam" icon={Clock} />
          <TimeBox value={timeLeft.minutes} label="Menit" icon={Clock} />
          <TimeBox value={timeLeft.seconds} label="Detik" icon={Clock} />
        </div>

        {/* Target Date Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-md mx-auto"
        >
          <p className="text-slate-400 text-xs sm:text-sm mb-2">Menuju ke</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            25 Desember 2025
          </p>
          <p className="text-base sm:text-lg md:text-xl text-slate-300">
            00:00 WIB
          </p>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-xs sm:text-sm text-slate-500">
              Waktu Jakarta (GMT+7)
            </p>
          </div>
        </motion.div>

        {/* Decorative text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-8 sm:mt-12 text-xs sm:text-sm text-slate-600 italic"
        >
          "Every moment counts until this special day arrives..."
        </motion.p>
      </div>
    </div>
  );
}

