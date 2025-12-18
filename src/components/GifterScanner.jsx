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
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-sans">
      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'error' ? (
          <motion.div key="scanner" className="w-full max-w-md flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-2">Scanner Verifikasi</h1>
            <p className="text-slate-400 text-sm mb-8 text-center">
              Arahkan kamera ke QR Code milik si Penerima
            </p>

            {/* Kamera Aktif */}
            <div className="relative w-72 h-72 border-2 border-indigo-500 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <Scanner
                onScan={handleScan}
                onError={(error) => console.log(error?.message)}
                constraints={{ facingMode: 'environment' }} // Menggunakan kamera belakang HP
              />
              
              {/* Animasi Garis Laser */}
              <motion.div 
                animate={{ top: ['5%', '95%', '5%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] z-10"
              />
            </div>

            {/* Tampilan Jika QR Salah */}
            {status === 'error' && (
              <motion.div 
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3 text-red-400"
              >
                <ShieldAlert size={24} />
                <p className="text-xs font-bold">{errorMsg}</p>
              </motion.div>
            )}

            <button onClick={reset} className="mt-8 text-slate-500 flex items-center gap-2 text-sm uppercase tracking-widest">
              <RefreshCw size={14} /> Refresh Kamera
            </button>
          </motion.div>
        ) : (
          /* Tampilan Jika Sukses */
          <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
              <ShieldCheck size={64} className="text-white" />
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase">Verified!</h2>
            <p className="text-slate-400 mb-10">Silahkan berikan hadiahnya sekarang! 🎁</p>
            <button onClick={reset} className="px-6 py-2 border border-slate-700 rounded-full text-slate-500 hover:text-white transition-colors">
              Scan Lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}