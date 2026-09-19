import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Fitur', href: '/#fitur' },
  { label: 'Keunggulan', href: '/#keunggulan' },
  { label: 'Harga & Simulasi', href: '/#harga-simulasi' },
  { label: 'Artikel & Promo', href: '/#artikel-promo' },
  { label: 'Testimoni', href: '/#testimoni' },
  { label: 'Kontak', href: '/#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          
          <div className="navbar-logo">
            <Link to="/">
              AyoCuci
            </Link>
          </div>

          <nav className="navbar-nav">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="navbar-actions">
            <Link to="/register" className="btn btn-secondary" style={{ padding: '0.625rem 1.25rem' }}>
              Konsultasi Gratis
            </Link>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.625rem 1.25rem' }}>
              Download / Masuk
            </Link>
            <div className="btn-primary" style={{ width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}