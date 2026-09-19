const REVIEWS = [
  { initials: 'RD', name: 'Rina Dewi', role: 'Owner Laundry Cepat', text: '"Laporan keuangan harian jadi lebih mudah dipantau dari HP tanpa harus ke outlet. Semua kas masuk kas keluar kelihatan jelas."' },
  { initials: 'HK', name: 'Hendra Kurnia', role: 'Owner Laundry Prima', text: '"Sistem koin Rp100 itu juara banget! Di aplikasi lain saya harus bayar Rp200rb/bulan meski sepi waktu liburan. AyoCuci sangat adil."' },
  { initials: 'DP', name: 'Dina Putri', role: 'Owner Laundry Segar', text: '"Pelanggan suka sekali dapat notif WhatsApp otomatis saat cuciannya selesai. Toko kami jadi terlihat jauh lebih profesional dan modern."' },
  { initials: 'SR', name: 'Siti Rahma', role: 'Owner Laundry Kilat', text: '"Dulu catat nota manual pakai nota kertas sering hilang atau selisih uang kasir. Sekarang ada kontrol shift pegawai, outlet aman tentram."' },
];

export default function TestimonialsSection() {
  return (
    <section id="testimoni" style={{ padding: '6rem 0', background: 'rgba(240,243,255,0.4)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 4rem' }}>
          <span style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            Cerita Sukses Mitra
          </span>
          <h2 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Apa Kata Pengusaha Laundry Tentang AyoCuci?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Simak pengalaman para pemilik outlet yang berhasil menekan angka kebocoran kas dan meningkatkan kepuasan pelanggan mereka.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {REVIEWS.map((r) => (
            <div key={r.initials} style={{
              padding: '1.5rem', borderRadius: '1.25rem',
              background: 'var(--surface-container-lowest)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 2, color: 'var(--secondary-container)', marginBottom: 16 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: 18, color: '#ffb800' }}>star</span>
                  ))}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--on-surface)' }}>{r.text}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(163,57,0,0.1)', color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}