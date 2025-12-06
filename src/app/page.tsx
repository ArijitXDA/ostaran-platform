import Link from 'next/link'
import './home.css'

export default function Home() {
    return (
        <div className="homepage">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo">
                        <Link href="/">oStaran</Link>
                    </div>
                    <div className="nav-links">
                        <Link href="/courses">Courses</Link>
                        <Link href="/for-business">For Business</Link>
                        <Link href="/about">About</Link>
                    </div>
                    <div className="nav-actions">
                        <Link href="/auth/student/signin" className="btn-text">Sign In</Link>
                        <Link href="/auth/student/signup" className="btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Master Agentic AI & Transform Your Career
                        </h1>
                        <p className="hero-subtitle">
                            Learn cutting-edge AI, Vibe Coding, and Business Intelligence from industry experts.
                            Build the skills that matter in 2025 and beyond.
                        </p>
                        <div className="hero-actions">
                            <Link href="/courses" className="btn-primary btn-large">
                                Explore Courses
                            </Link>
                            <Link href="/for-business" className="btn-secondary btn-large">
                                For Business
                            </Link>
                        </div>
                        <p className="hero-trust">
                            Trusted by 10,000+ learners worldwide
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="trust-section">
                <div className="container">
                    <div className="trust-stats">
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Expert Courses</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">10,000+</div>
                            <div className="stat-label">Active Learners</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">95%</div>
                            <div className="stat-label">Success Rate</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Expert Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audiences */}
            <section className="audiences-section">
                <div className="container">
                    <h2 className="section-title">Who We Serve</h2>
                    <p className="section-subtitle">
                        Tailored learning paths for every professional journey
                    </p>
                    <div className="audience-grid">
                        <div className="audience-card">
                            <div className="audience-icon">👔</div>
                            <h3>Business Leaders</h3>
                            <p>Drive AI transformation in your organization. Learn to implement AI strategies that deliver measurable business results.</p>
                            <Link href="/for-business" className="card-link">Learn More →</Link>
                        </div>
                        <div className="audience-card">
                            <div className="audience-icon">💼</div>
                            <h3>Working Professionals</h3>
                            <p>Advance your career with in-demand AI skills. Stay competitive in the age of artificial intelligence.</p>
                            <Link href="/courses" className="card-link">Explore Courses →</Link>
                        </div>
                        <div className="audience-card">
                            <div className="audience-icon">🎓</div>
                            <h3>Students</h3>
                            <p>Build a future-proof career in AI. Get hands-on experience with the technologies shaping tomorrow.</p>
                            <Link href="/auth/student/signup" className="card-link">Start Learning →</Link>
                        </div>
                        <div className="audience-card">
                            <div className="audience-icon">🚀</div>
                            <h3>Entrepreneurs</h3>
                            <p>Launch AI-powered ventures. Turn innovative ideas into successful businesses with cutting-edge AI knowledge.</p>
                            <Link href="/courses" className="card-link">Get Started →</Link>
                        </div>
                        <div className="audience-card">
                            <div className="audience-icon">🔬</div>
                            <h3>Researchers</h3>
                            <p>Stay at the forefront of AI innovation. Explore the latest research and methodologies in agentic AI.</p>
                            <Link href="/courses" className="card-link">Explore Research →</Link>
                        </div>
                        <div className="audience-card">
                            <div className="audience-icon">📚</div>
                            <h3>Academicians</h3>
                            <p>Enhance your teaching with cutting-edge AI knowledge. Bring real-world AI applications to your classroom.</p>
                            <Link href="/auth/instructor/signup" className="card-link">Become an Instructor →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Categories */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explore Our Courses</h2>
                    <p className="section-subtitle">
                        Master the technologies driving the future
                    </p>
                    <div className="categories-grid">
                        <div className="category-card">
                            <div className="category-icon">🤖</div>
                            <h3>Agentic AI</h3>
                            <p className="category-count">12 courses</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">🧠</div>
                            <h3>Machine Learning</h3>
                            <p className="category-count">15 courses</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">💻</div>
                            <h3>Vibe Coding</h3>
                            <p className="category-count">8 courses</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">📊</div>
                            <h3>Business Intelligence</h3>
                            <p className="category-count">10 courses</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">📈</div>
                            <h3>Data Science</h3>
                            <p className="category-count">14 courses</p>
                        </div>
                        <div className="category-card">
                            <div className="category-icon">🏢</div>
                            <h3>AI for Business</h3>
                            <p className="category-count">9 courses</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Paths */}
            <section className="learning-paths-section">
                <div className="container">
                    <h2 className="section-title">Featured Learning Paths</h2>
                    <p className="section-subtitle">
                        Structured programs to achieve your goals
                    </p>
                    <div className="paths-grid">
                        <div className="path-card">
                            <div className="path-badge">Most Popular</div>
                            <h3>AI for Business Leaders</h3>
                            <p>Master AI strategy, implementation, and ROI measurement for enterprise transformation.</p>
                            <ul className="path-features">
                                <li>6 courses</li>
                                <li>3 months</li>
                                <li>Certificate included</li>
                            </ul>
                            <Link href="/courses" className="btn-primary">View Path</Link>
                        </div>
                        <div className="path-card">
                            <h3>Full-Stack AI Developer</h3>
                            <p>Build end-to-end AI applications with modern frameworks and deployment strategies.</p>
                            <ul className="path-features">
                                <li>8 courses</li>
                                <li>4 months</li>
                                <li>Portfolio projects</li>
                            </ul>
                            <Link href="/courses" className="btn-primary">View Path</Link>
                        </div>
                        <div className="path-card">
                            <h3>Data-Driven Decision Making</h3>
                            <p>Transform data into insights with BI tools, analytics, and visualization techniques.</p>
                            <ul className="path-features">
                                <li>5 courses</li>
                                <li>2 months</li>
                                <li>Hands-on projects</li>
                            </ul>
                            <Link href="/courses" className="btn-primary">View Path</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose oStaran */}
            <section className="benefits-section">
                <div className="container">
                    <h2 className="section-title">Why Choose oStaran</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">👨‍🏫</div>
                            <h3>Expert-Led Courses</h3>
                            <p>Learn from industry leaders and AI practitioners with real-world experience in cutting-edge technologies.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🛠️</div>
                            <h3>Hands-On Projects</h3>
                            <p>Build real-world AI applications and create a portfolio that showcases your skills to employers.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🎯</div>
                            <h3>Career Support</h3>
                            <p>Get certified, receive career guidance, and access our network of hiring partners to advance your career.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Transform Your Career with AI?</h2>
                        <p>Join thousands of learners mastering the future of technology</p>
                        <div className="cta-actions">
                            <Link href="/auth/student/signup" className="btn-primary btn-large">
                                Start Learning Today
                            </Link>
                            <span className="cta-badge">7-day free trial</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <h4>oStaran</h4>
                            <p>Empowering the next generation of AI professionals</p>
                        </div>
                        <div className="footer-col">
                            <h4>Courses</h4>
                            <Link href="/courses">Agentic AI</Link>
                            <Link href="/courses">Machine Learning</Link>
                            <Link href="/courses">Vibe Coding</Link>
                            <Link href="/courses">Business Intelligence</Link>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <Link href="/about">About Us</Link>
                            <Link href="/for-business">For Business</Link>
                            <Link href="/careers">Careers</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                        <div className="footer-col">
                            <h4>Resources</h4>
                            <Link href="/blog">Blog</Link>
                            <Link href="/help">Help Center</Link>
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 oStaran. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
