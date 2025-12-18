import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner'; // Import scanner asli
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, RefreshCw, Camera } from 'lucide-react';

export default function GifterScanner({ forceSuccess = false }) {
  const [status, setStatus] = useState(forceSuccess ? 'success' : 'idle');
  const [errorMsg, setErrorMsg] = useState("");

  const handleScan = (result) => {
    if (result) {
      const scannedText = result[0].rawValue; 
  
      // VALIDASI: Apakah teks yang di-scan mengandung kunci rahasia kita?
      if (scannedText.includes("GIFT-VERIFIED-AYU-24-2025")) {
        setStatus('success');
        setErrorMsg("");
      } else {
        // Jika men-scan QR sembarangan (misal: menu mcd atau qr wa)
        setStatus('error');
        setErrorMsg("QR Code Tidak Valid! Gunakan QR dari halaman Birthday.");
      }
    }
  };
  

  const reset = () => {
    setStatus('idle');
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-white font-sans">
      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'error' ? (
          <motion.div key="scanner" className="w-full max-w-md flex flex-col items-center px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Scanner Verifikasi</h1>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8 text-center px-2">
              Arahkan kamera ke QR Code milik si Penerima
            </p>

            {/* Kamera Aktif - Responsive size */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 border-2 border-indigo-500 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <Scanner
                onScan={handleScan}
                onError={(error) => console.log(error?.message)}
                constraints={{ facingMode: 'environment' }} // Menggunakan kamera belakang HP
              />
              
              {/* Animasi Garis Laser */}
              <motion.div 
                animate={{ top: ['5%', '95%', '5%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 sm:h-1 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] z-10"
              />
            </div>

            {/* Tampilan Jika QR Salah */}
            {status === 'error' && (
              <motion.div 
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-500/20 border border-red-500 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 text-red-400 w-full max-w-sm"
              >
                <ShieldAlert size={20} className="flex-shrink-0 sm:w-6 sm:h-6" />
                <p className="text-[10px] sm:text-xs font-bold leading-tight">{errorMsg}</p>
              </motion.div>
            )}

            <button 
              onClick={reset} 
              className="mt-6 sm:mt-8 text-slate-500 hover:text-slate-300 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest transition-colors"
            >
              <RefreshCw size={14} className="sm:w-4 sm:h-4" /> Refresh Kamera
            </button>
          </motion.div>
        ) : (
          /* Tampilan Jika Sukses */
          <motion.div 
            key="success" 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="text-center px-4"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
              <ShieldCheck size={48} className="text-white sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 tracking-tighter uppercase">Verified!</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-8 sm:mb-10">Silahkan berikan hadiahnya sekarang! 🎁</p>
            <button 
              onClick={reset} 
              className="px-5 sm:px-6 py-2 sm:py-3 border border-slate-700 rounded-full text-slate-500 hover:text-white hover:border-slate-500 transition-colors text-sm sm:text-base"
            >
              Scan Lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}