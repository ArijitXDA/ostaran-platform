import AuthLayout from '@/components/auth/AuthLayout'
import InstructorSignUpForm from '@/components/auth/InstructorSignUpForm'

export default function InstructorSignUpPage() {
    return (
        <AuthLayout
            title="Become an Instructor"
            subtitle="Share your knowledge and inspire learners worldwide"
            userType="instructor"
        >
            <InstructorSignUpForm />
        </AuthLayout>
    )
}
