import AuthLayout from '@/components/auth/AuthLayout'
import StudentSignUpForm from '@/components/auth/StudentSignUpForm'

export default function StudentSignUpPage() {
    return (
        <AuthLayout
            title="Create Student Account"
            subtitle="Start your learning journey with oStaran"
            userType="student"
        >
            <StudentSignUpForm />
        </AuthLayout>
    )
}
