/**
 * api.js — Utility functions untuk komunikasi dengan AyoCuci Backend API
 * Salin file ini ke folder src/utils/ atau src/lib/ di project React Anda.
 */

const API_BASE = "http://localhost:3001/api";

// ─── Services ─────────────────────────────────────────────────────────────────

/**
 * Mengambil semua layanan yang tersedia dari database
 * @returns {Promise<Array>} Array of service objects
 */
export async function getServices() {
  const res = await fetch(`${API_BASE}/services`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

/**
 * Membuat pesanan baru
 * @param {{ customer_name: string, phone: string, address: string, service_id: number, pickup_date: string }} data
 * @returns {Promise<{ order_code: string, customer_name: string, service: string, status: string }>}
 */
export async function createOrder(data) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message);
  return json.data;
}

/**
 * Melacak pesanan berdasarkan kode order (AC-XXXX)
 * @param {string} orderCode - Kode order, contoh: "AC-X7KP"
 * @returns {Promise<Object>} Detail order lengkap beserta layanan
 */
export async function trackOrder(orderCode) {
  const res = await fetch(
    `${API_BASE}/orders/track/${encodeURIComponent(orderCode.toUpperCase())}`
  );
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message);
  return json.data;
}

/**
 * Mengambil semua pesanan (untuk tampilan admin/dashboard)
 * @returns {Promise<Array>} Array of all orders with service details
 */
export async function getAllOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

/**
 * Memperbarui status pesanan
 * @param {number} orderId - ID numerik pesanan
 * @param {"Pending"|"Diproses"|"Selesai"} status - Status baru
 * @returns {Promise<Object>} Updated order summary
 */
export async function updateOrderStatus(orderId, status) {
  const VALID_STATUS = ["Pending", "Diproses", "Selesai"];
  if (!VALID_STATUS.includes(status)) {
    throw new Error(`Status tidak valid: ${status}`);
  }

  const res = await fetch(`${API_BASE}/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message);
  return json.data;
}
