export const revenueData = [
  { month: 'Jan', revenue: 12000, bookings: 145 },
  { month: 'Feb', revenue: 15000, bookings: 178 },
  { month: 'Mar', revenue: 18000, bookings: 210 },
  { month: 'Apr', revenue: 16500, bookings: 195 },
  { month: 'May', revenue: 22000, bookings: 256 },
  { month: 'Jun', revenue: 25000, bookings: 289 },
];

export const services = [
  { id: 1, name: 'Classic Haircut', price: 150000, duration: '30 min', popular: true, icon: '✂️' },
  { id: 2, name: 'Premium Haircut', price: 250000, duration: '45 min', popular: true, icon: '💇' },
  { id: 3, name: 'Beard Trim', price: 100000, duration: '20 min', popular: false, icon: '🧔' },
  { id: 4, name: 'Hair Coloring', price: 350000, duration: '60 min', popular: false, icon: '🎨' },
  { id: 5, name: 'Hot Towel Shave', price: 180000, duration: '30 min', popular: true, icon: '🪒' },
  { id: 6, name: 'Hair Wash + Styling', price: 120000, duration: '25 min', popular: false, icon: '🚿' },
];

export const barbers = [
  { id: 1, name: 'Michael Jordan', specialty: 'Classic & Fade', rating: 4.9, bookings: 156, experience: '8 years', status: 'Available', phone: '+62 812-3456-7890', avatar: 'MJ' },
  { id: 2, name: 'David Beckham', specialty: 'Modern Style', rating: 4.8, bookings: 142, experience: '6 years', status: 'Busy', phone: '+62 813-4567-8901', avatar: 'DB' },
  { id: 3, name: 'Ryan Reynolds', specialty: 'Beard Expert', rating: 4.9, bookings: 138, experience: '7 years', status: 'Available', phone: '+62 814-5678-9012', avatar: 'RR' },
  { id: 4, name: 'Chris Evans', specialty: 'Hair Coloring', rating: 4.7, bookings: 128, experience: '5 years', status: 'Available', phone: '+62 815-6789-0123', avatar: 'CE' },
];

export const appointments = [
  { id: '#BK001', customer: 'John Doe', barber: 'Michael Jordan', service: 'Premium Haircut', date: '2026-05-05', time: '10:00 AM', amount: 'Rp 250.000', status: 'Confirmed', phone: '+62 821-1111-2222' },
  { id: '#BK002', customer: 'Alex Smith', barber: 'David Beckham', service: 'Classic Haircut + Beard', date: '2026-05-05', time: '11:30 AM', amount: 'Rp 250.000', status: 'Pending', phone: '+62 821-3333-4444' },
  { id: '#BK003', customer: 'James Wilson', barber: 'Ryan Reynolds', service: 'Hot Towel Shave', date: '2026-05-05', time: '02:00 PM', amount: 'Rp 180.000', status: 'Confirmed', phone: '+62 821-5555-6666' },
  { id: '#BK004', customer: 'Robert Brown', barber: 'Chris Evans', service: 'Hair Coloring', date: '2026-05-06', time: '09:00 AM', amount: 'Rp 350.000', status: 'Completed', phone: '+62 821-7777-8888' },
  { id: '#BK005', customer: 'William Davis', barber: 'Michael Jordan', service: 'Classic Haircut', date: '2026-05-06', time: '03:30 PM', amount: 'Rp 150.000', status: 'Confirmed', phone: '+62 821-9999-0000' },
];

export const customers = [
  { id: 1, name: 'John Doe', phone: '+62 821-1111-2222', email: 'john@email.com', visits: 15, lastVisit: '2026-05-03', spent: 'Rp 2.250.000' },
  { id: 2, name: 'Alex Smith', phone: '+62 821-3333-4444', email: 'alex@email.com', visits: 12, lastVisit: '2026-05-01', spent: 'Rp 1.800.000' },
  { id: 3, name: 'James Wilson', phone: '+62 821-5555-6666', email: 'james@email.com', visits: 20, lastVisit: '2026-04-28', spent: 'Rp 3.600.000' },
  { id: 4, name: 'Robert Brown', phone: '+62 821-7777-8888', email: 'robert@email.com', visits: 8, lastVisit: '2026-04-25', spent: 'Rp 1.200.000' },
];