import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env file
const envContent = fs.readFileSync('.env', 'utf8');
const env = envContent.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim();
  return acc;
}, {});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const firstNames = ['Budi', 'Andi', 'Siti', 'Ayu', 'Rizky', 'Bagus', 'Putra', 'Dewi', 'Fitri', 'Eka', 'Dwi', 'Tri', 'Agus', 'Hendra', 'Kurniawan', 'Muhammad', 'Nur', 'Sri', 'Wahyu', 'Wawan'];
const lastNames = ['Santoso', 'Pratama', 'Saputra', 'Wibowo', 'Kusuma', 'Nugroho', 'Setiawan', 'Hidayat', 'Siregar', 'Lubis', 'Sari', 'Lestari', 'Handayani', 'Utami', 'Pertiwi', 'Wijaya', 'Salim', 'Halim', 'Tanjung', 'Gunawan'];
const statuses = ['Regular', 'VIP'];
const levels = ['Bronze', 'Silver', 'Gold'];

const getRandomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const customers = [];
const members = [];
const bookings = [];

const barbers = ['Michael Jordan', 'David Beckham', 'Ryan Reynolds', 'Chris Evans', 'Tom Holland', 'Zayn Malik'];
const services = ['Classic Haircut', 'Premium Haircut', 'Beard Trim & Line-up', 'Hair Coloring (Black)', 'Hot Towel Shave', 'Hair Wash & Styling'];

for (let i = 1; i <= 800; i++) {
  const name = `${getRandomEl(firstNames)} ${getRandomEl(lastNames)} ${getRandomInt(1, 99)}`;
  const email = `user${i}_${getRandomInt(1000, 9999)}@example.com`;
  const phone = `+628${getRandomInt(1000000000, 9999999999)}`;
  
  customers.push({
    name,
    email,
    phone,
    visits: getRandomInt(1, 50),
    status: getRandomEl(statuses),
    initials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  });

  members.push({
    id: `MB_${Math.random().toString(36).substr(2, 9)}_${i}`,
    name,
    level: getRandomEl(levels),
    points: getRandomInt(100, 5000),
    visits: getRandomInt(1, 50),
    totalspent: `Rp ${(getRandomInt(1, 100) * 50000).toLocaleString('id-ID')}`,
    status: 'Active'
  });

  const pastOrFuture = Math.random() > 0.5 ? 1 : -1;
  const dateOffset = getRandomInt(0, 30) * pastOrFuture;
  const d = new Date();
  d.setDate(d.getDate() + dateOffset);
  const dateStr = d.toISOString().split('T')[0];
  const timeStr = `${getRandomInt(9, 20).toString().padStart(2, '0')}:00`;
  const bkStatus = dateOffset < 0 ? 'Completed' : (dateOffset === 0 ? 'Pending' : 'Confirmed');

  bookings.push({
    id: `BK_GEN_${i}`,
    customer: name,
    barber: getRandomEl(barbers),
    service: getRandomEl(services),
    date: dateStr,
    time: timeStr,
    status: bkStatus
  });
}

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

async function seedTable(tableName, data) {
  console.log(`\nMemasukkan ${data.length} data ke tabel '${tableName}'...`);
  const chunks = chunkArray(data, 100);
  let totalInserted = 0;
  
  for (const chunk of chunks) {
    const { error } = await supabase.from(tableName).insert(chunk);
    if (error) {
      console.error(`\nError di tabel ${tableName}:`, error.message);
    } else {
      totalInserted += chunk.length;
      process.stdout.write(`\rProgress: ${totalInserted}/${data.length} selesai`);
    }
  }
  console.log(`\n✅ Selesai untuk tabel ${tableName}`);
}

async function run() {
  console.log('--- MEMULAI GENERATE 800 DATA DUMMY ---');
  
  // Login as admin to bypass RLS policies
  console.log('Authenticating as admin...');
  let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin2@elite.com',
    password: 'password123'
  });
  
  if (authError) {
    console.log('Login failed, attempting to register admin2@elite.com...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin2@elite.com',
      password: 'password123',
      options: {
        data: { role: 'admin' }
      }
    });

    if (signUpError) {
      console.error('Gagal daftar akun:', signUpError.message);
      return;
    }
    
    // Check if session exists (means email confirmation is off)
    if (!signUpData.session) {
      console.error('PENTING: Pendaftaran berhasil tapi butuh konfirmasi email. Silakan matikan "Confirm Email" di Supabase Dashboard (Authentication > Providers > Email), hapus user ini, dan jalankan ulang script.');
      return;
    }
  }
  
  console.log('Berhasil login! Memulai proses seeding...');

  await seedTable('customers', customers);
  await seedTable('members', members);
  await seedTable('bookings', bookings);
  console.log('\n🎉 YAY! Semua 800 data (Customer, Member, dan Booking) sudah berhasil dimasukkan ke Supabase!');
}

run();
