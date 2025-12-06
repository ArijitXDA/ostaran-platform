import AuthLayout from '@/components/auth/AuthLayout'
import StudentForgotPasswordForm from '@/components/auth/StudentForgotPasswordForm'

export default function StudentForgotPasswordPage() {
    return (
        <AuthLayout
            title="Reset Your Password"
            subtitle="We'll send you instructions to reset your password"
            userType="student"
        >
            <StudentForgotPasswordForm />
        </AuthLayout>
    )
}
