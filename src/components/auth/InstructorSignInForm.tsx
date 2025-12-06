'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from '@/app/actions/auth'
import Link from 'next/link'

const instructorSignInSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
})

type InstructorSignInFormData = z.infer<typeof instructorSignInSchema>

export default function InstructorSignInForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InstructorSignInFormData>({
        resolver: zodResolver(instructorSignInSchema),
    })

    const onSubmit = async (data: InstructorSignInFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn(data.email, data.password)

            if (result.error) {
                setError(result.error)
            } else {
                // Redirect to instructor dashboard (to be created later)
                router.push('/instructor/dashboard')
                router.refresh()
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
                    placeholder="Enter your password"
                    {...register('password')}
                    disabled={isLoading}
                />
                {errors.password && (
                    <span className="error-message">{errors.password.message}</span>
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
                            Signing In...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>

                <div className="form-link">
                    <Link href="/auth/instructor/forgot-password">Forgot your password?</Link>
                </div>

                <div className="divider">or</div>

                <div className="form-link">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/instructor/signup">Sign up</Link>
                </div>

                <div className="form-link">
                    Are you a student?{' '}
                    <Link href="/auth/student/signin">Sign in as Student</Link>
                </div>
            </div>
        </form>
    )
}
