import React from 'react'
import './auth-layout.css'

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle?: string
    userType: 'student' | 'instructor'
}

export default function AuthLayout({ children, title, subtitle, userType }: AuthLayoutProps) {
    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="auth-content">
                <div className="auth-header">
                    <div className="logo">
                        <span className="logo-text">oStaran</span>
                        <span className="logo-badge">{userType === 'instructor' ? 'Instructor' : 'Student'}</span>
                    </div>

                    <div className="auth-title-section">
                        <h1 className="auth-title">{title}</h1>
                        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
                    </div>
                </div>

                <div className="auth-card glass-card">
                    {children}
                </div>

                <div className="auth-footer">
                    <p>&copy; 2024 oStaran. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
