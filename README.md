# oStaran - Online Learning Platform

> A premium online learning platform for AI, Agentic AI, Vibe Coding, and Business Intelligence courses - built with Next.js 14, TypeScript, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Project Overview

oStaran is a comprehensive learning management system (LMS) designed to deliver premium online courses. The platform features dual authentication for students and instructors, a modern glassmorphism UI, and a robust database schema supporting courses, payments, forums, memberships, and AI-powered features.

### Current Status: Phase 1 Complete ✅

**Implemented Features:**
- ✅ Complete authentication system (sign-up, sign-in, email verification, password reset)
- ✅ Dual user roles (Students & Instructors)
- ✅ Student dashboard with profile display
- ✅ Premium UI with glassmorphism and animations
- ✅ Supabase integration with comprehensive database schema
- ✅ Protected routes and session management

## 🚀 Features

### Authentication System
- **Student Sign-Up/Sign-In** - Email-based authentication with verification
- **Instructor Sign-Up/Sign-In** - Additional profile fields (expertise, bio)
- **Email Verification** - Supabase-powered email confirmation
- **Password Reset** - Secure password recovery flow
- **Session Management** - Persistent authentication across routes

### User Dashboards
- **Student Dashboard** - Profile display, enrollment stats, course progress
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Design System
- **Glassmorphism UI** - Modern frosted glass effects
- **Vibrant Gradients** - Eye-catching color schemes
- **Smooth Animations** - Micro-interactions for enhanced UX
- **Dark Mode Ready** - CSS custom properties for theming
- **Premium Typography** - Inter (body) & Outfit (headings) from Google Fonts

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS with custom design system
- **Form Validation:** React Hook Form + Zod

### Backend & Database
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **ORM:** Supabase Client (@supabase/ssr)
- **Session Management:** Server-side cookies

### Future Integrations (Schema Ready)
- **Video Hosting:** VdoCipher
- **Payments:** Razorpay
- **Email Automation:** Make.com
- **AI Features:** OpenAI & Grok APIs
- **File Storage:** AWS S3 / OneDrive
- **Vector Database:** Pinecone / Redis

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ostaran-platform.git
cd ostaran-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get your Supabase credentials:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select existing
3. Go to Settings → API
4. Copy Project URL and API keys

### 4. Set Up Database

Run the database schema in your Supabase SQL Editor:

```bash
# The schema is located in:
supabase/schema.sql
```

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and execute

This creates:
- ✅ `profiles` table (all users)
- ✅ `instructor_profiles` table (instructors)
- ✅ 30+ additional tables for courses, payments, forums, etc.
- ✅ Row Level Security (RLS) policies
- ✅ Triggers and indexes

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ostaran-platform/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── auth.ts              # Server actions for authentication
│   │   ├── auth/
│   │   │   ├── student/             # Student auth pages
│   │   │   └── instructor/          # Instructor auth pages
│   │   ├── student/
│   │   │   └── dashboard/           # Student dashboard
│   │   ├── globals.css              # Global styles & design system
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   └── auth/                    # Auth components
│   └── lib/
│       └── supabase/                # Supabase clients
├── supabase/
│   └── schema.sql                   # Complete database schema
├── middleware.ts                    # Next.js middleware
├── .env.example                     # Environment variables template
└── README.md
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema with 30+ tables supporting:

- **User Management** - profiles, instructor_profiles
- **Courses** - course_master, course_sections, sessions
- **Enrollments** - course_enrollments, video_progress
- **Commerce** - orders, payments, discount_coupons, cart
- **Community** - forum_categories, forum_threads, qa_questions
- **Advanced** - course_embeddings, chat_history, certificates

See [SCHEMA_ALIGNMENT.md](SCHEMA_ALIGNMENT.md) for detailed documentation.

## 🚦 Getting Started

### For Students
1. Visit `/auth/student/signup`
2. Create account with email and password
3. Verify email (check inbox/spam)
4. Sign in at `/auth/student/signin`
5. Access dashboard at `/student/dashboard`

### For Instructors
1. Visit `/auth/instructor/signup`
2. Provide expertise and bio
3. Verify email
4. Sign in at `/auth/instructor/signin`
5. Status: 'pending' (awaiting admin approval)

## 📚 Documentation

- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Database setup guide
- [SCHEMA_ALIGNMENT.md](SCHEMA_ALIGNMENT.md) - Schema documentation
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues & solutions

## 🛣️ Roadmap

### Phase 2: Course Management (Next)
- [ ] Instructor dashboard
- [ ] Course creation interface
- [ ] Video upload (VdoCipher)
- [ ] Quiz and assignment builder

### Phase 3: Student Features
- [ ] Course browsing and search
- [ ] Course enrollment
- [ ] Video player with progress
- [ ] Q&A system

### Phase 4: Commerce
- [ ] Razorpay integration
- [ ] Shopping cart
- [ ] Coupon system
- [ ] Instructor payouts

### Phase 5: Community & Advanced
- [ ] Forum system
- [ ] AI recommendations
- [ ] Membership subscriptions
- [ ] Certificates

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Deployment platform

---

**Built with ❤️ for the future of online learning**
