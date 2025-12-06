# 🚀 Complete Supabase Database Setup

## Current Status

✅ **Environment variables configured** - Your `.env.local` has Supabase credentials  
✅ **Application running** - Server is live at `http://localhost:3000`  
⚠️ **Database tables missing** - Getting "fetch failed" error when signing up

## What You Need to Do

### Step 1: Open Supabase SQL Editor

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your oStaran project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Copy and Run the Schema

1. Open the file: `supabase/schema.sql` in your project
2. **Copy the ENTIRE contents** (all 145 lines)
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

You should see: ✅ **Success. No rows returned**

### Step 3: Verify Tables Were Created

1. Click **Table Editor** in the left sidebar
2. You should now see these tables:
   - ✅ `profiles`
   - ✅ `instructor_profiles`

### Step 4: Check RLS Policies

1. Click on the `profiles` table
2. Click the **Policies** tab
3. You should see 3 policies:
   - "Profiles are viewable by everyone"
   - "Users can insert their own profile"
   - "Users can update their own profile"

4. Click on the `instructor_profiles` table
5. Click the **Policies** tab
6. You should see 3 policies:
   - "Instructor profiles are viewable by everyone"
   - "Users can insert their own instructor profile"
   - "Instructors can update their own profile"

### Step 5: Test Sign-Up

1. Go to `http://localhost:3000/auth/student/signup`
2. Fill in the form:
   - Full Name: Your Name
   - Email: your.email@example.com
   - Password: TestPassword123
   - Confirm Password: TestPassword123
3. Click **Create Student Account**

**Expected Result:**
- ✅ Success message appears
- ✅ You receive a verification email (if email confirmation is enabled)
- ✅ User appears in **Authentication > Users** in Supabase
- ✅ Profile appears in **Table Editor > profiles**

---

## 🐛 Troubleshooting

### Error: "fetch failed"

**Cause:** Database tables don't exist yet  
**Solution:** Run the `schema.sql` in Supabase SQL Editor (Step 2 above)

### Error: "new row violates row-level security policy"

**Cause:** RLS policies not set correctly  
**Solution:** 
1. Re-run the entire `schema.sql` file
2. The script now includes `DROP POLICY IF EXISTS` to handle re-runs

### Error: "relation 'profiles' already exists"

**Cause:** Tables already created  
**Solution:** This is fine! The script uses `CREATE TABLE IF NOT EXISTS`

### Error: "User already registered"

**Cause:** You already created an account with that email  
**Solution:** Use a different email or delete the user from Supabase Auth

### Sign-up succeeds but no profile created

**Cause:** RLS policy blocking the insert  
**Solution:**
1. Check the `profiles` table policies
2. Verify the "Users can insert their own profile" policy exists
3. Re-run the schema if needed

---

## 📊 What the Schema Creates

### Tables

**`profiles`** - All users (students and instructors)
- `id` - UUID (links to auth.users)
- `email` - User's email
- `full_name` - User's name
- `user_type` - 'student' or 'instructor'
- `avatar_url` - Profile picture (optional)
- `created_at`, `updated_at` - Timestamps

**`instructor_profiles`** - Instructor-specific data
- `id` - UUID (primary key)
- `user_id` - Links to profiles.id
- `expertise` - Area of expertise
- `bio` - Instructor biography
- `rating` - Average rating (0-5)
- `total_students` - Student count
- `total_courses` - Course count
- `is_verified` - Verification status
- `created_at`, `updated_at` - Timestamps

### Security (RLS Policies)

- ✅ All users can view all profiles
- ✅ Users can only insert/update their own profile
- ✅ Instructors can only insert/update their own instructor profile
- ✅ All data is protected by Row Level Security

### Performance (Indexes)

- ✅ Index on `user_type` for filtering
- ✅ Index on `email` for lookups
- ✅ Index on `user_id` in instructor_profiles
- ✅ Index on `rating` for sorting

---

## ✅ Verification Checklist

After running the schema, verify:

- [ ] Tables exist in Table Editor
- [ ] RLS policies are enabled on both tables
- [ ] All 6 policies are created (3 per table)
- [ ] Triggers are created for timestamp updates
- [ ] Indexes are created for performance
- [ ] Test sign-up works without errors
- [ ] User appears in Authentication > Users
- [ ] Profile appears in Table Editor > profiles

---

## 🎯 Next Steps After Database Setup

Once the database is working:

1. ✅ Test student sign-up and sign-in
2. ✅ Test instructor sign-up and sign-in
3. ✅ Test password reset flow
4. 🔄 Build student dashboard
5. 🔄 Build instructor dashboard
6. 🔄 Add course management features

---

**Ready to proceed?** Run the SQL from `supabase/schema.sql` in your Supabase SQL Editor now!
