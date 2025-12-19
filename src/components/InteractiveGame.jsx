import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Gift, Cake } from 'lucide-react';

export default function InteractiveGame({ onComplete }) {
  const [balloons, setBalloons] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Total balloons needed to pop
  const totalBalloons = 10;

  // Initialize balloons
  useEffect(() => {
    const initialBalloons = Array.from({ length: totalBalloons }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90% of width
      y: Math.random() * 60 + 20, // 20% to 80% of height
      color: ['#FF6B9D', '#C44569', '#FFC312', '#EE5A6F', '#FDA7DF', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'][i],
      size: Math.random() * 30 + 60, // 60px to 90px
      rotation: Math.random() * 20 - 10,
      delay: i * 0.1
    }));
    setBalloons(initialBalloons);
  }, []);

  // Start game after intro
  useEffect(() => {
    const timer = setTimeout(() => setGameStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const popBalloon = (id, x, y) => {
    // Remove balloon
    setBalloons(prev => prev.filter(b => b.id !== id));
    setPoppedCount(prev => prev + 1);

    // Create confetti burst at click position
    const newConfetti = Array.from({ length: 15 }, (_, i) => ({
      id: `${id}-${i}-${Date.now()}`,
      x,
      y,
      angle: (Math.PI * 2 * i) / 15,
      velocity: Math.random() * 3 + 2,
      color: ['#FF6B9D', '#FFC312', '#4ECDC4', '#AA96DA'][Math.floor(Math.random() * 4)],
      size: Math.random() * 8 + 4
    }));

    setConfetti(prev => [...prev, ...newConfetti]);

    // Clean up confetti after animation
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !c.id.startsWith(`${id}-`)));
    }, 1000);

    // Check if all balloons popped
    if (poppedCount + 1 >= totalBalloons) {
      setTimeout(() => {
        setShowMessage(true);
      }, 500);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-950 via-purple-950 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {i % 3 === 0 ? (
              <Star className="w-3 h-3 text-yellow-300" />
            ) : i % 3 === 1 ? (
              <Heart className="w-3 h-3 text-pink-400" />
            ) : (
              <Sparkles className="w-3 h-3 text-purple-300" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Instruction */}
      <AnimatePresence>
        {!showMessage && gameStarted && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-8 sm:top-12 z-20 text-center px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl px-6 py-3 sm:px-8 sm:py-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 justify-center">
                <Gift className="w-6 h-6 sm:w-8 sm:h-8" />
                Pop All Balloons!
              </h2>
              <p className="text-base sm:text-lg text-pink-200">
                {poppedCount} / {totalBalloons} popped 🎈
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balloons */}
      <div className="relative w-full h-full max-w-6xl mx-auto">
        <AnimatePresence>
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                rotate: [balloon.rotation, balloon.rotation + 5, balloon.rotation - 5, balloon.rotation]
              }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: balloon.rotation + 180
              }}
              transition={{
                duration: 0.5,
                delay: balloon.delay,
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                position: 'absolute',
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                cursor: 'pointer',
                zIndex: 10
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                popBalloon(balloon.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >
              {/* Balloon SVG */}
              <svg
                width={balloon.size}
                height={balloon.size * 1.2}
                viewBox="0 0 100 120"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              >
                {/* Balloon body */}
                <ellipse
                  cx="50"
                  cy="50"
                  rx="35"
                  ry="45"
                  fill={balloon.color}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                {/* Highlight */}
                <ellipse
                  cx="40"
                  cy="35"
                  rx="12"
                  ry="18"
                  fill="rgba(255,255,255,0.4)"
                />
                {/* Balloon knot */}
                <path
                  d="M 50 95 Q 48 100 50 105 Q 52 100 50 95"
                  fill={balloon.color}
                  opacity="0.8"
                />
                {/* String */}
                <line
                  x1="50"
                  y1="105"
                  x2="50"
                  y2="120"
                  stroke={balloon.color}
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Confetti particles */}
      <AnimatePresence>
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: particle.x + Math.cos(particle.angle) * particle.velocity * 100,
              y: particle.y + Math.sin(particle.angle) * particle.velocity * 100 + 200,
              scale: 0,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'fixed',
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              zIndex: 100
            }}
          />
        ))}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 sm:p-12 text-center shadow-2xl border-4 border-white/30 max-w-2xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Cake className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-white mb-4 sm:mb-6" />
              </motion.div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
                🎉 Amazing! 🎉
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold mb-2">
                You popped all the balloons!
              </p>
              <p className="text-lg sm:text-xl text-white/80">
                Get ready for something special...
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mt-6 sm:mt-8"
              >
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar at bottom */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-64 sm:w-80 bg-white/10 backdrop-blur-md rounded-full h-4 border-2 border-white/20 overflow-hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${(poppedCount / totalBalloons) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}

