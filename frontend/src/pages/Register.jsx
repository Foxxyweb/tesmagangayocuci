import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const YEARS = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString());

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const [form, setForm] = useState({
    // Step 1
    phone: '',
    // Step 2
    ownerName: '', email: '', referral: '', source: '',
    outletName: '', outletPhone: '',
    provinsi: '', kabupaten: '', kecamatan: '', address: '',
    tempatUsaha: '', modalAwal: '', karyawan: '', mesin: '',
    bulanMulai: '', tahunMulai: '',
    // Step 3
    password: '', confirmPassword: '', agree: false,
  });

  const navigate = useNavigate();
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));



  const handleNext = () => { setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(s => s + 1); };
  const handlePrev = () => { setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(s => s - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Kata sandi tidak cocok');
    if (!form.agree) return setError('Anda harus menyetujui syarat & ketentuan');
    setLoading(true); setError('');
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.ownerName, phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (data.success) navigate('/login');
      else setError(data.message || 'Terjadi kesalahan');
    } catch { setError('Gagal terhubung ke server'); }
    setLoading(false);
  };

  /* ────────── STEPPER ────────── */
  const steps = [{ n: 1, label: 'Verifikasi' }, { n: 2, label: 'Data Anda' }, { n: 3, label: 'Keamanan' }];

  const Stepper = () => (
    <div className="flex items-center justify-center gap-0 mb-7">
      {steps.map((s, i) => (
        <React.Fragment key={s.n}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-all
              ${step >= s.n ? 'bg-white border-white text-orange-500' : 'bg-transparent border-white/50 text-white/70'}`}>
              {s.n}
            </div>
            <span className={`text-[13px] font-semibold ${step === s.n ? 'text-white' : 'text-white/60'}`}>{s.label}</span>
          </div>
          {i < 2 && <div className={`w-8 h-[1.5px] mx-2 ${step > s.n ? 'bg-white' : 'bg-white/30'}`} />}
        </React.Fragment>
      ))}
    </div>
  );

  /* ────────── SHARED STYLES ────────── */
  const inputCls = "w-full px-4 py-3 text-[13.5px] text-gray-800 placeholder:text-gray-300 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white";
  const labelCls = "block text-[12.5px] font-semibold text-gray-700 mb-1.5";

  const PillGroup = ({ label, options, value, onChange, cols = 3 }) => (
    <div style={{ marginBottom: '4px' }}>
      <label className={labelCls}>{label}</label>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px' }}>
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              padding: '10px 8px',
              borderRadius: '8px',
              border: value === opt ? '2px solid #f97316' : '1.5px solid #e5e7eb',
              background: value === opt ? '#fff7ed' : '#fff',
              color: value === opt ? '#ea580c' : '#6b7280',
              fontWeight: '600',
              fontSize: '12.5px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const LoginLink = () => (
    <p className="text-center mt-6 text-[12.5px] text-gray-400">
      Sudah memiliki akun?{' '}<Link to="/login" className="text-orange-500 font-bold hover:underline">Masuk di sini</Link>
    </p>
  );

  /* ────────── RENDER ────────── */
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4" style={{ backgroundImage: 'none' }}>
      <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-white" style={{ maxWidth: '640px' }}>

        {/* ── ORANGE HEADER ── */}
        <div className="bg-orange-500 text-center" style={{ padding: '40px 64px 48px' }}>
          <Stepper />
          <h1 className="text-2xl font-extrabold text-white mb-1.5 leading-snug">Selamat datang di ayocuci!</h1>
          <p className="text-white/80 text-[13px]">Terima kasih sudah mendownload aplikasi ayocuci.</p>
        </div>

        {/* ── FORM BODY ── */}
        <div className="bg-white" style={{ padding: '40px 64px 48px' }}>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[12.5px] font-semibold rounded-lg text-center">{error}</div>}

          {/* ══════════════════ STEP 1 ══════════════════ */}
          {step === 1 && (
            <div>
              <div className="text-center mb-7">
                <h2 className="text-[17px] font-bold text-gray-800 mb-1">Nomor WhatsApp Owner</h2>
                <p className="text-[12.5px] text-gray-400 leading-relaxed">Gunakan nomor WhatsApp pribadi Owner sebagai identitas utama akun.</p>
              </div>

              <div className="mb-4">
                <label className={labelCls}>Nomor WhatsApp Aktif <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="Contoh: 081234567890" className={inputCls}
                  value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>

              <div className="flex items-center gap-2.5 p-3.5 bg-orange-50 border border-orange-100 rounded-lg mb-6">
                <svg className="w-4 h-4 text-orange-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-[12.5px] text-orange-500 font-medium">Nomor ini akan digunakan sebagai identitas utama akun Anda.</p>
              </div>

              <button onClick={handleNext} disabled={form.phone.length < 8}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed text-white font-bold text-[13px] tracking-widest rounded-lg transition-all shadow-md disabled:shadow-none">
                LANJUTKAN
              </button>
              <LoginLink />
            </div>
          )}

          {/* ══════════════════ STEP 2 ══════════════════ */}
          {step === 2 && (
            <div>
              <div className="text-center mb-7">
                <h2 className="text-[17px] font-bold text-gray-800 mb-1">Lengkapi Data Diri</h2>
                <p className="text-[12.5px] text-gray-400">Masukkan data lengkap Anda untuk menyelesaikan pendaftaran.</p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Personal */}
                <div>
                  <label className={labelCls}>Nama lengkap anda <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Sesuai KTP" className={inputCls} value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="email@contoh.com" className={inputCls} value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Kode referral <span className="text-gray-300 font-normal">(Opsional)</span></label>
                  <input type="text" placeholder="-" className={inputCls} value={form.referral} onChange={e => set('referral', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Tahu aplikasi ini dari mana? <span className="text-red-500">*</span></label>
                  <select className={inputCls + " appearance-none cursor-pointer"} value={form.source} onChange={e => set('source', e.target.value)}>
                    <option value="">Pilih sumber</option>
                    <option>Teman/Kerabat</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Google</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                {/* Outlet */}
                <hr className="border-gray-100 my-1" />
                <div>
                  <label className={labelCls}>Nama outlet <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Contoh: Ayo Cuci" className={inputCls} value={form.outletName} onChange={e => set('outletName', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>No handphone outlet <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="Contoh: 087742124885" className={inputCls} value={form.outletPhone} onChange={e => set('outletPhone', e.target.value)} />
                </div>

                {/* Alamat */}
                <div>
                  <label className={labelCls}>Provinsi <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Contoh: Kepulauan Riau" className={inputCls} value={form.provinsi} onChange={e => set('provinsi', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Kabupaten/Kota <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Contoh: Kota Batam" className={inputCls} value={form.kabupaten} onChange={e => set('kabupaten', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Kecamatan <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Contoh: Bengkong" className={inputCls} value={form.kecamatan} onChange={e => set('kecamatan', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Alamat Lengkap <span className="text-red-500">*</span></label>
                  <textarea rows="3" placeholder="Contoh: Jl. Ahmad Yani No. 123..." className={inputCls + " resize-none"} value={form.address} onChange={e => set('address', e.target.value)} />
                </div>

                {/* Pills */}
                <hr className="border-gray-100 my-1" />
                <PillGroup label={<>Tempat usaha <span className="text-red-500">*</span></>} options={['Ruko','Rumah','Kios']} value={form.tempatUsaha} onChange={v => set('tempatUsaha', v)} cols={3} />
                <PillGroup label={<>Modal awal usaha <span className="text-red-500">*</span></>} options={['Rp20 juta - Rp50 juta','Rp50 juta - Rp80 juta','Di atas Rp100 juta']} value={form.modalAwal} onChange={v => set('modalAwal', v)} cols={3} />
                <PillGroup label={<>Jumlah karyawan <span className="text-red-500">*</span></>} options={['1 orang','2 orang','Lebih dari 3 orang']} value={form.karyawan} onChange={v => set('karyawan', v)} cols={3} />
                <PillGroup label={<>Jumlah mesin dan pengering <span className="text-red-500">*</span></>} options={['2 unit','4 unit','6 unit','Lebih dari 6 unit']} value={form.mesin} onChange={v => set('mesin', v)} cols={4} />

                {/* Usaha sejak */}
                <div>
                  <label className={labelCls}>Usaha berjalan sejak <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    <select className={inputCls + " appearance-none cursor-pointer"} value={form.bulanMulai} onChange={e => set('bulanMulai', e.target.value)}>
                      <option value="">Bulan</option>
                      {MONTHS.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <select className={inputCls + " appearance-none cursor-pointer"} value={form.tahunMulai} onChange={e => set('tahunMulai', e.target.value)}>
                      <option value="">Tahun</option>
                      {YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '28px' }}>
                <button
                  onClick={handlePrev}
                  style={{
                    width: '100%', padding: '14px', border: '1.5px solid #e5e7eb',
                    borderRadius: '10px', background: '#fff', color: '#555', fontWeight: '700',
                    fontSize: '13px', letterSpacing: '0.08em', cursor: 'pointer', transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.background = '#f9fafb'}
                  onMouseLeave={e => e.target.style.background = '#fff'}
                >
                  KEMBALI
                </button>
                <button
                  onClick={handleNext}
                  disabled={!form.ownerName || !form.outletName}
                  style={{
                    width: '100%', padding: '14px', border: 'none',
                    borderRadius: '10px', background: !form.ownerName || !form.outletName ? '#fdc9a8' : '#f97316',
                    color: '#fff', fontWeight: '700', fontSize: '13px', letterSpacing: '0.08em',
                    cursor: !form.ownerName || !form.outletName ? 'not-allowed' : 'pointer',
                    boxShadow: !form.ownerName || !form.outletName ? 'none' : '0 4px 14px rgba(249,115,22,0.4)', transition: 'all 0.2s'
                  }}
                >
                  SELANJUTNYA
                </button>
              </div>
              <LoginLink />
            </div>
          )}

          {/* ══════════════════ STEP 3 ══════════════════ */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-7">
                <h2 className="text-[17px] font-bold text-gray-800 mb-1">Buat Kata Sandi</h2>
                <p className="text-[12.5px] text-gray-400">Amankan akun AyoCuci Anda dengan kata sandi yang kuat.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelCls}>Kata Sandi <span className="text-red-500">*</span></label>
                  <input type="password" placeholder="Minimal 8 karakter" className={inputCls}
                    value={form.password} onChange={e => set('password', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Ulangi Kata Sandi <span className="text-red-500">*</span></label>
                  <input type="password" placeholder="Ketik ulang kata sandi" className={inputCls}
                    value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer mt-1 p-3.5 bg-gray-50 border border-gray-100 rounded-lg">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input type="checkbox"
                      className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer"
                      checked={form.agree} onChange={e => set('agree', e.target.checked)} />
                    <svg className="absolute top-0 left-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] text-gray-500 leading-relaxed">
                    Saya setuju dengan{' '}
                    <a href="#" className="text-orange-500 font-semibold hover:underline">Syarat & Ketentuan</a>{' '}
                    serta{' '}
                    <a href="#" className="text-orange-500 font-semibold hover:underline">Kebijakan Privasi</a>{' '}AyoCuci.
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button type="button" onClick={handlePrev} className="w-full py-3 border border-gray-200 text-gray-500 font-bold text-[12.5px] tracking-widest rounded-lg hover:bg-gray-50 transition-colors">
                  KEMBALI
                </button>
                <button type="submit" disabled={loading || !form.password || !form.agree}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed text-white font-bold text-[12.5px] tracking-widest rounded-lg shadow-md disabled:shadow-none transition-all flex justify-center items-center gap-2">
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'DAFTAR SEKARANG'}
                </button>
              </div>
              <LoginLink />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
