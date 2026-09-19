export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-container-lowest)', paddingTop: '2.5rem', paddingBottom: '1.5rem', marginTop: '2.5rem', boxShadow: '0 -4px 20px rgba(0,0,0,0.02)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 20 }}>local_laundry_service</span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>AyoCuci</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.75, maxWidth: 280, marginBottom: 16 }}>
              Aplikasi kasir dan manajemen operasional laundry modern terpadu. Bantu ratusan outlet di Indonesia bertumbuh secara otomatis, rapi, dan anti-ribet.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { icon: 'play_arrow', label: 'Tersedia di', platform: 'Google Play' },
                { icon: 'smartphone', label: 'Download di', platform: 'App Store' },
              ].map((store) => (
                <div key={store.platform} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.5rem 1rem', borderRadius: '0.75rem', background: 'var(--surface-container-low)', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 22 }}>{store.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--on-surface-variant)', fontWeight: 700, textTransform: 'uppercase' }}>{store.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{store.platform}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produk & Fitur */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Produk & Fitur</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Kasir POS', 'Pelacakan Status', 'Manajemen Kurir', 'Notifikasi WhatsApp', 'Laporan Keuangan'].map((l) => (
                <a key={l} href="#" style={{ fontSize: 14, color: 'var(--on-surface-variant)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}>{l}</a>
              ))}
            </div>
          </div>

          {/* Bantuan */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Bantuan & Panduan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Harga Koin Transaksi', 'Video Tutorial Setup', 'Panduan Integrasi Printer', 'FAQ & Bantuan Kilat', 'Syarat & Ketentuan'].map((l) => (
                <a key={l} href="#" style={{ fontSize: 14, color: 'var(--on-surface-variant)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}>{l}</a>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Kontak Resmi</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: 'chat', text: 'WhatsApp: +62 812-3456-7890' },
                { icon: 'mail', text: 'support@ayocuci.co.id' },
                { icon: 'location_on', text: 'Gedung Graha Ayo, Jl. Kemang Raya No. 42, Jakarta Selatan' },
              ].map((c) => (
                <div key={c.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--on-surface-variant)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--outline-variant)', marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--on-surface-variant)' }}>
          <span>© 2025 AyoCuci. Hak Cipta Dilindungi Undang-Undang.</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Kebijakan Privasi', 'Ketentuan Layanan', 'Keamanan Data'].map((l) => (
              <a key={l} href="#" style={{ color: 'var(--on-surface-variant)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}