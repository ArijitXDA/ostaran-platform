import AuthLayout from '@/components/auth/AuthLayout'
import StudentSignInForm from '@/components/auth/StudentSignInForm'

export default function StudentSignInPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue your learning"
            userType="student"
        >
            <StudentSignInForm />
        </AuthLayout>
    )
}
