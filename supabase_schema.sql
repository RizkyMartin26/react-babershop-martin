-- ============================================================
-- FULL RESET & SETUP - Elite Barber Shop
-- Copy SELURUH script ini ke Supabase SQL Editor lalu Run
-- ============================================================

-- STEP 1: Drop semua policy yang mungkin sudah ada
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- STEP 2: Drop semua tabel lama
DROP TABLE IF EXISTS public.members CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.barbers CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- STEP 3: Drop trigger dan function lama
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ============================================================
-- STEP 4: Buat semua tabel baru
-- ============================================================

CREATE TABLE public.users (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name text NOT NULL DEFAULT '',
    email text NOT NULL DEFAULT '',
    phone text DEFAULT '',
    role text DEFAULT 'customer',
    avatar text DEFAULT '',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_select" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE TABLE public.customers (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    email text DEFAULT '',
    phone text DEFAULT '',
    visits integer DEFAULT 0,
    status text DEFAULT 'Regular',
    initials text DEFAULT '',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customers_all" ON public.customers FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE public.barbers (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    role text NOT NULL DEFAULT '',
    rating numeric(2,1) DEFAULT 5.0,
    bookings integer DEFAULT 0,
    experience text DEFAULT '',
    phone text DEFAULT '',
    status text DEFAULT 'Available',
    initials text DEFAULT '',
    image text DEFAULT '',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "barbers_all" ON public.barbers FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE public.services (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    price text NOT NULL DEFAULT '',
    duration text DEFAULT '',
    image text DEFAULT '',
    popular boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_auth" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "services_public" ON public.services FOR SELECT USING (true);

CREATE TABLE public.products (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    category text DEFAULT '',
    price integer DEFAULT 0,
    stock integer DEFAULT 0,
    image text DEFAULT '',
    description text DEFAULT '',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_auth" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "products_public" ON public.products FOR SELECT USING (true);

CREATE TABLE public.bookings (
    id text PRIMARY KEY,
    customer text NOT NULL DEFAULT '',
    barber text NOT NULL DEFAULT '',
    service text NOT NULL DEFAULT '',
    date date NOT NULL,
    time text NOT NULL DEFAULT '',
    status text DEFAULT 'Pending',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookings_all" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE public.members (
    id text PRIMARY KEY,
    name text NOT NULL DEFAULT '',
    level text DEFAULT 'Bronze',
    points integer DEFAULT 0,
    visits integer DEFAULT 0,
    totalSpent text DEFAULT 'Rp 0',
    status text DEFAULT 'Active',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members_all" ON public.members FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STEP 5: Seed Data
-- ============================================================

INSERT INTO public.customers (name, email, phone, visits, status, initials) VALUES
('John Doe', 'john.doe@example.com', '+62 812-0100-1111', 15, 'Regular', 'JD'),
('Michael Smith', 'michael.smith@example.com', '+62 812-0101-1222', 18, 'VIP', 'MS'),
('David Beckham', 'david.beckham@example.com', '+62 812-0102-1333', 25, 'VIP', 'DB'),
('Ryan Reynolds', 'ryan.reynolds@example.com', '+62 812-0103-1444', 32, 'VIP', 'RR'),
('Chris Evans', 'chris.evans@example.com', '+62 812-0104-1555', 8, 'Regular', 'CE'),
('Kevin Hart', 'kevin.hart@example.com', '+62 812-0105-1666', 12, 'Regular', 'KH'),
('James Bond', 'james.bond@example.com', '+62 812-0106-1777', 40, 'VIP', 'JB'),
('Robert Stark', 'robert.stark@example.com', '+62 812-0107-1888', 5, 'Regular', 'RS'),
('William Wayne', 'william.wayne@example.com', '+62 812-0108-1999', 14, 'Regular', 'WW'),
('Joseph Kent', 'joseph.kent@example.com', '+62 812-0109-2110', 21, 'VIP', 'JK');

INSERT INTO public.barbers (name, role, rating, bookings, experience, phone, status, initials, image) VALUES
('Michael Jordan', 'Classic & Fade', 4.9, 156, '8 years', '+62 812-3456-7890', 'Available', 'MJ', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop'),
('David Beckham', 'Modern Style', 4.8, 142, '6 years', '+62 813-4567-8901', 'Busy', 'DB', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'),
('Ryan Reynolds', 'Beard Expert', 4.9, 138, '7 years', '+62 814-5678-9012', 'Available', 'RR', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'),
('Chris Evans', 'Hair Coloring', 4.7, 128, '5 years', '+62 815-6789-0123', 'Available', 'CE', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'),
('Tom Holland', 'Hair Tattoo', 4.6, 95, '4 years', '+62 816-7890-1234', 'Available', 'TH', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop'),
('Zayn Malik', 'Kids Haircut', 4.8, 110, '5 years', '+62 817-8901-2345', 'Busy', 'ZM', 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=300&auto=format&fit=crop');

INSERT INTO public.services (title, price, duration, image, popular) VALUES
('Classic Haircut', 'Rp 50,000', '30 min', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80', true),
('Premium Haircut', 'Rp 70,000', '40 min', 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&q=80', true),
('Beard Trim & Line-up', 'Rp 90,000', '50 min', 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80', false),
('Hair Coloring (Black)', 'Rp 110,000', '60 min', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80', false),
('Hot Towel Shave', 'Rp 50,000', '30 min', 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80', true),
('Hair Wash & Styling', 'Rp 70,000', '40 min', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80', false);

INSERT INTO public.products (title, category, price, stock, image, description) VALUES
('Elite Matte Pomade', 'Pomade & Wax', 85000, 15, 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop', 'Pomade premium matte untuk gaya maskulin.'),
('Classic Shine Pomade', 'Pomade & Wax', 110000, 16, 'https://picsum.photos/seed/product1/800/800', 'Memberikan kilau maksimal dan hold seharian.'),
('Gentleman Beard Oil', 'Beard Care', 135000, 17, 'https://picsum.photos/seed/product2/800/800', 'Melembabkan janggut dan kulit di bawahnya.'),
('Signature Hair Tonic', 'Hair Care', 85000, 18, 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop', 'Menguatkan akar rambut dan menyegarkan kulit kepala.'),
('Premium Shaving Cream', 'Shaving', 110000, 19, 'https://picsum.photos/seed/product4/800/800', 'Krim cukur mewah dengan busa melimpah.');

INSERT INTO public.bookings (id, customer, barber, service, date, time, status) VALUES
('BK1001', 'Alex Smith', 'Michael Jordan', 'Premium Haircut', CURRENT_DATE, '10:00', 'Confirmed'),
('BK1002', 'James Wilson', 'David Beckham', 'Classic Haircut + Beard', CURRENT_DATE, '11:30', 'Pending'),
('BK1003', 'Robert Brown', 'Ryan Reynolds', 'Hot Towel Shave', CURRENT_DATE + INTERVAL '1 day', '14:00', 'Confirmed'),
('BK1004', 'William Davis', 'Chris Evans', 'Hair Coloring', CURRENT_DATE - INTERVAL '1 day', '09:00', 'Completed'),
('BK1005', 'Joseph Miller', 'Tom Holland', 'Kids Haircut', CURRENT_DATE + INTERVAL '2 days', '15:30', 'Confirmed');

INSERT INTO public.members (id, name, level, points, visits, totalSpent, status) VALUES
('MB001', 'John Doe', 'Gold', 1200, 18, 'Rp 3.500.000', 'Active'),
('MB002', 'Michael Smith', 'Silver', 850, 12, 'Rp 2.100.000', 'Active'),
('MB003', 'David Beckham', 'Bronze', 450, 6, 'Rp 950.000', 'Active'),
('MB004', 'Ryan Reynolds', 'Gold', 1800, 25, 'Rp 5.400.000', 'Active'),
('MB005', 'Cristiano Ronaldo', 'Gold', 2500, 35, 'Rp 8.200.000', 'Active');

-- ============================================================
-- STEP 6: Trigger auto-sync auth -> public.users
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- SELESAI! Semua tabel sudah dibuat dan siap digunakan.
