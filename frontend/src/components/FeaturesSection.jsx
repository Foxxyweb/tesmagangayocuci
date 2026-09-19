const FEATURES = [
  {
    icon: 'toll',
    title: 'Hanya Rp100 / Transaksi',
    desc: '1 Koin = 1 Nota transaksi. Jika hari ini tidak ada orderan, Anda tidak membayar sepeser pun. Koin tidak memiliki masa kedaluwarsa.',
    tag: 'Tanpa Biaya Langganan',
  },
  {
    icon: 'badge',
    title: 'Multi-Pegawai & Shift Kasir',
    desc: 'Beri akses kasir dan staf cuci dengan hak akses terlindungi. Cetak laporan rekonsiliasi kas tiap pergantian shift secara rapi.',
    tag: 'Cegah Kebocoran Kas',
  },
  {
    icon: 'mark_chat_read',
    title: 'Kirim Nota WhatsApp Kilat',
    desc: 'Kirim e-nota digital dan pesan status pencucian "Sedang Dicuci", "Siap Diambil", hingga pelunasan nota langsung ke WhatsApp customer.',
    tag: 'Hemat Kertas Struk',
  },
  {
    icon: 'finance_mode',
    title: 'Laba Rugi Otomatis',
    desc: 'Tak perlu pusing hitung buku manual. Pantau omset harian, rincian pengeluaran deterjen, dan laba bersih secara akurat realtime.',
    tag: 'Siap Ekspor PDF/Excel',
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" style={{ padding: '6rem 0', background: 'rgba(240,243,255,0.5)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 4rem' }}>
          <span style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            Keunggulan AyoCuci
          </span>
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Bayar Saat Bisnis Berjalan,<br />Bukan Saat Waktu Berjalan
          </h2>
          <p style={{ fontSize: 16, color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Kebanyakan aplikasi kasir mengenakan biaya bulanan yang mahal meski cucian sedang sepi. AyoCuci menggunakan sistem koin fleksibel dengan transparansi penuh.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map((f) => (
            <div key={f.icon} className="feature-card" style={{
              padding: '2rem', borderRadius: '1.25rem',
              background: 'var(--surface-container-lowest)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}
            >
              <div>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'rgba(163,57,0,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--primary)', marginBottom: '1.5rem', fontSize: 26,
                }}>
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{f.desc}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600, fontSize: 13 }}>
                <span>{f.tag}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}