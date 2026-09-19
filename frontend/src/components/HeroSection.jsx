import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '6rem',
        background: 'linear-gradient(to bottom, #f9f9ff, rgba(240,243,255,0.4) 50%, #f9f9ff)',
      }}
    >
      {/* ── Ambient mesh background (sama persis dengan HTML asli) ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.4, mixBlendMode: 'multiply',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          alt="Hero Decorative Ambient Mesh"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          src="https://lh3.googleusercontent.com/aida/AEtjO1Un8NHBhQAab1fli9MhV2hUKFURBcnmtghsgrloONHP-XM-Zy2A0_9QOV6dDWCH9T3KHSBHxmAoB55mw8UTtT1TwxjJskhUKoeCtrY2UymZilpTiNaGEOrizSP3ITqkFXwUc7ZjrOqQb56emVvptQ9YjIbK7UxnfGWfVmmTZJu9iNExPh-JTZjwavtIThSla-8uu-dp5AbOIV-8DpH2eMiYmmsL79r_-XLY4pJt1DfrYbv4rUNO3qZp704"
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* ── Badge Pill ── */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '0.375rem 1rem', borderRadius: 9999,
          background: 'rgba(163,57,0,0.1)', color: 'var(--primary)',
          fontSize: 14, fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          marginBottom: '1.5rem', animation: 'pulse 2s infinite',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
          Kelola Bisnis Laundry Tanpa Ribet — 5 Menit Langsung Aktif
        </div>

        {/* ── Headline ── */}
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: 860, marginBottom: '1.5rem' }}>
          Aplikasi Kasir Laundry{' '}
          <span style={{
            background: 'linear-gradient(90deg, var(--primary), var(--secondary-container))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Modern & Praktis
          </span>{' '}
          untuk Majukan Bisnis Anda
        </h1>

        {/* ── Subtitle ── */}
        <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--on-surface-variant)', maxWidth: 640, margin: '0 auto 2.5rem' }}>
          Kelola transaksi harian, pantau status cucian realtime, atur staf & kurir, serta lihat laporan laba rugi outlet laundry dalam satu aplikasi serba otomatis.
        </p>

        {/* ── CTA Buttons ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          <Link to="/register" className="btn btn-primary" id="hero-cta-primary"
            style={{ padding: '1rem 2rem', fontSize: 15, boxShadow: '0 12px 24px -6px rgba(163,57,0,0.4)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>bolt</span>
            Mulai Coba Gratis (Free 20 Koin)
          </Link>
          <Link to="/login" className="btn btn-secondary" id="hero-cta-secondary"
            style={{ padding: '1rem 2rem', fontSize: 15 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--primary)' }}>person</span>
            Masuk ke Dashboard
          </Link>
        </div>

        {/* ── Social Proof Metrics ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem 2.5rem', padding: '1rem 2rem',
          borderRadius: '1.25rem',
          background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          marginBottom: '4rem', maxWidth: 680, width: '100%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}>100+ Mitra</span>
            <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontWeight: 600 }}>Outlet laundry aktif se-Indonesia</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--tertiary)' }}>99.9% Aman</span>
            <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontWeight: 600 }}>Cloud sync realtime & anti-hilang</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--secondary)' }}>5x Lebih Cepat</span>
            <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontWeight: 600 }}>Proses nota & cetak label otomatis</span>
          </div>
        </div>

        {/* ── 3D Phone Mockup Stage (persis seperti HTML asli) ── */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 900, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '75%', height: 280,
            background: 'rgba(163,57,0,0.18)', filter: 'blur(60px)',
            borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Left phone — tilted -6deg */}
          <div style={{
            width: '22%', marginRight: '-3rem', marginBottom: '1rem',
            transform: 'rotate(-6deg)', transition: 'transform 0.5s ease',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))',
            zIndex: 10, display: 'none',
          }} className="phone-left">
            <img
              alt="AyoCuci Antrian Pesanan Kasir Laundry Mobile"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              src="/mockup-kiri.png"
            />
          </div>

          {/* Center phone — main */}
          <div style={{
            width: '38%', zIndex: 20,
            filter: 'drop-shadow(0 30px 35px rgba(163,57,0,0.25))',
            transition: 'transform 0.5s ease',
          }}>
            <img
              alt="AyoCuci Aplikasi Kasir Laundry Dashboard Utama"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              src="/mockup-tengah.png"
            />
          </div>

          {/* Right phone — tilted +6deg */}
          <div style={{
            width: '22%', marginLeft: '-3rem', marginBottom: '1rem',
            transform: 'rotate(6deg)', transition: 'transform 0.5s ease',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))',
            zIndex: 10, display: 'none',
          }} className="phone-right">
            <img
              alt="AyoCuci Ringkasan Harian dan Keuangan Outlet Laundry"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              src="/mockup-kanan.png"
            />
          </div>
        </div>
      </div>

      {/* CSS untuk phone flanking on md+ */}
      <style>{`
        @media (min-width: 768px) {
          .phone-left, .phone-right { display: block !important; }
        }
        .phone-left:hover { transform: rotate(0deg) !important; }
        .phone-right:hover { transform: rotate(0deg) !important; }
      `}</style>
    </section>
  );
}