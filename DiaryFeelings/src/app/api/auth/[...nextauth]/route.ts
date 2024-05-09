import { User } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    secret: 'xvdZs7wYWGQ8MsJx0LqD', //->이 부분 추후 .env에 저장하여 사용하도록 바꿔야 함
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: '아이디',
                    type: 'text',
                    placeholder: '아이디 입력',
                },
                password: {
                    label: '비밀번호',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch(
                        `http://43.202.125.125:8000/dj-rest-auth/login/`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: credentials?.username,
                                password: credentials?.password,
                            }),
                        },
                    )
                    const result = await res.json()
                    if (result.user) {
                        return {
                            accessToken: result.access,
                            refreshToken: result.refresh,
                            user: {
                                pk: result.user.pk,
                                username: result.user.username,
                            },
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }: any) {
            // session.user = token as any
            // session.accessToken = token.accessToken
            // session.refreshToken = token.refreshToken
            // session.user.id = token.user.pk
            // session.user.username = token.user.username
            return { ...session, ...token }
        },
    },
    pages: {
        // 로그인 페이지를 signin으로 함.
        signIn: '/signin',
    },
})

export { handler as GET, handler as POST }
