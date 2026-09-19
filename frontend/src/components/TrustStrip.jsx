const LOGOS = [
  { icon: 'iron',                  name: 'RumahSetrika' },
  { icon: 'local_laundry_service', name: 'CareMedan' },
  { icon: 'dry_cleaning',          name: 'WangiStore' },
  { icon: 'soap',                  name: 'Deter_Gent' },
  { icon: 'eco',                   name: 'EcoPack' },
];

export default function TrustStrip() {
  return (
    <section style={{
      padding: '3rem 0',
      background: 'var(--surface-container-lowest)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}>
      <div className="container" style={{
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '2rem',
      }}>
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Pilihan Pengusaha Laundry Modern</div>
          <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>Dari skala kiloan rumahan hingga waralaba</div>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: '2rem', opacity: 0.7,
          filter: 'grayscale(1)',
          transition: 'filter 0.3s, opacity 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.opacity = 1; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = 0.7; }}
        >
          {LOGOS.map((l) => (
            <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 26 }}>{l.icon}</span>
              <span>{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}