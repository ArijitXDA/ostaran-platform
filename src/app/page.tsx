import Link from 'next/link'
import './home.css'

export default function HomePage() {
    return (
        <div className="home-container">
            <div className="home-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="home-content">
                <header className="home-header">
                    <div className="logo">
                        <span className="logo-text">oStaran</span>
                    </div>
                </header>

                <main className="home-main">
                    <div className="hero-section">
                        <h1 className="hero-title">
                            Master the Future of
                            <span className="text-gradient"> Technology</span>
                        </h1>
                        <p className="hero-subtitle">
                            Learn AI, Agentic AI, Vibe Coding, and Business Intelligence from industry experts.
                            Transform your career with cutting-edge skills.
                        </p>

                        <div className="cta-section">
                            <h2 className="cta-title">Get Started Today</h2>

                            <div className="auth-cards">
                                <div className="auth-card glass-card">
                                    <div className="card-icon">🎓</div>
                                    <h3>For Students</h3>
                                    <p>Explore courses and start learning</p>
                                    <div className="card-actions">
                                        <Link href="/auth/student/signup" className="btn btn-primary">
                                            Sign Up
                                        </Link>
                                        <Link href="/auth/student/signin" className="btn btn-secondary">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>

                                <div className="auth-card glass-card">
                                    <div className="card-icon">👨‍🏫</div>
                                    <h3>For Instructors</h3>
                                    <p>Share your knowledge and earn</p>
                                    <div className="card-actions">
                                        <Link href="/auth/instructor/signup" className="btn btn-primary">
                                            Sign Up
                                        </Link>
                                        <Link href="/auth/instructor/signin" className="btn btn-secondary">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="home-footer">
                    <p>&copy; 2024 oStaran. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}
