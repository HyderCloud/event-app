"use server"
import { signIn } from "@/src/app/credential"
import { AuthError } from "next-auth"

export async function loginAction(formData){
    try {     
        await signIn("credentials", 
            {
            username: formData.username,
            password: formData.password,
            redirectTo: '/'
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                return {error: "invalid credential"}
                default:
                    return {error: 'unknown error found'}
            }
        }
        throw error;
    }
        
}