import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from "next-auth/providers/facebook";
import { redirect } from "next/navigation";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';




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
          const postFile = {
            email: profile.email,
            username: '',
            password: '',
            pr_image: profile.picture,
            provider: profile.provider
          }
          if (account.provider === "google") {
            if(profile.email_verified && profile.email.endsWith("@gmail.com")){
              try {
                const register = await axios.post('http://localhost:9020/googleauth',postFile)
                if( register){
                 cookies().set('user', register?.data?.token, { secure: true })
                 return true
                }
              } catch (error) {
                console.log(error)
              }

            }
          }
          if (account.provider === "github") {
            return profile.email_verified && profile.email.endsWith("@gmail.com")
          }
          const user = cookieStore.get('user')
          const decoded = jwt.verify(user, process.env.JWT_SECRET)
          console.log(decoded)
          return redirect(`/dashbord/${decoded}`)
        },
      }
    ,secret: process.env.JWT_SECRET,
    pages:{
        signIn: '/sginin',
    }
})