export default function CtaSection() {
  return (
    <section id="kontak-whatsapp" style={{ padding: '5rem 0', background: 'var(--surface-container-low)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          padding: '4rem', borderRadius: '2rem',
          background: 'var(--surface-container-lowest)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
          textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(163,57,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: 24 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 36 }}>rocket_launch</span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, maxWidth: 700, lineHeight: 1.25, marginBottom: 16 }}>
            Siap Mengembangkan Bisnis Laundry Anda Lebih Modern & Bebas Drama?
          </h2>
          <p style={{ fontSize: 17, color: 'var(--on-surface-variant)', maxWidth: 580, lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Bergabunglah sekarang dengan ratusan pengusaha laundry cerdas. Dapatkan Free 20 Koin pertama untuk langsung mulai transaksi hari ini.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <a href="https://wa.me/6281170030030" target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              style={{ padding: '1rem 2rem', fontSize: 15 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>chat</span>
              Konsultasi WhatsApp (0811 7003 0030)
            </a>
            <a href="#" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: 15 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>download</span>
              Download AyoCuci Mobile
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', color: 'var(--on-surface-variant)', fontSize: 13 }}>
            {[
              { icon: 'verified_user', text: 'Tanpa Kontrak Mengikat' },
              { icon: 'bolt', text: 'Setup 5 Menit' },
              { icon: 'support_agent', text: 'Support Siaga 7 Hari' },
            ].map((b) => (
              <div key={b.icon} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}