-- ============================================================
-- PATCH: Fix kolom totalSpent -> totalspent di tabel members
-- Jalankan ini di Supabase SQL Editor jika tabel sudah ada
-- ============================================================

-- Cek apakah kolom totalSpent (case sensitive) ada
-- Jika error "column already exists" berarti sudah benar

DO $$
BEGIN
  -- Coba rename jika kolom masih bernama "totalSpent" (dengan huruf kapital)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'members'
      AND column_name = 'totalSpent'
  ) THEN
    ALTER TABLE public.members RENAME COLUMN "totalSpent" TO totalspent;
    RAISE NOTICE 'Kolom berhasil di-rename dari totalSpent ke totalspent';
  ELSE
    RAISE NOTICE 'Kolom sudah bernama totalspent atau tidak ada - tidak perlu di-rename';
  END IF;
END;
$$;

-- Pastikan kolom visits ada (tambahkan jika belum ada)
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS visits integer DEFAULT 0;

-- Lihat struktur tabel sekarang
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'members'
ORDER BY ordinal_position;
