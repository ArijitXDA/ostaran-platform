# How to Get Your Supabase Credentials

## Step 1: Go to Supabase Dashboard

1. Open [supabase.com](https://supabase.com) in your browser
2. Sign in to your account
3. Click on your **oStaran** project (or whichever project you're using)

## Step 2: Navigate to API Settings

1. In the left sidebar, click **Settings** (gear icon at bottom)
2. Click **API** in the settings menu

## Step 3: Copy Your Credentials

You'll see two important values:

### Project URL
- Look for **Project URL** section
- It will look like: `https://abcdefghijklmnop.supabase.co`
- Click the copy icon to copy it

### Anon Key (Public)
- Scroll down to **Project API keys** section
- Find the **anon public** key
- It's a long string starting with `eyJ...`
- Click the copy icon to copy it

### Service Role Key (Optional, for admin operations)
- In the same **Project API keys** section
- Find the **service_role** key
- ⚠️ **Keep this secret!** Never expose it in client-side code

## Step 4: Update .env.local

Open your `.env.local` file and replace the placeholder values:

**BEFORE (placeholder values):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-role-key
```

**AFTER (your actual values):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODMxNjgwMCwiZXhwIjoxOTUzODkyODAwfQ.your-actual-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-service-role-key-here
```

## Step 5: Save and Restart

1. **Save** the `.env.local` file
2. **Stop** the development server (Ctrl+C in terminal)
3. **Restart** the server: `npm run dev`
4. **Test** sign-up again

## Visual Guide

```
Supabase Dashboard
├── Settings (⚙️)
│   └── API
│       ├── Project URL: https://xxxxx.supabase.co  ← Copy this
│       └── Project API keys
│           ├── anon public: eyJ...  ← Copy this
│           └── service_role: eyJ... ← Copy this (keep secret!)
```

## Verification

After updating, your `.env.local` should have:
- ✅ Real project URL (not "placeholder")
- ✅ Real anon key (starts with "eyJ", very long)
- ✅ Real service role key (starts with "eyJ", very long)
- ✅ No quotes around values
- ✅ No extra spaces

## Common Mistakes

❌ **Wrong:**
```env
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"  # Has quotes
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co  # Has spaces
NEXT_PUBLIC_SUPABASE_URL=placeholder.supabase.co    # Still placeholder
```

✅ **Correct:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Once you've updated the values, restart the server and try signing up again!**
