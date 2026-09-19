const PROMO_ARTICLES = [
  {
    tag: 'Promo Koin',
    title: 'Bonus Top Up Hingga 20%',
    desc: 'Gunakan kode voucher saat topup koin di awal bulan untuk penghematan lebih besar.',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1Xzza9JxuToV93PLiMGzTYrX3Oe3d8lshjrDOAk7jlDmikHq_ZJIZYVUqg9ZgfaV1igA4ZEwrB6FXwjJXpDyYYxRg4LH0GKEqhoCjTaUmfFc4YvD06Vs4yyUqZOWJN0YDMnubCfg3kbWrNKBfW1WVR4oEb2KjS8GVtwLskIDmtOTAmXTDCInkXv4woZQ2xww8ZiT3JjuRGy0P4534SjaT3teihGad6IXw7F4Lf0pnXzCqDiLXAkaAmod8c',
    imgAlt: 'Promo Tambah Koin AyoCuci',
  },
  {
    tag: 'Webinar & Training',
    title: 'Pelatihan Kasir & SOP Outlet',
    desc: 'Ikuti panduan langsung dari praktisi laundry tentang strategi omset puluhan juta.',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WnYAv0yXii0jieNdpGL4FlauUtx8729nElO2B6zl7Tj1BlsaWhFqUL4JUzok7LEiDlmDaFiUC79fGsIxNFRVOJG37FtMafM29gvahdTxj-xTiwyr41KDR6nd2TD8aOfq5U8mVYoj22eHN16-mXgcvLw6KspNbhBXgHvYSX93gBUsDTPAFiHrfgRimWCGE1dnqHzrcPO5U983og3JMLBY4gkM59Eh8s9ogTL_YHKJ4Fj4H84X1pfGJTBbU',
    imgAlt: 'Tutorial Aplikasi AyoCuci Kasir Laundry',
  },
  {
    tag: 'Katalog Suplier',
    title: 'Deterjen Ramah Serat Murah',
    desc: 'Akses harga khusus mitra untuk pewangi konsentrat dan plastik packing laundry ramah lingkungan.',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WtxKGY7Fq-bv0dIb9TEB6uNCl61fJSpUqgSUf0J5XEEkvVl5wjhO-osR8z6EHfzXvMWo3NDxP0O6imsr4bAr5AxovXrB2Py3F8LnXIjYDQZGhFxiTiAfGlvdDFh4objUBl1MbvOKALvQ1LdKxkPoFE-VDY0qgs4zBAPWC4v2kf4Rh-GEzGjSE7xAhDScZs0ZN9Uq8l_CTDCQgadJyNc9EZKqhVMDAN2WoO_QraOr6xcDFxv0Q',
    imgAlt: 'Deterjen & Perlengkapan Laundry Mitra AyoCuci',
  },
];

export default function PromoSection() {
  return (
    <section id="artikel-promo" style={{ padding: '6rem 0', background: 'var(--surface)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* ── Kemitraan Banner ── */}
        <div className="promo-banner">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 1,
          }}>
            <div>
              <span style={{
                display: 'inline-block', padding: '0.2rem 0.875rem', borderRadius: 99,
                background: 'rgba(255,255,255,0.2)', fontSize: 12, fontWeight: 600, marginBottom: 16,
              }}>
                Peluang Bisnis 2025
              </span>
              <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
                Mulai Usaha Laundry Komplit dari Rp 35 Jutaan
              </h2>
              <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.75, marginBottom: '2rem', maxWidth: 480 }}>
                Dapatkan paket mesin komersial, instalasi, chemical ramah serat, SOP karyawan, serta sistem aplikasi kasir AyoCuci siap pakai tanpa franchise fee!
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
                <a href="#kontak-whatsapp" style={{
                  padding: '0.875rem 1.75rem', borderRadius: 99,
                  background: 'var(--surface-container-lowest)', color: 'var(--primary)',
                  fontWeight: 700, fontSize: 14, transition: 'background 0.2s', textDecoration: 'none',
                }}>
                  Konsultasi Paket Kemitraan
                </a>
                <span style={{ fontSize: 13, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                  Slot terbatas tiap kota
                </span>
              </div>
            </div>
            <div>
              <img
                alt="Paket Kemitraan Bisnis Laundry AyoCuci"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WbWasLYc40TNitiRXXd1QOGqaB0jG_nsPVK7YfyAmolq9pQSsh5LnIhs1BIls1voP8SjRY269xid9oLVE5To0QsD79mbTWLC7lesS7eCnBTPrmJnjNNmJmp6tETSEph27XSggbdUo1ZCCAECHsPayAAAA23RGA93Y2RgQmKAfeGEY3rzH2MqW1tpGlxipOVbuEKdareoytN7iB7zPQ8jLZVRPuthsO3TZhDry8vq8LLtVkJrBITN8NDjM"
                style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: '1rem', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
              />
            </div>
          </div>
        </div>

        {/* ── Promo Articles ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PROMO_ARTICLES.map((a) => (
            <div key={a.title} className="promo-card">
              <img src={a.img} alt={a.imgAlt} />
              <div className="promo-card-body">
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{a.tag}</span>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginTop: 6, marginBottom: 8 }}>{a.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}