import React, { useState, useEffect } from "react";

// ─── Konstanta ────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:3001/api";

// ─── Helper: Format Rupiah ────────────────────────────────────────────────────
const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

// ─────────────────────────────────────────────────────────────────────────────
// KOMPONEN: BookingForm
// Menangani pembuatan pesanan laundry baru
// ─────────────────────────────────────────────────────────────────────────────
export function BookingForm() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    service_id: "",
    pickup_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { success, message, order_code }
  const [error, setError] = useState(null);

  // ── Fetch daftar layanan saat komponen mount ────────────────────────────────
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_BASE}/services`);
        const json = await res.json();
        if (json.success) {
          setServices(json.data);
          // Set default layanan pertama
          if (json.data.length > 0) {
            setForm((prev) => ({ ...prev, service_id: String(json.data[0].id) }));
          }
        }
      } catch (err) {
        console.error("Gagal memuat layanan:", err);
      }
    }
    fetchServices();
  }, []);

  // ── Handler: perubahan input form ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // ── Handler: submit form booking ───────────────────────────────────────────
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.customer_name,
          phone: form.phone,
          address: form.address,
          service_id: Number(form.service_id),
          pickup_date: form.pickup_date,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Terjadi kesalahan pada server.");
      }

      // ✅ Sukses: tampilkan kode tracking ke user
      setResult({
        success: true,
        order_code: json.data.order_code,
        message: json.message,
        service: json.data.service,
      });

      // Reset form setelah sukses
      setForm({
        customer_name: "",
        phone: "",
        address: "",
        service_id: services.length > 0 ? String(services[0].id) : "",
        pickup_date: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="booking" className="py-16 bg-surface-container-low">
      <div className="max-w-2xl mx-auto px-margin-mobile lg:px-margin">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2 text-center">
          Pesan Layanan Laundry
        </h2>
        <p className="text-on-surface-variant text-body-md text-center mb-10">
          Isi formulir di bawah, kurir kami akan menjemput di lokasi Anda.
        </p>

        {/* ── Sukses Banner ── */}
        {result?.success && (
          <div className="mb-6 p-5 rounded-2xl bg-tertiary-container text-on-tertiary-container flex flex-col gap-1 shadow">
            <span className="font-label-lg text-label-lg font-bold">✅ Pesanan Berhasil!</span>
            <p className="font-body-md text-body-md">{result.message}</p>
            <p className="font-title-md text-title-md font-bold mt-1">
              Kode Tracking Anda:{" "}
              <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">
                {result.order_code}
              </span>
            </p>
            <p className="font-body-md text-body-md text-on-tertiary-container/80">
              Simpan kode ini untuk melacak status laundry Anda.
            </p>
          </div>
        )}

        {/* ── Error Banner ── */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-error-container text-on-error-container font-body-md text-body-md">
            ❌ {error}
          </div>
        )}

        {/* ── Form ── */}
        <form
          onSubmit={handleBooking}
          className="bg-surface-container-lowest rounded-3xl shadow-lg p-8 flex flex-col gap-5"
        >
          {/* Nama Pelanggan */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="customer_name"
              className="font-label-lg text-label-lg text-on-surface font-semibold"
            >
              Nama Lengkap
            </label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              required
              className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md"
            />
          </div>

          {/* No HP */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="font-label-lg text-label-lg text-on-surface font-semibold"
            >
              No. WhatsApp / HP
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Contoh: 08123456789"
              required
              className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md"
            />
          </div>

          {/* Alamat */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="address"
              className="font-label-lg text-label-lg text-on-surface font-semibold"
            >
              Alamat Penjemputan
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Jl. Merpati No. 12, RT 03/RW 05, Jakarta Selatan"
              required
              rows={3}
              className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md resize-none"
            />
          </div>

          {/* Pilih Layanan */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="service_id"
              className="font-label-lg text-label-lg text-on-surface font-semibold"
            >
              Pilih Layanan
            </label>
            <select
              id="service_id"
              name="service_id"
              value={form.service_id}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md"
            >
              {services.length === 0 && (
                <option disabled>Memuat layanan...</option>
              )}
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {formatRupiah(s.price)} / {s.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal Penjemputan */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="pickup_date"
              className="font-label-lg text-label-lg text-on-surface font-semibold"
            >
              Tanggal Penjemputan
            </label>
            <input
              id="pickup_date"
              name="pickup_date"
              type="date"
              value={form.pickup_date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="btn-booking-submit"
            disabled={loading}
            className="mt-2 w-full py-4 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary/30 hover:bg-primary-container hover:text-on-primary-container hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "🧺 Pesan Sekarang"}
          </button>
        </form>
      </div>
    </section>
  );
}
