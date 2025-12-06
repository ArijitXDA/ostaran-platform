import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import './dashboard.css'

export default async function StudentDashboard() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/student/signin')
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Student Dashboard</h1>
                    <div className="user-info">
                        <span className="user-name">{profile?.full_name || 'Student'}</span>
                        <span className="user-email">{profile?.email}</span>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="welcome-card glass-card">
                    <h2>Welcome back, {profile?.full_name?.split(' ')[0]}! 👋</h2>
                    <p>Your learning journey starts here.</p>
                </div>

                <div className="dashboard-grid">
                    <div className="stat-card glass-card">
                        <div className="stat-icon">📚</div>
                        <div className="stat-content">
                            <h3>Enrolled Courses</h3>
                            <p className="stat-number">0</p>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                            <h3>Hours Learned</h3>
                            <p className="stat-number">0</p>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-content">
                            <h3>Completed</h3>
                            <p className="stat-number">0</p>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-content">
                            <h3>Certificates</h3>
                            <p className="stat-number">0</p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2>Continue Learning</h2>
                    <div className="empty-state glass-card">
                        <p>No courses in progress</p>
                        <a href="/courses" className="btn btn-primary">Browse Courses</a>
                    </div>
                </div>

                <div className="section">
                    <h2>Recommended for You</h2>
                    <div className="empty-state glass-card">
                        <p>Start your learning journey by enrolling in a course</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
