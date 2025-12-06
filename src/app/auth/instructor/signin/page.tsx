import AuthLayout from '@/components/auth/AuthLayout'
import InstructorSignInForm from '@/components/auth/InstructorSignInForm'

export default function InstructorSignInPage() {
    return (
        <AuthLayout
            title="Instructor Portal"
            subtitle="Sign in to manage your courses"
            userType="instructor"
        >
            <InstructorSignInForm />
        </AuthLayout>
    )
}
