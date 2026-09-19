import React, { useState } from "react";

// ─── Konstanta ────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:3001/api";

// ─── Helper: Format Tanggal Indonesia ────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ─── Helper: Warna Badge Status ───────────────────────────────────────────────
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-secondary-container text-on-secondary-container";
    case "Diproses":
      return "bg-tertiary-container text-on-tertiary-container";
    case "Selesai":
      return "bg-primary/10 text-primary";
    default:
      return "bg-surface-container text-on-surface";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":   return "⏳";
    case "Diproses":  return "🔄";
    case "Selesai":   return "✅";
    default:          return "📦";
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// KOMPONEN: TrackingWidget
// Melacak status pesanan berdasarkan kode order (AC-XXXX)
// ─────────────────────────────────────────────────────────────────────────────
export function TrackingWidget() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Handler: Lacak pesanan ─────────────────────────────────────────────────
  const handleTracking = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const cleanCode = code.trim().toUpperCase();
      const response = await fetch(
        `${API_BASE}/orders/track/${encodeURIComponent(cleanCode)}`
      );
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(
          json.message || "Pesanan tidak ditemukan. Periksa kembali kode Anda."
        );
      }

      setOrder(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="tracking" className="py-16 bg-surface">
      <div className="max-w-xl mx-auto px-margin-mobile lg:px-margin">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2 text-center">
          Lacak Pesanan Anda
        </h2>
        <p className="text-on-surface-variant text-body-md text-center mb-10">
          Masukkan kode tracking yang Anda terima saat pemesanan.
        </p>

        {/* ── Search Form ── */}
        <form
          onSubmit={handleTracking}
          className="flex gap-3 mb-8"
        >
          <input
            id="tracking-code-input"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(null);
            }}
            placeholder="Contoh: AC-X7KP"
            maxLength={7}
            className="flex-1 px-5 py-3.5 rounded-full bg-surface-container-lowest border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md uppercase tracking-widest shadow-sm"
          />
          <button
            type="submit"
            id="btn-track-order"
            disabled={loading || !code.trim()}
            className="px-6 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-lg shadow-primary/30 hover:bg-primary-container hover:text-on-primary-container transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Lacak"}
          </button>
        </form>

        {/* ── Error ── */}
        {error && (
          <div className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md text-body-md mb-4">
            ❌ {error}
          </div>
        )}

        {/* ── Hasil Tracking ── */}
        {order && (
          <div className="bg-surface-container-lowest rounded-3xl shadow-lg p-6 flex flex-col gap-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Kode Pesanan
                </span>
                <p className="font-headline-sm text-headline-sm font-bold text-primary tracking-wider">
                  {order.order_code}
                </p>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full font-label-lg text-label-lg font-semibold ${getStatusStyle(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)} {order.status}
              </span>
            </div>

            <hr className="border-outline-variant" />

            {/* Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block mb-0.5">
                  Nama Pelanggan
                </span>
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {order.customer_name}
                </span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block mb-0.5">
                  No. HP
                </span>
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {order.phone}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-label-md text-label-md text-on-surface-variant block mb-0.5">
                  Alamat
                </span>
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {order.address}
                </span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block mb-0.5">
                  Layanan
                </span>
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {order.service.name}
                </span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block mb-0.5">
                  Tanggal Jemput
                </span>
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {formatDate(order.pickup_date)}
                </span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mt-2 flex items-center gap-2">
              {["Pending", "Diproses", "Selesai"].map((step, i, arr) => {
                const isActive = order.status === step;
                const isDone =
                  arr.indexOf(order.status) > i;
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md font-bold transition-all ${
                          isDone
                            ? "bg-primary text-on-primary"
                            : isActive
                            ? "bg-primary/20 text-primary ring-2 ring-primary"
                            : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {isDone ? "✓" : i + 1}
                      </div>
                      <span
                        className={`font-label-md text-label-md text-center ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mb-5 rounded ${
                          isDone ? "bg-primary" : "bg-surface-container-high"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
