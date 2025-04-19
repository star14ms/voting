export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/votes/create',
    '/vote-items/create',
    '/vote-items',
  ],
} 