const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database AyoCuci...');

  await prisma.order.deleteMany();
  await prisma.service.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // Create Users (Owner & Kasir)
  const ownerPass = await bcrypt.hash('owner123', 10);
  const owner = await prisma.user.create({
    data: { name: 'Bapak Budi (Owner)', phone: '081234567890', email: 'owner@ayocuci.com', password: ownerPass, role: 'OWNER' }
  });

  const kasirPass = await bcrypt.hash('kasir123', 10);
  const kasir = await prisma.user.create({
    data: { name: 'Siti (Kasir)', phone: '081298765432', password: kasirPass, role: 'KASIR' }
  });

  // Create Customers
  const customer1 = await prisma.customer.create({
    data: { name: 'Ahmad', phone: '085711112222', address: 'Jl. Merdeka No.1' }
  });
  const customer2 = await prisma.customer.create({
    data: { name: 'Nisa', phone: '085733334444', address: 'Perum. Indah Blok B/4' }
  });

  // Create Services
  const cuciKomplit = await prisma.service.create({
    data: { name: 'Cuci Komplit (Cuci + Setrika)', price: 7000, unit: 'kg', desc: 'Selesai 2 Hari' }
  });
  const cuciKering = await prisma.service.create({
    data: { name: 'Cuci Kering Saja', price: 5000, unit: 'kg', desc: 'Selesai 1 Hari' }
  });
  const setrikaSaja = await prisma.service.create({
    data: { name: 'Setrika Saja', price: 5000, unit: 'kg', desc: 'Selesai 1 Hari' }
  });
  const cuciKilat = await prisma.service.create({
    data: { name: 'Cuci Kilat (6 Jam)', price: 15000, unit: 'kg', desc: 'Prioritas Selesai' }
  });

  // Create Orders
  await prisma.order.create({
    data: {
      order_code: 'AYO-1001', customer_id: customer1.id, user_id: kasir.id, service_id: cuciKomplit.id,
      customer_name: customer1.name, phone: customer1.phone, address: customer1.address,
      weight_qty: 3, total_price: 21000, status: 'Proses', payment_status: 'Belum Lunas', pickup_date: new Date(Date.now() + 86400000 * 2)
    }
  });

  await prisma.order.create({
    data: {
      order_code: 'AYO-1002', customer_id: customer2.id, user_id: owner.id, service_id: cuciKilat.id,
      customer_name: customer2.name, phone: customer2.phone, address: customer2.address,
      weight_qty: 2, total_price: 30000, status: 'Selesai', payment_status: 'Lunas', pickup_date: new Date()
    }
  });

  console.log('✅ Seeding selesai!');
  console.log('-----------------------------------');
  console.log('Login Owner : 081234567890 | owner123');
  console.log('Login Kasir : 081298765432 | kasir123');
  console.log('-----------------------------------');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => await prisma.$disconnect());
