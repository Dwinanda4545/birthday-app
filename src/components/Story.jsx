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
    <section className="bg-black py-20 md:py-40 px-6">
      <div className="max-w-2xl mx-auto space-y-40 md:space-y-64">
        {messages.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-center"
          >
            <p className="text-xl md:text-4xl font-light leading-relaxed text-slate-300 italic font-serif">
              "{text}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Grid Foto yang Responsif */}
      <div className="max-w-6xl mx-auto mt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`relative rounded-3xl overflow-hidden border border-slate-800 
              ${photo.size === 'tall' ? 'md:row-span-2 h-[350px] md:h-[600px]' : 'h-[250px] md:h-[290px]'}`}
          >
            <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="Memory" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}