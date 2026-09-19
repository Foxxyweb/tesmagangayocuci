import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:3001/api';
const getToken = () => localStorage.getItem('ayocuci_token');
const authHeader = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' });

// ─── Sidebar ────────────────────────────────────────────────────────────────
const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: 'dashboard', exact: true },
  { path: '/admin/transaksi', label: 'Transaksi & Antrian', icon: 'receipt_long' },
  { path: '/admin/pelanggan', label: 'Data Pelanggan', icon: 'groups' },
  { path: '/admin/staf', label: 'Staf Kasir', icon: 'badge' },
];

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside style={{
      width: collapsed ? 64 : 240, minHeight: '100vh', background: '#1a1a2e',
      display: 'flex', flexDirection: 'column', transition: 'width 0.2s ease',
      flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto'
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 20 }}>local_laundry_service</span>
        </div>
        {!collapsed && <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>Ayo<span style={{ color: '#f97316' }}>Cuci</span></span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px' }}>
        {menuItems.map(m => (
          <Link key={m.path} to={m.path} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
            borderRadius: 10, marginBottom: 4, textDecoration: 'none',
            background: isActive(m.path, m.exact) ? 'rgba(249,115,22,0.15)' : 'transparent',
            color: isActive(m.path, m.exact) ? '#f97316' : 'rgba(255,255,255,0.65)',
            fontWeight: isActive(m.path, m.exact) ? 700 : 500, fontSize: 14,
            transition: 'all 0.15s', whiteSpace: 'nowrap', overflow: 'hidden'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, flexShrink: 0 }}>{m.icon}</span>
            {!collapsed && <span>{m.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {!collapsed && (
          <div style={{ padding: '8px 12px', marginBottom: 8, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>{user?.name}</div>
            <div style={{ marginTop: 2 }}>{user?.role}</div>
          </div>
        )}
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', width: '100%',
          borderRadius: 10, border: 'none', background: 'transparent',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 14, fontWeight: 500
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── Card Component ──────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>{label}</span>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ color, fontSize: 20 }}>{icon}</span>
        </div>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>{value}</div>
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────
const statusColor = { Proses: '#f97316', Selesai: '#22c55e', Batal: '#ef4444', Antar: '#3b82f6' };
function Badge({ status }) {
  const c = statusColor[status] || '#888';
  return <span style={{ background: c + '18', color: c, padding: '3px 10px', borderRadius: 99, fontWeight: 700, fontSize: 12 }}>{status}</span>;
}

// ─── DASHBOARD HOME ──────────────────────────────────────────────────────────
function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ orders: 0, customers: 0, income: 0 });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API}/admin/stats`, { headers: authHeader() })
      .then(r => r.json()).then(d => { if (d.success) setStats(d.data); }).catch(() => {});
    fetch(`${API}/orders`, { headers: authHeader() })
      .then(r => r.json()).then(d => { if (d.success) setOrders(d.data.slice(0, 5)); }).catch(() => {});
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Halo, {user?.name} 👋</h1>
        <p style={{ color: '#888', marginTop: 4, fontSize: 14 }}>Selamat datang di dashboard AyoCuci</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="Pendapatan Lunas" value={`Rp ${(stats.income || 0).toLocaleString('id-ID')}`} icon="payments" color="#f97316" />
        <StatCard label="Total Transaksi" value={`${stats.orders || 0} Nota`} icon="receipt_long" color="#3b82f6" />
        <StatCard label="Total Pelanggan" value={`${stats.customers || 0} Orang`} icon="groups" color="#8b5cf6" />
        <StatCard label="Transaksi Hari Ini" value="0 Nota" icon="today" color="#22c55e" />
      </div>

      <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Transaksi Terbaru</h2>
        {orders.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '32px 0' }}>Belum ada transaksi</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                {['Kode', 'Pelanggan', 'Layanan', 'Total', 'Status', 'Tgl'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#888', fontWeight: 700, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#f97316' }}>{o.order_code}</td>
                  <td style={{ padding: '12px' }}>{o.customer_name}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{o.service?.name || '-'}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>Rp {o.total_price?.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '12px' }}><Badge status={o.status} /></td>
                  <td style={{ padding: '12px', color: '#888' }}>{new Date(o.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── TRANSAKSI ───────────────────────────────────────────────────────────────
function Transaksi() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer_name: '', phone: '', service_id: '5', weight_qty: '', total_price: '' });

  const loadOrders = () => {
    fetch(`${API}/orders`, { headers: authHeader() })
      .then(r => r.json()).then(d => { if (d.success) setOrders(d.data); }).catch(() => {}).finally(() => setLoading(false));
  };
  
  useEffect(() => { loadOrders(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/orders`, { method: 'POST', headers: authHeader(), body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setForm({ customer_name: '', phone: '', service_id: '5', weight_qty: '', total_price: '' });
        loadOrders();
      } else alert(data.message || 'Gagal menambahkan transaksi');
    } catch (err) { alert('Terjadi kesalahan'); }
  };

  const updateStatus = async (id, field, value) => {
    try {
      const res = await fetch(`${API}/orders/${id}/status`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ [field]: value })
      });
      if (res.ok) loadOrders();
    } catch (e) { console.error(e); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Transaksi & Antrian</h1>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f97316', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Transaksi Baru
        </button>
      </div>

      {showModal && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Buat Transaksi Baru</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input required type="text" placeholder="Nama Pelanggan" style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }} value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} />
              <input required type="text" placeholder="No. HP" style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <select style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }} value={form.service_id} onChange={e => setForm({...form, service_id: e.target.value})}>
                <option value="5">Cuci Komplit (Reguler)</option>
                <option value="6">Cuci Kering Saja</option>
                <option value="7">Setrika Saja</option>
                <option value="8">Cuci Kilat (6 Jam)</option>
              </select>
              <input required type="number" step="0.1" placeholder="Berat (Kg) / Qty" style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }} value={form.weight_qty} onChange={e => setForm({...form, weight_qty: e.target.value})} />
              <input required type="number" placeholder="Total Harga (Rp)" style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }} value={form.total_price} onChange={e => setForm({...form, total_price: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button type="submit" style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 700, cursor: 'pointer' }}>Simpan Transaksi</button>
              <button type="button" onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>Batal</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>Memuat data...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '2px solid #f0f0f0' }}>
                {['Kode Order', 'Pelanggan', 'No. HP', 'Layanan', 'Berat/Qty', 'Total', 'Status', 'Pembayaran', 'Aksi'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#555', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>Belum ada transaksi</td></tr>
              ) : orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#f97316' }}>{o.order_code}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.customer_name}</td>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{o.phone}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{o.service?.name || '-'}</td>
                  <td style={{ padding: '12px 16px' }}>{o.weight_qty} {o.service?.unit || 'kg'}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>Rp {o.total_price?.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <select 
                      value={o.status} 
                      onChange={(e) => updateStatus(o.id, 'status', e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 12, fontWeight: 600, background: o.status === 'Selesai' ? '#f0fdf4' : o.status === 'Proses' ? '#eff6ff' : '#fff' }}
                    >
                      <option value="Antrian">Antrian</option>
                      <option value="Proses">Proses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select 
                      value={o.payment_status} 
                      onChange={(e) => updateStatus(o.id, 'payment_status', e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: 12, fontWeight: 700, color: o.payment_status === 'Lunas' ? '#16a34a' : '#ea580c' }}
                    >
                      <option value="Belum Lunas">Belum Lunas</option>
                      <option value="Lunas">Lunas</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#444' }}>Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── DATA PELANGGAN ──────────────────────────────────────────────────────────
function DataPelanggan() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/customers`, { headers: authHeader() })
      .then(r => r.json()).then(d => { if (d.success) setCustomers(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Data Pelanggan</h1>
      </div>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>Memuat data...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '2px solid #f0f0f0' }}>
                {['No', 'Nama Pelanggan', 'No. HP', 'Alamat', 'Terdaftar'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#555', fontWeight: 700, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>Belum ada pelanggan</td></tr>
              ) : customers.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px 16px', color: '#888' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>{c.name}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{c.phone}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{c.address || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#888' }}>{new Date(c.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── STAF KASIR ──────────────────────────────────────────────────────────────
function StafKasir() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const [msg, setMsg] = useState('');

  const load = () => {
    fetch(`${API}/staff`, { headers: authHeader() })
      .then(r => r.json()).then(d => { if (d.success) setStaff(d.data); }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/staff`, { method: 'POST', headers: authHeader(), body: JSON.stringify(form) });
    const d = await res.json();
    if (d.success) { setMsg('Staf berhasil ditambahkan!'); setShowForm(false); setForm({ name: '', phone: '', password: '' }); load(); }
    else setMsg(d.message || 'Gagal');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Staf Kasir</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f97316', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span> Tambah Kasir
        </button>
      </div>

      {msg && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 16px', borderRadius: 10, fontWeight: 600, fontSize: 13 }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Tambah Staf Kasir Baru</h2>
          <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
            {[['Nama Lengkap', 'name', 'text'], ['No. HP', 'phone', 'tel'], ['Password', 'password', 'password']].map(([label, key, type]) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6 }}>{label}</label>
                <input type={type} required placeholder={label} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <button type="submit" style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', height: 42 }}>Simpan</button>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>Memuat data...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa', borderBottom: '2px solid #f0f0f0' }}>
                {['No', 'Nama Kasir', 'No. HP', 'Status', 'Terdaftar'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#555', fontWeight: 700, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>Belum ada staf kasir</td></tr>
              ) : staff.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px 16px', color: '#888' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>{s.name}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{s.phone}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: s.is_active ? '#dcfce7' : '#fee2e2', color: s.is_active ? '#166534' : '#991b1b', padding: '3px 10px', borderRadius: 99, fontWeight: 700, fontSize: 12 }}>
                      {s.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#888' }}>{new Date(s.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD LAYOUT ───────────────────────────────────────────────────
export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #f97316', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }}></div>
        <p style={{ color: '#888', fontSize: 14 }}>Memuat...</p>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ background: '#fff', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: '#555' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>menu</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: '#f97316', fontWeight: 600 }}>{user?.role}</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>
              {user?.name?.[0]}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/pelanggan" element={<DataPelanggan />} />
            <Route path="/staf" element={<StafKasir />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
