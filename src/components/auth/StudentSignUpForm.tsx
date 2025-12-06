'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signUpStudent } from '@/app/actions/auth'
import Link from 'next/link'

const studentSignUpSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    fullName: z.string().min(2, 'Full name is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

type StudentSignUpFormData = z.infer<typeof studentSignUpSchema>

export default function StudentSignUpForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentSignUpFormData>({
        resolver: zodResolver(studentSignUpSchema),
    })

    const onSubmit = async (data: StudentSignUpFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signUpStudent({
                email: data.email,
                password: data.password,
                fullName: data.fullName,
            })

            if (result.error) {
                setError(result.error)
            } else {
                setSuccess(true)
                // Redirect after a short delay to show success message
                setTimeout(() => {
                    router.push('/auth/student/signin')
                }, 2000)
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="success-message" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <h3 style={{ color: 'var(--color-success)', marginBottom: 'var(--spacing-md)' }}>
                    Account Created Successfully!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Please check your email to verify your account. Redirecting to sign in...
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    {...register('fullName')}
                    disabled={isLoading}
                />
                {errors.fullName && (
                    <span className="error-message">{errors.fullName.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    disabled={isLoading}
                />
                {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    {...register('password')}
                    disabled={isLoading}
                />
                {errors.password && (
                    <span className="error-message">{errors.password.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    {...register('confirmPassword')}
                    disabled={isLoading}
                />
                {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword.message}</span>
                )}
            </div>

            {error && (
                <div className="error-message" style={{ padding: 'var(--spacing-md)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
                    {error}
                </div>
            )}

            <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Creating Account...
                        </>
                    ) : (
                        'Create Student Account'
                    )}
                </button>

                <div className="form-link">
                    Already have an account?{' '}
                    <Link href="/auth/student/signin">Sign in</Link>
                </div>

                <div className="divider">or</div>

                <div className="form-link">
                    Want to teach?{' '}
                    <Link href="/auth/instructor/signup">Sign up as Instructor</Link>
                </div>
            </div>
        </form>
    )
}
