import { useState } from 'react';

const TOPUP_PACKAGES = [
  { coins: 100, price: 10000, label: '100 Koin', sub: 'Rp 10.000' },
  { coins: 250, price: 25000, label: '250 Koin', sub: 'Rp 25.000' },
  { coins: 500, price: 50000, label: '500 Koin', sub: 'Rp 50.000 ⭐ Favorit', popular: true },
  { coins: 1000, price: 90000, label: '1.000 Koin', sub: 'Rp 90.000 (Disc 10%)' },
];

const formatRp = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function PricingSection() {
  const [orders, setOrders] = useState(40);

  const monthlyCostAyoCuci = orders * 30 * 100;
  const monthlyCostConv = 350000;

  return (
    <section id="harga-simulasi" style={{ padding: '6rem 0', background: 'rgba(240,243,255,0.6)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 4rem' }}>
          <span style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            Skema Harga Transparan
          </span>
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Mulai Gratis, Bayar Saat Digunakan
          </h2>
          <p style={{ fontSize: 16, color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
            Aktivasi akun laundry tanpa biaya tersembunyi. Gunakan semua modul AyoCuci dan cukup bayar sesuai transaksi yang Anda catat.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Free Plan */}
          <div style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'var(--surface-container-lowest)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '0.2rem 0.875rem', borderRadius: 99, background: 'var(--surface-container-high)', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>Early Access Promo</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: 'var(--primary)' }}>FREE</span>
                <span style={{ color: 'var(--on-surface-variant)' }}>Selamanya</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: '2rem', lineHeight: 1.7 }}>
                Mulai kelola bisnis laundry Anda tanpa biaya langganan bulanan. Cocok untuk outlet baru yang ingin mencoba efisiensi digital.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2rem' }}>
                {['Free 20 Koin Transaksi Pertama', 'Akses Penuh Seluruh Fitur Kasir POS', 'Integrasi Notifikasi WhatsApp Pelanggan', 'Dukungan Bantuan Teknis Kilat'].map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(163,57,0,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#" className="btn btn-secondary w-full" style={{ justifyContent: 'center', textAlign: 'center' }}>
              Daftar Akun Sekarang
            </a>
          </div>

          {/* Coin Wallet */}
          <div style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'var(--surface-container-lowest)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'rgba(163,57,0,0.08)', borderBottomLeftRadius: '50%' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>monetization_on</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 17 }}>Dompet Koin AyoCuci</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 800 }}>Rp 100</span>
                <span style={{ color: 'var(--on-surface-variant)' }}>/ Transaksi</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: '2rem', lineHeight: 1.7 }}>
                Mata uang digital di dalam aplikasi untuk membuat nota transaksi. Isi ulang saldo fleksibel kapan pun dibutuhkan.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '2rem' }}>
                {['Bayar sesuai penggunaan', 'Fitur lengkap tanpa batas', 'Tanpa komitmen bulanan', 'Koin tidak ada kadaluwarsa'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>check_circle</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <a href="#" className="btn btn-primary w-full" style={{ justifyContent: 'center', textAlign: 'center' }}>
              Top Up Koin Sekarang
            </a>
          </div>
        </div>

        {/* Interactive Calculator */}
        <div style={{ padding: '2.5rem 3rem', borderRadius: '1.5rem', background: 'var(--surface-container-lowest)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Simulasi Penghematan Biaya</h3>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>Geser slider untuk melihat perbandingan biaya operasional.</p>
            </div>
            <div style={{ padding: '0.5rem 1rem', borderRadius: 99, background: 'rgba(0,104,95,0.1)', color: 'var(--tertiary)', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>savings</span>
              Hemat hingga 70% Biaya IT
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <label style={{ fontWeight: 700, fontSize: 16 }}>Estimasi Nota Cucian / Hari:</label>
              <span style={{ padding: '0.25rem 1rem', borderRadius: 99, background: 'rgba(163,57,0,0.1)', color: 'var(--primary)', fontWeight: 800, fontSize: 18 }}>{orders} Nota/hari</span>
            </div>
            <input
              type="range" min="10" max="250" step="5" value={orders}
              onChange={e => setOrders(Number(e.target.value))}
              id="orderRange"
              style={{ width: '100%', accentColor: 'var(--primary)', height: 6, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 6 }}>
              <span>10 Nota (Rumahan)</span>
              <span>100 Nota (Ruko/Outlet Ramai)</span>
              <span>250 Nota (Multi-Cabang)</span>
            </div>
          </div>

          {/* Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(163,57,0,0.05)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', marginBottom: 4 }}>AyoCuci (Sistem Koin Rp100)</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{formatRp(monthlyCostAyoCuci)} / bln</div>
              <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>Hanya bayar sesuai nota yang tercetak. Tanpa sewa server atau komitmen tahunan.</p>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '1rem', background: 'var(--surface-container-high)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--on-surface-variant)', marginBottom: 4 }}>Software Laundry Konvensional</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--on-surface-variant)', marginBottom: 6 }}>Rp 350.000 / bln</div>
              <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>Biaya langganan tetap berjalan walau outlet sepi pelanggan atau tutup libur.</p>
            </div>
          </div>

          {/* Top-up packages */}
          <div>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Paket Top Up Populer:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {TOPUP_PACKAGES.map((p) => (
                <div key={p.coins} style={{
                  padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center', cursor: 'pointer',
                  background: p.popular ? 'rgba(163,57,0,0.15)' : 'var(--surface-container)',
                  color: p.popular ? 'var(--primary)' : 'inherit',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => !p.popular && (e.currentTarget.style.background = 'rgba(163,57,0,0.08)', e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={e => !p.popular && (e.currentTarget.style.background = 'var(--surface-container)', e.currentTarget.style.color = 'inherit')}
                >
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                  <div style={{ fontSize: 12 }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}