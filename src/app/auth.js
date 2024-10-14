import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from "next-auth/providers/facebook";
import { redirect } from "next/navigation";

export const { auth, handlers: {GET,POST}, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
          })

    ], 
    callbacks: {
        async signIn({ account, profile }) {
            console.log(account, profile)
          if (account.provider === "google") {
            
            if(profile.email_verified && profile.email.endsWith("@gmail.com")){
              return true
            }
          }
          if (account.provider === "github") {
            return profile.email_verified && profile.email.endsWith("@gmail.com")
          }
          console.log("hello")
          return redirect('/personalcloud')
        },
      }
    ,secret: process.env.JWT_SECRET,
    pages:{
        signIn: '/sginin',
    }
})