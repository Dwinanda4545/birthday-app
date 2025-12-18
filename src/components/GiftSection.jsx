import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Gift, Sparkles, X } from 'lucide-react';

export default function GiftSection() {
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('role', 'pemberi');
    url.searchParams.set('status', 'claimed');
    // Kita sisipkan kunci rahasia di dalam URL agar jika di-scan manual pun tetap valid
    url.searchParams.set('key', 'GIFT-VERIFIED-AYU-24-2025'); 
    setCurrentUrl(url.toString());
  }, []);   

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="bg-slate-900 p-12 rounded-[3rem] border border-slate-800 text-center relative"
      >
        <Gift size={80} className="mx-auto text-indigo-500 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-white">Hadiah Spesial</h2>
        <button 
          onClick={() => setShowQR(true)}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)]"
        >
          Dapatkan Link Klaim
        </button>
      </motion.div>

      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl text-center max-w-sm w-full relative"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-slate-400"><X /></button>
              <Sparkles className="mx-auto text-yellow-500 mb-2" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Scan untuk Klaim</h3>
              <p className="text-slate-500 text-sm mb-6">Minta si Pemberi scan QR ini dengan kamera HP mereka.</p>
              
              <div className="bg-slate-100 p-4 rounded-2xl inline-block border-2 border-slate-200">
                {/* QR Code sekarang berisi URL Klaim */}
                <QRCodeSVG value={currentUrl} size={200} />
              </div>
              <p className="mt-4 text-[10px] text-indigo-600 font-bold break-all">
                {currentUrl}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}