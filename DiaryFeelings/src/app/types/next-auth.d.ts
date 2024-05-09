import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            pk: number
            username: string
        }
        accessToken: string | unknown
        refreshToken: string | unknown
    }
}
