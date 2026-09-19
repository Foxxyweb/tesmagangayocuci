const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'ayocuci_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// --- MIDDLEWARE ---
const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Token tidak valid' });
  try {
    req.user = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    next();
  } catch { res.status(401).json({ success: false, message: 'Token kadaluarsa' }); }
};

const ownerOnly = (req, res, next) => {
  if (req.user?.role !== 'OWNER') return res.status(403).json({ success: false, message: 'Akses khusus Owner' });
  next();
};

// --- AUTH ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ success: false, message: 'Nomor WhatsApp atau Kata Sandi salah' });
    if (!user.is_active) return res.status(403).json({ success: false, message: 'Akun Anda dinonaktifkan' });
    
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } } });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Error server' }); }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const exists = await prisma.user.findUnique({ where: { phone } });
    if (exists) return res.status(400).json({ success: false, message: 'Nomor WhatsApp sudah terdaftar' });
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, phone, password: hashed, role: 'OWNER' } });
    res.json({ success: true, data: { id: user.id, name: user.name } });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, name: true, phone: true, role: true } });
    res.json({ success: true, data: user });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

// --- ADMIN STATS ---
app.get('/api/admin/stats', authenticate, async (req, res) => {
  try {
    const [ordersCount, customersCount, income] = await Promise.all([
      prisma.order.count(),
      prisma.customer.count(),
      prisma.order.aggregate({ _sum: { total_price: true }, where: { payment_status: 'Lunas' } })
    ]);
    res.json({ success: true, data: { 
      orders: ordersCount, 
      customers: customersCount, 
      income: income._sum.total_price || 0 
    } });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

// --- SERVICES (PUBLIC) ---
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { id: 'asc' } });
    res.json({ success: true, data: services });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

// --- CUSTOMERS ---
app.get('/api/customers', authenticate, async (req, res) => {
  try {
    const custs = await prisma.customer.findMany({ include: { _count: { select: { orders: true } } }, orderBy: { created_at: 'desc' } });
    res.json({ success: true, data: custs });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

// --- STAFF ---
app.get('/api/staff', authenticate, ownerOnly, async (req, res) => {
  try {
    const staff = await prisma.user.findMany({ where: { role: 'KASIR' }, orderBy: { created_at: 'desc' }, select: { id: true, name: true, phone: true, is_active: true, created_at: true } });
    res.json({ success: true, data: staff });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.post('/api/staff', authenticate, ownerOnly, async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const exists = await prisma.user.findUnique({ where: { phone } });
    if (exists) return res.status(400).json({ success: false, message: 'Nomor HP sudah dipakai' });
    const hashed = await bcrypt.hash(password, 10);
    const staff = await prisma.user.create({ data: { name, phone, password: hashed, role: 'KASIR' } });
    res.json({ success: true, data: { id: staff.id, name: staff.name } });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.put('/api/staff/:id/toggle', authenticate, ownerOnly, async (req, res) => {
  try {
    const staff = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!staff) return res.status(404).json({ success: false, message: 'Staf tidak ditemukan' });
    const updated = await prisma.user.update({ where: { id: staff.id }, data: { is_active: !staff.is_active }, select: { id: true, is_active: true } });
    res.json({ success: true, data: updated });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

// --- ORDERS ---
app.post('/api/booking', async (req, res) => {
  try {
    const { customer_name, phone, address, service_id, pickup_date } = req.body;
    let cust = await prisma.customer.findFirst({ where: { phone } });
    if (!cust) {
      cust = await prisma.customer.create({ data: { name: customer_name, phone, address: address || '' } });
    }
    const order = await prisma.order.create({
      data: {
        order_code: 'ORD-' + Date.now().toString().slice(-6),
        customer_name,
        phone,
        service_id: parseInt(service_id) || 1,
        weight_qty: 1, // Default untuk booking
        total_price: 0, // Akan dihitung nanti oleh kasir
        status: 'Antrian',
        payment_status: 'Belum Lunas',
        user_id: null // Booking publik tidak punya user_id kasir
      }
    });
    res.json({ success: true, data: order });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.post('/api/orders', authenticate, async (req, res) => {
  try {
    const { customer_name, phone, service_id, weight_qty, total_price, payment_status } = req.body;
    let cust = await prisma.customer.findFirst({ where: { phone } });
    if (!cust) {
      cust = await prisma.customer.create({ data: { name: customer_name, phone, address: '' } });
    }
    const order = await prisma.order.create({
      data: {
        order_code: 'ORD-' + Date.now().toString().slice(-6),
        customer_name,
        phone,
        service_id: parseInt(service_id) || 1,
        weight_qty: parseFloat(weight_qty) || 1,
        total_price: parseInt(total_price) || 0,
        status: 'Antrian',
        payment_status: payment_status || 'Belum Lunas',
        user_id: req.user.id
      }
    });
    res.json({ success: true, data: order });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.get('/api/orders', authenticate, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ 
      include: { service: { select: { name: true } }, user: { select: { name: true } } },
      orderBy: { created_at: 'desc' } 
    });
    res.json({ success: true, data: orders });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.put('/api/orders/:id/status', authenticate, async (req, res) => {
  try {
    const { status, payment_status } = req.body;
    const data = {};
    if (status) data.status = status;
    if (payment_status) data.payment_status = payment_status;
    const order = await prisma.order.update({ where: { id: parseInt(req.params.id) }, data });
    res.json({ success: true, data: order });
  } catch (e) { res.status(500).json({ success: false, message: 'Error server' }); }
});

app.listen(PORT, () => console.log(`🚀 API berjalan di port ${PORT}`));
