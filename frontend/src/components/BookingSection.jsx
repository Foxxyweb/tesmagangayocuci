import { useState, useEffect } from 'react';
import { createOrder, getServices, formatRupiah, formatDate } from '../utils/api';

const SERVICE_ICONS = {
  'Cuci Kiloan': 'scale',
  'Cuci Sepatu': 'footprint',
  'Bedcover': 'bed',
  'Cuci Sofa': 'chair',
};

export default function BookingSection() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
    pickup_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        if (data.length > 0) setSelectedService(data[0]);
      })
      .catch(() => setError('Gagal memuat layanan. Pastikan server backend berjalan.'))
      .finally(() => setLoadingServices(false));
  }, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return setError('Pilih layanan terlebih dahulu.');
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await createOrder({
        ...form,
        service_id: selectedService.id,
      });
      setResult(data);
      setForm({ customer_name: '', phone: '', address: '', pickup_date: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="section booking-section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="section-badge">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>local_laundry_service</span>
            Booking Online
          </div>
          <h2 className="text-headline-md section-title">Pesan Layanan Laundry</h2>
          <p className="text-body-md text-muted section-subtitle" style={{ margin: '0 auto' }}>
            Isi formulir di bawah dan kurir kami akan menjemput cucian Anda sesuai jadwal.
          </p>
        </div>

        {/* Success Banner */}
        {result && (
          <div className="alert alert-success animate-fadeSlideUp mb-6" style={{ maxWidth: 640, margin: '0 auto 2rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
              <strong>Pesanan Berhasil Dibuat!</strong>
            </div>
            <p style={{ marginBottom: '0.75rem', fontSize: 14 }}>Simpan kode tracking Anda untuk melacak status cucian.</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              background: 'rgba(0,0,0,0.1)', padding: '0.5rem 1rem',
              borderRadius: '9999px', fontWeight: 700, letterSpacing: '0.08em'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>confirmation_number</span>
              Kode Tracking: {result.order_code}
            </div>
          </div>
        )}

        <div className="booking-grid">
          {/* Form Column */}
          <div>
            {/* Service Picker */}
            <div className="mb-6">
              <h3 className="text-title-md mb-4">1. Pilih Layanan</h3>
              {loadingServices ? (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{
                      flex: 1, height: 120, borderRadius: '1rem',
                      background: 'var(--surface-container)', animation: 'pulse 1.5s infinite'
                    }} />
                  ))}
                </div>
              ) : (
                <div className="services-grid">
                  {services.map((s) => (
                    <div
                      key={s.id}
                      className={`service-card ${selectedService?.id === s.id ? 'selected' : ''}`}
                      onClick={() => setSelectedService(s)}
                      id={`service-card-${s.id}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedService(s)}
                    >
                      <div className="service-icon">
                        <span className="material-symbols-outlined">
                          {SERVICE_ICONS[s.name] || 'local_laundry_service'}
                        </span>
                      </div>
                      <div className="text-label-lg" style={{ color: 'var(--on-surface)', marginBottom: 4 }}>{s.name}</div>
                      <div className="service-price">{formatRupiah(s.price)}</div>
                      <div className="service-unit">per {s.unit}</div>
                      {s.desc && <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 8 }}>{s.desc}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <h3 className="text-title-md mb-4">2. Isi Data Diri</h3>
            {error && (
              <div className="alert alert-error mb-4">
                <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 6 }}>error</span>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label htmlFor="customer_name" className="form-label">Nama Lengkap</label>
                <input id="customer_name" name="customer_name" type="text" className="form-input"
                  placeholder="Contoh: Budi Santoso" value={form.customer_name}
                  onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">No. WhatsApp / HP</label>
                <input id="phone" name="phone" type="tel" className="form-input"
                  placeholder="Contoh: 08123456789" value={form.phone}
                  onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">Alamat Penjemputan</label>
                <textarea id="address" name="address" className="form-input"
                  placeholder="Jl. Merpati No. 12, RT 03/RW 05, Jakarta Selatan"
                  value={form.address} onChange={handleChange} rows={3} required />
              </div>
              <div className="form-group">
                <label htmlFor="pickup_date" className="form-label">Tanggal Penjemputan</label>
                <input id="pickup_date" name="pickup_date" type="date" className="form-input"
                  value={form.pickup_date} onChange={handleChange} min={minDate} required />
              </div>
              <button type="submit" id="btn-booking-submit" className="btn btn-primary w-full" disabled={loading}
                style={{ padding: '1rem', fontSize: 15, marginTop: 8 }}>
                {loading ? <><span className="spinner" /> Memproses...</> : (
                  <><span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span> Kirim Pesanan</>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar Preview */}
          <div className="booking-sidebar">
            <div className="booking-preview">
              <h3>
                <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: 8 }}>receipt_long</span>
                Ringkasan Pesanan
              </h3>
              <div className="preview-item">
                <span className="preview-label">Layanan</span>
                <span className="preview-value">{selectedService ? selectedService.name : '—'}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Harga</span>
                <span className="preview-value">
                  {selectedService ? `${formatRupiah(selectedService.price)} / ${selectedService.unit}` : '—'}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Nama</span>
                <span className="preview-value">{form.customer_name || '—'}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">No. HP</span>
                <span className="preview-value">{form.phone || '—'}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Tanggal Jemput</span>
                <span className="preview-value">{form.pickup_date ? formatDate(form.pickup_date) : '—'}</span>
              </div>
            </div>

            {/* Info Steps */}
            <div className="card mt-4" style={{ padding: '1.5rem' }}>
              <h4 className="text-label-lg mb-4" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Cara Kerja
              </h4>
              {[
                { icon: 'send', label: '1. Isi & kirim form booking' },
                { icon: 'local_shipping', label: '2. Kurir jemput sesuai jadwal' },
                { icon: 'local_laundry_service', label: '3. Laundry diproses kilat' },
                { icon: 'check_circle', label: '4. Pakaian diantar bersih & rapi' },
              ].map((step) => (
                <div key={step.icon} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(163,57,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>{step.icon}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}