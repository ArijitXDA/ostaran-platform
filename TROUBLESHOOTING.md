# Troubleshooting Authentication Issues

## Current Status

✅ **Code Updated** - Auth actions now use `role` instead of `user_type`  
✅ **Schema Aligned** - instructor_profiles uses `id` field, expertise_areas as array  
⚠️ **Still Getting Error** - "fetch failed" when trying to sign up

## Possible Causes

### 1. **Missing user_role ENUM Type**

Your schema uses a custom ENUM type `user_role`. Check if it exists:

```sql
-- Run this in Supabase SQL Editor
SELECT typname, enumlabel 
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE typname = 'user_role';
```

**Expected Result:**
```
user_role | student
user_role | instructor  
user_role | admin
```

**If missing, create it:**
```sql
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
```

### 2. **Missing instructor_status ENUM Type**

```sql
-- Check if instructor_status exists
SELECT typname, enumlabel 
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE typname = 'instructor_status';
```

**If missing, create it:**
```sql
CREATE TYPE instructor_status AS ENUM ('pending', 'approved', 'rejected');
```

### 3. **RLS Policies Not Set**

Check if RLS is enabled and policies exist:

```sql
-- Check profiles table RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Check instructor_profiles table RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'instructor_profiles';
```

**If no policies exist, create them:**

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Instructor profiles policies
CREATE POLICY "Instructor profiles are viewable by everyone"
  ON instructor_profiles FOR SELECT
  USING (true);

CREATE POLICY "Instructors can insert their own profile"
  ON instructor_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Instructors can update their own profile"
  ON instructor_profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 4. **Email Confirmation Required**

Check your Supabase Auth settings:

1. Go to **Authentication** → **Settings**
2. Check if **"Confirm email"** is enabled
3. If enabled, users must verify email before profile is created

**Options:**
- **Disable email confirmation** for testing (not recommended for production)
- **Check spam folder** for verification email
- **Use a real email** that you can access

### 5. **Wrong Environment Variables**

Verify your `.env.local` has correct values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Test the connection:**
1. Go to Supabase dashboard
2. Settings → API
3. Verify the URL and keys match your `.env.local`

## Debugging Steps

### Step 1: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try signing up again
4. Look for error messages

Common errors:
- `relation "profiles" does not exist` → Tables not created
- `column "role" does not exist` → Wrong column name
- `new row violates row-level security policy` → RLS issue
- `invalid input value for enum user_role` → ENUM type missing

### Step 2: Check Network Tab

1. Open DevTools → **Network** tab
2. Try signing up again
3. Look for failed requests (red)
4. Click on the failed request
5. Check **Response** tab for error details

### Step 3: Check Supabase Logs

1. Go to Supabase dashboard
2. Click **Logs** in sidebar
3. Select **Postgres Logs**
4. Try signing up again
5. Look for error messages

### Step 4: Test Direct Database Insert

Try inserting a test profile directly in Supabase SQL Editor:

```sql
-- First, create a test auth user manually in Authentication > Users
-- Then run this with the user's UUID:

INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'paste-user-uuid-here',
  'test@example.com',
  'Test User',
  'student'::user_role
);
```

If this fails, you'll see the exact error message.

## Quick Fixes

### Fix 1: Disable RLS Temporarily (Testing Only)

```sql
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profiles DISABLE ROW LEVEL SECURITY;
```

⚠️ **WARNING**: Only for testing! Re-enable for production.

### Fix 2: Use Service Role Key

If RLS is the issue, we can temporarily use the service role key to bypass it.

Update `src/lib/supabase/server.ts` to add a service client:

```typescript
import { createClient as createSupabaseClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Regular client (existing)
export async function createClient() {
  // ... existing code ...
}

// Service role client (bypasses RLS)
export async function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
```

Then use `createServiceClient()` in auth actions for profile creation.

### Fix 3: Check for Existing User

The error might be because the user already exists:

```sql
-- Check if user already exists
SELECT * FROM auth.users WHERE email = 'test.aligned@example.com';

-- If exists, delete it
DELETE FROM auth.users WHERE email = 'test.aligned@example.com';
```

## Next Steps

1. **Check browser console** for exact error message
2. **Run the SQL queries above** to verify ENUM types and RLS policies
3. **Check Supabase logs** for detailed error information
4. **Share the exact error message** so I can provide specific fix

## Common Error Messages & Solutions

| Error Message | Solution |
|---------------|----------|
| `relation "profiles" does not exist` | Tables not created - run schema.sql |
| `column "role" does not exist` | Column name mismatch - check schema |
| `column "user_type" does not exist` | Old code still using user_type - restart server |
| `invalid input value for enum user_role` | ENUM type missing - create it |
| `new row violates row-level security policy` | RLS blocking insert - check policies |
| `duplicate key value violates unique constraint` | User already exists - use different email |
| `fetch failed` | Generic error - check console/logs for details |

---

**Need Help?** Share the error message from the browser console and I can provide a specific fix!
