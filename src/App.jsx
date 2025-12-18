import Hero from './components/Hero';
import Story from './components/Story';
import GiftSection from './components/GiftSection';
import GifterScanner from './components/GifterScanner';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get('role');
  const status = queryParams.get('status');

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