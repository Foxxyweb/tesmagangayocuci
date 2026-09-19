import { useState } from 'react';

const FAQS = [
  {
    q: 'Apakah koin AyoCuci memiliki batas kadaluwarsa?',
    a: 'Tidak ada! Koin yang sudah Anda beli akan tetap tersimpan di akun Anda dan bisa digunakan kapan saja selama bisnis Anda berjalan.',
  },
  {
    q: 'Printer apa saja yang didukung oleh aplikasi?',
    a: 'AyoCuci kompatibel dengan hampir semua printer kasir Bluetooth thermal ukuran 58mm maupun 80mm di Android dan iOS.',
  },
  {
    q: 'Apakah data pelanggan dan transaksi saya aman?',
    a: 'Data Anda tersimpan di cloud terenkripsi standar industri dengan cadangan otomatis berkala, sehingga data transaksi Anda tidak akan hilang meski HP kasir rusak.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: '5rem 0', background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            Pertanyaan Umum
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 800 }}>Hal yang Sering Ditanyakan</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{
              borderRadius: '1rem', background: 'var(--surface-container-lowest)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden',
              cursor: 'pointer',
            }} onClick={() => setOpen(open === i ? null : i)}>
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontWeight: 700, fontSize: 16, marginRight: 12 }}>{f.q}</h4>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--primary)', transition: 'transform 0.25s', transform: open === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>expand_more</span>
              </div>
              {open === i && (
                <div style={{ padding: '0 1.5rem 1.25rem', fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.75 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}