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
    <section className="min-h-screen flex flex-col items-center justify-center bg-black p-4 sm:p-6 md:p-8">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="bg-slate-900 p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl sm:rounded-[3rem] border border-slate-800 text-center relative w-full max-w-md"
      >
        <Gift size={60} className="mx-auto text-indigo-500 mb-4 sm:mb-6 sm:w-20 sm:h-20" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">Hadiah Spesial</h2>
        <button 
          onClick={() => setShowQR(true)}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base rounded-full font-bold transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)] w-full sm:w-auto"
        >
          Dapatkan Link Klaim
        </button>
      </motion.div>

      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center max-w-sm w-full relative mx-4"
            >
              <button 
                onClick={() => setShowQR(false)} 
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-600 p-1 sm:p-2"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
              <Sparkles className="mx-auto text-yellow-500 mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Scan untuk Klaim</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 px-2">Minta si Nanda untuk scan QR ini dengan kamera HP dia.</p>
              
              <div className="bg-slate-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl inline-block border-2 border-slate-200">
                {/* QR Code sekarang berisi URL Klaim - Responsive size */}
                <QRCodeSVG 
                  value={currentUrl} 
                  size={window.innerWidth < 400 ? 160 : 200} 
                  className="w-40 h-40 sm:w-[200px] sm:h-[200px]"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-[9px] sm:text-[10px] text-indigo-600 font-bold break-all px-2">
                {currentUrl}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}