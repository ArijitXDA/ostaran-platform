# Database Schema Verification Checklist

Run these SQL queries in your Supabase SQL Editor to verify everything is set up correctly.

## 1. Check if ENUM Types Exist

```sql
-- Check user_role ENUM
SELECT typname, enumlabel 
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE typname = 'user_role'
ORDER BY enumlabel;

-- Check instructor_status ENUM
SELECT typname, enumlabel 
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE typname = 'instructor_status'
ORDER BY enumlabel;
```

**Expected Results:**
- user_role: student, instructor, admin
- instructor_status: pending, approved, rejected

## 2. Check if Tables Exist

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'instructor_profiles')
ORDER BY table_name;
```

**Expected:** Both tables should be listed

## 3. Check profiles Table Structure

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;
```

**Key Columns to Verify:**
- `id` (uuid, NOT NULL)
- `email` (character varying, NOT NULL)
- `full_name` (character varying, NOT NULL)
- `role` (USER-DEFINED type: user_role)
- `bio` (text, nullable)

## 4. Check instructor_profiles Table Structure

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'instructor_profiles'
ORDER BY ordinal_position;
```

**Key Columns to Verify:**
- `id` (uuid, NOT NULL, references profiles.id)
- `expertise_areas` (ARRAY)
- `status` (USER-DEFINED type: instructor_status)

## 5. Check RLS Status

```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('profiles', 'instructor_profiles');
```

**Expected:** rowsecurity should be `true` for both tables

## 6. Check RLS Policies

```sql
-- Profiles policies
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';

-- Instructor profiles policies  
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'instructor_profiles';
```

**Expected Policies for profiles:**
- SELECT policy (viewable by everyone)
- INSERT policy (users can insert their own)
- UPDATE policy (users can update their own)

**Expected Policies for instructor_profiles:**
- SELECT policy (viewable by everyone)
- INSERT policy (instructors can insert their own)
- UPDATE policy (instructors can update their own)

## 7. Test Insert (Manual)

```sql
-- This will fail if there are issues
-- Replace with a real UUID from auth.users
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with real UUID
  'test@example.com',
  'Test User',
  'student'::user_role
);

-- If successful, clean up
DELETE FROM profiles WHERE email = 'test@example.com';
```

## Results Interpretation

### ✅ All Checks Pass
If all queries return expected results, the database is correctly set up. The issue is likely:
- Environment variables incorrect
- Code not restarted after changes
- Browser cache

### ⚠️ ENUM Types Missing
Run:
```sql
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE instructor_status AS ENUM ('pending', 'approved', 'rejected');
```

### ⚠️ Tables Missing
Your tables exist but might have different structure than expected.

### ⚠️ RLS Not Enabled
Run:
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profiles ENABLE ROW LEVEL SECURITY;
```

### ⚠️ Policies Missing
See TROUBLESHOOTING.md for policy creation SQL.

---

**After running these checks, share the results and I can help fix any issues!**
