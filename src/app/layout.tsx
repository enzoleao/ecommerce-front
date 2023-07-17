'use client'
import { ContextsProvider } from '@/contexts/useContexts'
import { checkIsPublicRoute } from '../functions/check-routes'
import './globals.scss'
import { usePathname } from 'next/navigation'
import PrivateRoute from '@/components/PrivateRoute'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <ContextsProvider>
        <body suppressHydrationWarning={true} className="h-full w-full">
          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        </body>
      </ContextsProvider>
    </html>
  )
}
