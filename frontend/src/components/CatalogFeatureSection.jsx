export default function CatalogFeatureSection() {
  return (
    <section style={{ padding: '6rem 0', background: '#fcfcfc' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        
        {/* Bagian Kiri: Teks */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>local_shipping</span>
            Layanan Fleksibel & Antar Jemput
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem', color: '#111' }}>
            Katalog Layanan Komplit & Kurir Terorganisir
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#555', marginBottom: '2rem' }}>
            Atur berbagai paket cuci: Cuci Kering Setrika, Cuci Basah, Cuci Lipat, hingga Express 3 Jam dengan harga bertingkat. Dukung kurir antar jemput dengan alamat dan koordinat presisi.
          </p>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#222', marginBottom: '0.5rem' }}>Mendukung Semua Jenis Satuan</h4>
            <p style={{ fontSize: 14, color: '#666' }}>Kg, Pcs, Meter Persegi (Karpet/Gorden), Sepatu, Helm</p>
          </div>
        </div>

        {/* Bagian Kanan: Mockup HP */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/mockup_katalog.jpg" 
            alt="Layanan Katalog" 
            style={{ 
              width: '100%', 
              maxWidth: 320,
              height: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))'
            }} 
          />
        </div>

      </div>
    </section>
  );
}
