# Database Schema Alignment Notes

## Your Existing Schema vs Original Implementation

### Key Differences

#### 1. **profiles** Table
**Your Schema:**
- Uses `role` enum (user_role type) with values: 'student', 'instructor', 'admin'
- Has additional fields: `display_name`, `mobile`, `country`, `city`, `occupation`, `dob`, `website_url`, `linkedin_url`, `twitter_url`, `github_url`, `email_notifications`, `marketing_emails`, `app_install_type`, `last_login_at`
- `bio` field exists in profiles (not separate)

**Original Implementation:**
- Used `user_type` text field with CHECK constraint
- Only basic fields

**✅ Updated:** Auth actions now use `role` instead of `user_type`

#### 2. **instructor_profiles** Table
**Your Schema:**
- `id` is the primary key that references `profiles(id)` directly (NOT a separate UUID)
- No `user_id` field - uses `id` directly
- Has `expertise_areas` as an ARRAY (not single `expertise` text)
- No `bio` field (bio is in profiles table)
- Has many additional fields: `headline`, `teaching_experience_years`, `languages`, `credentials`, `certifications`, `education`, `status`, `bank_account_*`, `pan_number`, `gst_number`, `upi_id`, etc.
- Has `status` enum (instructor_status): 'pending', 'approved', 'rejected'

**Original Implementation:**
- Had separate `id` and `user_id` fields
- Used single `expertise` text field
- Had `bio` field

**✅ Updated:** Auth actions now:
- Use `id` field directly (not `user_id`)
- Convert single expertise string to array: `[data.expertise]`
- Store bio in `profiles.bio` instead

#### 3. **Custom ENUM Types in Your Schema**

Your database uses several custom enum types:
- `user_role`: 'student', 'instructor', 'admin'
- `instructor_status`: 'pending', 'approved', 'rejected'
- `course_status`: 'draft', 'submitted', 'approved', 'rejected', 'published'
- `payout_status`: 'pending', 'processing', 'completed', 'failed'
- `membership_status`: 'active', 'cancelled', 'expired', 'suspended'

## Updated Authentication Flow

### Student Sign-Up
1. Create auth user with `role: 'student'`
2. Insert into `profiles` with `role: 'student'`
3. No additional tables needed

### Instructor Sign-Up
1. Create auth user with `role: 'instructor'`
2. Insert into `profiles` with `role: 'instructor'` and `bio`
3. Insert into `instructor_profiles` with:
   - `id: user.id` (not user_id)
   - `expertise_areas: [expertise]` (as array)
   - Default `status: 'pending'` (awaiting approval)

## Additional Tables in Your Schema

Your schema includes many more tables for the full platform:

### Course Management
- `course_master` - Main course table
- `course_sections` - Course sections/modules
- `sessions` - Individual lessons/videos
- `course_enrollments` - Student enrollments
- `course_reviews` - Course ratings and reviews
- `course_embeddings` - For AI/search features

### Payment & Commerce
- `orders` - Purchase orders
- `payments` - Payment transactions
- `discount_coupons` - Coupon codes
- `coupon_usage_log` - Coupon usage tracking
- `cart` - Shopping cart items

### Instructor Features
- `instructor_earnings` - Earnings tracking
- `instructor_payouts` - Payout management
- `instructor_reviews` - Instructor ratings

### Student Features
- `video_progress` - Video watch progress
- `certificates` - Course completion certificates
- `qa_questions` - Q&A questions
- `qa_answers` - Q&A answers

### Community Features
- `forum_categories` - Forum categories
- `forum_threads` - Forum discussions
- `forum_replies` - Forum responses
- `forum_upvotes` - Voting system

### Membership System
- `membership_tiers` - Membership plans
- `user_memberships` - User subscriptions

### System Features
- `notifications` - User notifications
- `email_logs` - Email tracking
- `email_preferences` - Email settings
- `activity_logs` - User activity tracking
- `chat_history` - AI chat history
- `review_helpful_votes` - Review voting

## Recommendations for Next Steps

1. **✅ Authentication is now aligned** with your existing schema
2. **Test the sign-up flows** to ensure they work with your database
3. **Consider adding instructor approval workflow** since your schema has `instructor_status`
4. **Build dashboards** that leverage the existing tables
5. **Implement course browsing** using `course_master` table
6. **Add enrollment system** using `course_enrollments` table

## Schema Improvements Needed

Since your `instructor_profiles` table doesn't have a `bio` field but the sign-up form collects it, you have two options:

### Option 1: Store bio in profiles table (Current Implementation)
- ✅ Already implemented
- Bio is stored in `profiles.bio`
- Accessible for both students and instructors

### Option 2: Add bio field to instructor_profiles
Run this SQL in Supabase:
```sql
ALTER TABLE instructor_profiles 
ADD COLUMN bio TEXT;
```

Then update the auth action to use it directly.

## Testing Checklist

- [ ] Test student sign-up
- [ ] Test instructor sign-up
- [ ] Verify profile created in `profiles` table
- [ ] Verify instructor profile created in `instructor_profiles` table
- [ ] Check that `expertise_areas` is an array
- [ ] Check that `status` defaults to 'pending'
- [ ] Test sign-in for both roles
- [ ] Test password reset
