import { useState } from 'react';
import { trackOrder, formatDate, formatRupiah } from '../utils/api';

const STEPS = ['Pending', 'Diproses', 'Selesai'];
const STATUS_ICONS = { Pending: 'schedule', Diproses: 'autorenew', Selesai: 'check_circle' };

function StatusBadge({ status }) {
  const cls = { Pending: 'badge-pending', Diproses: 'badge-diproses', Selesai: 'badge-selesai' }[status] || '';
  return (
    <span className={`badge ${cls}`}>
      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{STATUS_ICONS[status]}</span>
      {status}
    </span>
  );
}

export default function TrackingSection() {
  const [code, setCode] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const data = await trackOrder(code.trim());
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = STEPS.indexOf(order?.status ?? '');

  return (
    <section id="tracking" className="section tracking-section">
      <div className="container" style={{ maxWidth: 720 }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="section-badge">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>search</span>
            Lacak Pesanan
          </div>
          <h2 className="text-headline-md section-title">Status Cucian Anda</h2>
          <p className="text-body-md text-muted section-subtitle" style={{ margin: '0 auto' }}>
            Masukkan kode tracking yang diterima saat pemesanan (format: AC-XXXX).
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleTrack} className="tracking-search">
          <input
            id="tracking-code-input"
            type="text"
            className="tracking-input"
            placeholder="AC-XXXX"
            value={code}
            maxLength={7}
            onChange={(e) => { setCode(e.target.value); setError(null); }}
          />
          <button type="submit" id="btn-track-order" className="btn btn-primary"
            disabled={loading || !code.trim()} style={{ flexShrink: 0 }}>
            {loading ? <span className="spinner" /> : (
              <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span> Lacak</>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error animate-fadeSlideUp" style={{ marginBottom: '1.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 6 }}>error</span>
            {error}
          </div>
        )}

        {order && (
          <div className="card order-card animate-fadeSlideUp">
            {/* Order Header */}
            <div className="order-header">
              <div>
                <p className="text-label-md text-muted mb-1">Kode Pesanan</p>
                <p className="order-code">{order.order_code}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Progress Steps */}
            <div className="progress-steps mb-6">
              {STEPS.map((step, i) => (
                <>
                  <div className="step" key={step}>
                    <div className={`step-circle ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
                      {i < currentStep ? (
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
                      ) : i + 1}
                    </div>
                    <span className={`step-label ${i === currentStep ? 'active' : ''}`}>{step}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`step-connector ${i < currentStep ? 'done' : ''}`} key={`c-${i}`} />
                  )}
                </>
              ))}
            </div>

            {/* Detail Grid */}
            <div className="order-details">
              <div className="detail-item">
                <span className="detail-label">Nama Pelanggan</span>
                <span className="detail-value">{order.customer_name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">No. HP</span>
                <span className="detail-value">{order.phone}</span>
              </div>
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <span className="detail-label">Alamat Penjemputan</span>
                <span className="detail-value">{order.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Layanan</span>
                <span className="detail-value">{order.service.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Harga Satuan</span>
                <span className="detail-value">{formatRupiah(order.service.price)} / {order.service.unit}</span>
              </div>
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <span className="detail-label">Tanggal Penjemputan</span>
                <span className="detail-value">{formatDate(order.pickup_date)}</span>
              </div>
            </div>

            {/* Status info box */}
            <div style={{
              marginTop: '1rem',
              padding: '0.875rem 1rem',
              borderRadius: '0.875rem',
              background: 'var(--surface-container-low)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
                {STATUS_ICONS[order.status]}
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Status: {order.status}</div>
                <div style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>
                  {{
                    Pending: 'Pesanan Anda telah diterima. Kurir sedang dalam perjalanan menjemput.',
                    Diproses: 'Cucian Anda sedang diproses di laundry. Harap tunggu ya!',
                    Selesai: 'Cucian sudah selesai dan siap dikirim ke alamat Anda.',
                  }[order.status]}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state hint */}
        {!order && !error && !loading && (
          <div className="text-center" style={{ padding: '2rem', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12, opacity: 0.4 }}>
              search
            </span>
            <p className="text-body-md">Masukkan kode tracking di atas untuk melihat status pesanan Anda.</p>
          </div>
        )}
      </div>
    </section>
  );
}