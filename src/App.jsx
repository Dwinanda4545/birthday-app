import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Story from './components/Story';
import GiftSection from './components/GiftSection';
import GifterScanner from './components/GifterScanner';
import Countdown from './components/Countdown';

function App() {
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  
  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get('role');
  const status = queryParams.get('status');

  useEffect(() => {
    const checkCountdown = () => {
      // Target: 25 Desember 2025, 00:00 WIB (GMT+7)
      const targetDate = new Date('2025-12-25T00:00:00+07:00');
      
      // Current time in Jakarta timezone
      const now = new Date();
      const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      
      const difference = targetDate - jakartaTime;

      // Jika countdown sudah selesai, tampilkan konten birthday
      if (difference <= 0) {
        setIsCountdownActive(false);
      }
    };

    checkCountdown();
    // Cek setiap detik untuk update status countdown
    const interval = setInterval(checkCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Jika URL mengandung status=claimed, tampilkan halaman sukses
  if (role === 'pemberi' && status === 'claimed') {
    return (
        /* Kita panggil GifterScanner dengan state awal yang langsung sukses */
        <GifterScanner forceSuccess={true} />
    );
  }

  // Jika hanya role=pemberi (tanpa status), tampilkan scanner manual
  if (role === 'pemberi') {
    return <GifterScanner />;
  }

  // Jika countdown masih aktif, tampilkan Countdown component
  if (isCountdownActive) {
    return <Countdown />;
  }

  // Default: Tampilan Penerima (Birthday Person)
  return (
    <main className="bg-black">
      <Hero name="Ayu" />
      <Story />
      <GiftSection />
    </main>
  );
}

export default App;