import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'oStaran - Learn AI, Agentic AI, Vibe Coding & More',
    description: 'Premium online learning platform for AI, Agentic AI, Vibe Coding, and Business Intelligence courses',
    keywords: ['AI courses', 'Agentic AI', 'Vibe Coding', 'BI courses', 'online learning'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
