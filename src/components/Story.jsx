import { motion } from 'framer-motion';
import { Heart, Star, Sparkles, Gift, TreePine } from 'lucide-react';

const messages = [
  "Berawal dari pertemuan sederhana saat kita melihat satu sama lain untuk pertama kalinya...",
  "Sejak itu aku merasakan sesuatu yang belum pernah aku rasakan seumur aku bernapas di dunia ini.",
  "Bukan debar jantung keras, bukan gugup berlebih, tapi rasa tenang yang bahkan tidak bisa aku jelaskan.",
  "Terima kasih wahai wanita yang membuatku merasa seperti aku ada di tempat yang tepat..."
];

const photos = [
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500", size: "tall" },
    { url: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=500", size: "short" },
    { url: "https://images.unsplash.com/photo-1530103862676-fa8c91bbe34b?w=500", size: "short" },
    { url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500", size: "tall" },
];

export default function Story() {
  return (
    <section className="bg-gradient-to-b from-black via-purple-950/10 to-black py-12 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Floating Christmas Trees */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`tree-${i}`}
          className="absolute"
          style={{
            left: i < 2 ? `${i * 20}%` : `${100 - (i - 2) * 20}%`,
            top: `${i * 25}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.5
          }}
        >
          <TreePine className="w-16 h-16 sm:w-24 sm:h-24 text-green-600/20" />
        </motion.div>
      ))}

      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px'
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(i * 3) * 50],
            rotate: [0, 360],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 fill-pink-400" />
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
      ))}

      {/* Messages with decorations */}
      <div className="max-w-2xl mx-auto space-y-20 sm:space-y-32 md:space-y-48 lg:space-y-64 relative z-10">
        {messages.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center px-2 relative"
          >
            {/* Decorative stars around text */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400 fill-gold-400" />
            </motion.div>

            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed sm:leading-relaxed md:leading-loose text-slate-300 italic font-serif">
              "{text}"
            </p>

            {/* Decorative gifts */}
            {index % 2 === 0 && (
              <>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-6 left-4 sm:left-8"
                >
                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400/40" />
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  className="absolute -bottom-6 right-4 sm:right-8"
                >
                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/40" />
                </motion.div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Grid Foto dengan Dekorasi */}
      <div className="max-w-6xl mx-auto mt-20 sm:mt-32 md:mt-40 relative z-10">
        {/* Christmas Lights above photos */}
        <div className="flex justify-around mb-6 sm:mb-8">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`photo-light-${i}`}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
              style={{
                backgroundColor: ['#FF0000', '#00FF00', '#FFD700', '#FF69B4'][i % 4]
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 2 : -2 }}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-gradient-to-br from-pink-500/30 to-purple-500/30 shadow-xl
                ${photo.size === 'tall' ? 'lg:row-span-2 h-[280px] sm:h-[350px] lg:h-[600px]' : 'h-[200px] sm:h-[250px] lg:h-[290px]'}`}
            >
              <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="Memory" />
              
              {/* Photo decoration overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="flex gap-2"
                >
                  <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                </motion.div>
              </div>

              {/* Corner decorations */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-2 right-2"
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-80" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <motion.p
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 font-serif italic"
          >
            🎄 Every moment with you is a gift 🎁
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}