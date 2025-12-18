import { motion } from 'framer-motion';

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
    <section className="bg-black py-20 px-6">
      {/* Pesan Teks (seperti sebelumnya) */}
      <div className="max-w-lg mx-auto space-y-32">
        {messages.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-300 italic">
              "{text}"
            </p>
          </motion.div>
        ))}
      </div>
      {/* Photo Grid */}
      <div className="max-w-4xl mx-auto mt-40 grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl overflow-hidden border border-slate-800 
              ${photo.size === 'tall' ? 'row-span-2 h-[400px]' : 'h-[190px]'}`}
          >
            <img src={photo.url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Memory" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}