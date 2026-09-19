const SHOWCASES = [
  {
    tag: 'KONTROL TOTAL OUTLET',
    icon: 'analytics',
    title: 'Ringkasan Operasional & Antrian Laundry Realtime',
    desc: 'Pantau status setiap cucian masuk: Masuk, Proses Cuci, Pengeringan, Siap Ambil, hingga Selesai. Kasir dapat mencari nota pelanggan via nama, nomor telepon, atau scan barcode nota thermal secara instan.',
    points: [
      'Filter status cucian otomatis (Antrian, Proses, Siap Ambil)',
      'Dukungan printer Bluetooth thermal 58mm & 80mm',
      'Pemisahan kategori kiloan, satuan jas, selimut, dan karpet',
    ],
    imgSrc: '/mockup_antrian.jpg',
    imgAlt: 'AyoCuci Dashboard Operasional Antrian',
    reverse: false,
  },
  {
    tag: 'MANAJEMEN KAS SEHAT',
    icon: 'payments',
    title: 'Pantau Piutang Pelanggan & Laporan Laba Bersih',
    desc: 'Jangan biarkan uang usaha tertahan tanpa kejelasan. Modul laporan piutang memetakan orderan yang belum lunas atau jatuh tempo, lengkap dengan tombol reminder otomatis via WhatsApp.',
    stats: [
      { label: 'Laba Bersih Tercatat', value: '+100% Realtime', color: 'var(--tertiary)' },
      { label: 'Pengingat Piutang', value: '1-Klik WhatsApp', color: 'var(--primary)' },
    ],
    imgSrc: '/mockup_laporan.jpg',
    imgAlt: 'AyoCuci Laporan Laba Rugi',
    reverse: true,
  },
  {
    tag: 'LAYANAN FLEKSIBEL & ANTAR JEMPUT',
    icon: 'moped',
    title: 'Katalog Layanan Komplit & Kurir Terorganisir',
    desc: 'Atur berbagai paket cuci: Cuci Kering Setrika, Cuci Basah, Cuci Lipat, hingga Express 3 Jam dengan harga bertingkat. Dukung kurir antar jemput dengan alamat dan koordinat presisi.',
    extra: { title: 'Mendukung Semua Jenis Satuan', subtitle: 'Kg, Pcs, Meter Persegi (Karpet/Gorden), Sepatu, Helm' },
    imgSrc: '/mockup_layanan.jpg',
    imgAlt: 'AyoCuci Katalog Layanan Input Order',
    reverse: false,
  },
];

export default function ShowcaseSection() {
  return (
    <section id="keunggulan" style={{ padding: '6rem 0', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {SHOWCASES.map((s, idx) => (
          <div key={idx} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Text Column */}
            <div style={{ order: s.reverse ? 2 : 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontWeight: 700, fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{s.icon}</span>
                <span>{s.tag}</span>
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.25, marginBottom: 20 }}>{s.title}</h2>
              <p style={{ fontSize: 16, color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: 24 }}>{s.desc}</p>

              {s.points && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  {s.points.map((p) => (
                    <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,104,95,0.1)', color: 'var(--tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>done</span>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              {s.stats && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '1.5rem', borderRadius: '1rem', background: 'var(--surface-container-lowest)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: 8 }}>
                  {s.stats.map((st) => (
                    <div key={st.label}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{st.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: st.color }}>{st.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {s.extra && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{s.extra.title}</div>
                    <div style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>{s.extra.subtitle}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Column */}
            <div style={{ order: s.reverse ? 1 : 2 }}>
              <div style={{ padding: 16, borderRadius: '1.5rem', background: 'var(--surface-container-low)', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
                <img src={s.imgSrc} alt={s.imgAlt} style={{ width: '100%', borderRadius: '1rem', display: 'block' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
