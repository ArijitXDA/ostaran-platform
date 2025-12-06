'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { resetPassword } from '@/app/actions/auth'
import Link from 'next/link'

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function StudentForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await resetPassword(data.email)

            if (result.error) {
                setError(result.error)
            } else {
                setSuccess(true)
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
                    Password Reset Email Sent!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                    Please check your email for instructions to reset your password.
                </p>
                <Link href="/auth/student/signin" className="btn btn-primary">
                    Back to Sign In
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                Enter your email address and we&apos;ll send you instructions to reset your password.
            </p>

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
                            Sending...
                        </>
                    ) : (
                        'Send Reset Instructions'
                    )}
                </button>

                <div className="form-link">
                    Remember your password?{' '}
                    <Link href="/auth/student/signin">Sign in</Link>
                </div>
            </div>
        </form>
    )
}
