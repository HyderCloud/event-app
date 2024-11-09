import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
export const {
    auth,
    signIn,
    handlers: {GET,POST}} = NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
    
            async authorize(credentials) {
              try {
                const response = await axios.post('http://localhost:9020/auth', {
                  email: credentials?.username,
                  password: credentials?.password,
                });
    
                if (response.data.error === 'invalid credential') {
                  console.error("Invalid credentials provided");
                  return null; // Return null for failed login attempt
                }
                cookies().set('user', response?.data?.token, { secure: true })
                cookies().set('store', response?.data?.store, { secure: true })
                const user = {
                  id: response.data.id,
                  name: response.data.name,
                  password: credentials.password
                };
                
                return user
              } catch (error) {
                // Log detailed error information
                console.error("Error in authorize function:", error.message);
                console.error("Stack trace:", error.stack);
                return null; // Returning null indicates a failed sign-in attempt
              }
            },
          })
],
secret: process.env.JWT_SECRET,
pages:{
    signIn: '/signin',
}
})