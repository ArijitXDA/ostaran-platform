import AuthLayout from '@/components/auth/AuthLayout'
import InstructorForgotPasswordForm from '@/components/auth/InstructorForgotPasswordForm'

export default function InstructorForgotPasswordPage() {
    return (
        <AuthLayout
            title="Reset Your Password"
            subtitle="We'll send you instructions to reset your password"
            userType="instructor"
        >
            <InstructorForgotPasswordForm />
        </AuthLayout>
    )
}
