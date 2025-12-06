# Database Setup Guide for oStaran Platform

This guide will help you set up the Supabase database for the oStaran learning platform.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Your Supabase project created

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: oStaran Platform
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (this may take a few minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Update Environment Variables

1. Open the `.env.local` file in your project root
2. Update the following variables with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 4: Run the Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- `profiles` table for all users (students and instructors)
- `instructor_profiles` table for instructor-specific data
- Row Level Security (RLS) policies
- Triggers for automatic timestamp updates
- Indexes for performance optimization

## Step 5: Configure Authentication

1. In your Supabase project dashboard, go to **Authentication** → **Settings**
2. Configure the following settings:

### Email Auth
- Enable **Email** provider
- **Confirm email**: Toggle ON (recommended for production)
- **Email confirmation**: Set to "Confirm email" for new signups

### Site URL
- Set **Site URL** to: `http://localhost:3000` (for development)
- For production, update this to your actual domain

### Redirect URLs
Add the following redirect URLs:
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/reset-password`

## Step 6: Verify the Setup

1. Check that all tables are created:
   - Go to **Table Editor** in Supabase
   - You should see `profiles` and `instructor_profiles` tables

2. Verify RLS policies:
   - Click on each table
   - Go to the "Policies" tab
   - Ensure policies are enabled

## Step 7: Test Authentication

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Try creating a student account:
   - Go to student sign-up page
   - Fill in the form
   - Submit

4. Check Supabase:
   - Go to **Authentication** → **Users**
   - You should see the new user
   - Go to **Table Editor** → **profiles**
   - You should see the user profile

## Database Schema Overview

### `profiles` Table
Stores basic information for all users (both students and instructors):
- `id`: UUID (references auth.users)
- `email`: User's email address
- `full_name`: User's full name
- `user_type`: Either 'student' or 'instructor'
- `avatar_url`: Profile picture URL (optional)
- `created_at`, `updated_at`: Timestamps

### `instructor_profiles` Table
Stores additional information for instructors only:
- `id`: UUID (primary key)
- `user_id`: References profiles.id
- `expertise`: Area of expertise
- `bio`: Instructor biography
- `rating`: Average rating (0.00 to 5.00)
- `total_students`: Number of students taught
- `total_courses`: Number of courses created
- `is_verified`: Verification status
- `created_at`, `updated_at`: Timestamps

## Row Level Security (RLS) Policies

### Profiles Table
- ✅ All users can view all profiles
- ✅ Users can insert their own profile
- ✅ Users can update their own profile

### Instructor Profiles Table
- ✅ All users can view instructor profiles
- ✅ Only instructors can insert their own instructor profile
- ✅ Instructors can update their own instructor profile

## Troubleshooting

### Issue: "new row violates row-level security policy"
**Solution**: Make sure the RLS policies are properly created. Re-run the schema.sql file.

### Issue: Authentication not working
**Solution**: 
1. Verify your environment variables are correct
2. Check that the Site URL is set correctly in Supabase settings
3. Ensure email confirmation is configured as desired

### Issue: Profile not created after signup
**Solution**: Check the browser console and server logs for errors. Verify the schema was created correctly.

## Next Steps

After setting up the database:
1. ✅ Test student sign-up and sign-in
2. ✅ Test instructor sign-up and sign-in
3. ✅ Test forgot password functionality
4. 🔄 Build course management features
5. 🔄 Integrate payment gateway
6. 🔄 Add video hosting with VdoCipher

## Security Notes

⚠️ **Important Security Reminders:**
- Never commit `.env.local` to version control
- Keep your `service_role` key secret
- Use the `anon` key for client-side operations only
- Always use RLS policies to protect your data
- Enable email confirmation for production

## Support

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Review the browser console for client-side errors
3. Check the Next.js server logs for server-side errors
4. Refer to [Supabase documentation](https://supabase.com/docs)
