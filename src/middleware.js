import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const { response, user } = await updateSession(request)
    const path = request.nextUrl.pathname

    if (path.startsWith('/admin')) {
        // 1. Unauthenticated user trying to access secure admin pages
        //    (Allow access to login page specifically)
        if (!user && path !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // 2. Authenticated user trying to access login page
        //    (Redirect to dashboard)
        if (user && path === '/admin/login') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
