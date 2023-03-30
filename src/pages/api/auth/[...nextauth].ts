import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"

export default NextAuth({
    providers: [
        AppleProvider({
            clientId: process.env.NEXT_PUBLIC_APPLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_APPLE_SECRET,
        }),
    ],
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) { return true },
        // async redirect({ url, baseUrl }) { return baseUrl },
        async session({session, token, user}) {
            console.log(session, token, user);
            return session
        },
        async jwt({token, user, account, profile, isNewUser}) {
            console.log(token, user, account, profile, isNewUser);
            return token
        }
    },
    cookies: {
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: 'none',
                path: '/',
                secure: true,
            },
        },
    }
})
