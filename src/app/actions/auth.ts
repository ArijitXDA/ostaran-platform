'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface SignUpStudentData {
    email: string
    password: string
    fullName: string
}

interface SignUpInstructorData {
    email: string
    password: string
    fullName: string
    expertise: string
    bio: string
}

export async function signUpStudent(data: SignUpStudentData) {
    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.fullName,
                role: 'student',
            },
        },
    })

    if (authError) {
        console.error('❌ Auth signup error:', authError)
        return { error: authError.message }
    }

    // Create student profile
    if (authData.user) {
        console.log('✅ User created:', authData.user.id)

        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: authData.user.id,
                full_name: data.fullName,
                email: data.email,
                role: 'student',
            })

        if (profileError) {
            console.error('❌ Profile creation error:', {
                message: profileError.message,
                details: profileError.details,
                hint: profileError.hint,
                code: profileError.code,
            })
            return { error: `Failed to create profile: ${profileError.message}` }
        }

        console.log('✅ Profile created successfully')
    }

    return { success: true }
}

export async function signUpInstructor(data: SignUpInstructorData) {
    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.fullName,
                role: 'instructor',
            },
        },
    })

    if (authError) {
        return { error: authError.message }
    }

    // Create instructor profile
    if (authData.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: authData.user.id,
                full_name: data.fullName,
                email: data.email,
                role: 'instructor',
                bio: data.bio, // Store bio in profiles table
            })

        if (profileError) {
            return { error: 'Failed to create profile: ' + profileError.message }
        }

        // Create instructor-specific profile
        // Note: instructor_profiles.id references profiles.id directly (not a separate user_id)
        const { error: instructorError } = await supabase
            .from('instructor_profiles')
            .insert({
                id: authData.user.id, // id field, not user_id
                expertise_areas: [data.expertise], // expertise_areas is an array
                status: 'pending', // Default status awaiting approval
            })

        if (instructorError) {
            return { error: 'Failed to create instructor profile: ' + instructorError.message }
        }
    }

    return { success: true }
}

export async function signIn(email: string, password: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}

export async function resetPassword(email: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}
