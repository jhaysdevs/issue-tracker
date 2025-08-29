export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/issues/new',
    '/issues/edit',
    '/issues/edit/:id+',
    '/users',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}
