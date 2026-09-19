import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    remember: false 
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.email, // Using email field for phone/email just for demo
          password: form.password
        })
      });
      const data = await res.json();
      
      if (data.success) {
        login(data.data.token, data.data.user);
        navigate('/admin');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Gagal terhubung ke server');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center p-4 font-body-md">
      {/* Main Card Container */}
      <div className="bg-white w-full max-w-[1000px] min-h-[600px] rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white items-center md:items-end">
          <div className="max-w-[360px] w-full md:mr-4 lg:mr-12">
            <h1 className="text-[28px] md:text-[32px] font-extrabold text-[#1a1a1a] mb-2 tracking-tight whitespace-nowrap">
              Selamat Datang Kembali!
            </h1>
            <p className="text-[#666666] mb-8 text-[14px] md:text-[15px]">
              Masuk untuk mengelola bisnis laundry Anda
            </p>

            {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Email" 
                  className="w-full px-5 py-[14px] bg-white border border-[#e5e7eb] rounded-xl text-[#1a1a1a] placeholder:text-[#999999] focus:outline-none focus:border-[#f05a28] focus:ring-1 focus:ring-[#f05a28] transition-all text-[15px]"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full px-5 py-[14px] bg-white border border-[#e5e7eb] rounded-xl text-[#1a1a1a] placeholder:text-[#999999] focus:outline-none focus:border-[#f05a28] focus:ring-1 focus:ring-[#f05a28] transition-all text-[15px]"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#4d4d4d] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between mt-1 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-4 h-4 border-2 border-[#d1d5db] rounded-[4px] checked:bg-[#f05a28] checked:border-[#f05a28] transition-all cursor-pointer"
                      checked={form.remember}
                      onChange={(e) => setForm({...form, remember: e.target.checked})}
                    />
                    <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">
                      check
                    </span>
                  </div>
                  <span className="text-[13px] text-[#666666] group-hover:text-[#1a1a1a] transition-colors font-medium">Ingatkan saya</span>
                </label>
                <a href="#" className="text-[13px] text-[#f05a28] hover:text-[#d04314] font-bold transition-colors">
                  Lupa password?
                </a>
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-[14px] bg-[#f05a28] hover:bg-[#e04a18] text-white rounded-xl font-bold text-[15px] shadow-[0_8px_20px_-6px_rgba(240,90,40,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex justify-center items-center mt-1"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : "Masuk"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-[1px] bg-[#e5e7eb]"></div>
                <span className="text-[12px] text-[#999999] font-medium whitespace-nowrap">Atau lanjutkan dengan</span>
                <div className="flex-1 h-[1px] bg-[#e5e7eb]"></div>
              </div>

              {/* Google Login */}
              <button 
                type="button"
                className="w-full py-[12px] bg-white hover:bg-gray-50 border border-[#e5e7eb] text-[#1a1a1a] rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                </svg>
                Masuk dengan Google
              </button>

              {/* Register Link */}
              <p className="text-center mt-3 text-[13px] text-[#666666] font-medium">
                Belum punya akun? <Link to="/register" className="text-[#f05a28] font-bold hover:underline">Daftar di sini</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Panel: Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#fd8f53] to-[#e44c15] relative p-12 items-center justify-center flex-col text-center">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 w-full flex flex-col items-center justify-center mb-10 drop-shadow-2xl">
            <div className="text-white text-[64px] font-extrabold tracking-tighter drop-shadow-lg">
              Ayo<span className="text-[#ffdbce]">Cuci</span>
            </div>
            <div className="text-white/80 text-[13px] font-medium tracking-widest uppercase mt-2">
              Kasir & Manajemen Outlet
            </div>
          </div>

          <h3 className="relative z-10 text-white font-medium text-[15px] leading-relaxed max-w-[320px]">
            Kelola transaksi, pantau status cucian, dan lihat laporan bisnis laundry Anda dalam satu aplikasi.
          </h3>
        </div>

      </div>
    </div>
  );
}
