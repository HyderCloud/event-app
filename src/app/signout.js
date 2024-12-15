import { signOut } from '@/src/app/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function POST(request) {
try {
    const body = await request.json();
    const acknowledge = body.ack;
    cookies().delete('user');
    cookies().delete('store');
    console.log("🚀 ~ POST ~ acknowledge:", acknowledge);
    await signOut({ redirect: false });

    
    return new Response(JSON.stringify({ acknowledge: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
    
} catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    
}
    
}