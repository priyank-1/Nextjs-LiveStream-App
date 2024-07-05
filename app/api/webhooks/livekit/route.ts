import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
   
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    
);

export async function POST( req: Request , res : Response) {
    try {
        const body = await req.text();
        const headerPayload = headers();
        const authorization = headerPayload.get("Authorization");
        
        if (!authorization) {
            return new Response("Error occurred -- no authorization header", { status: 400 });
        }
        
        const event = await receiver.receive(body, authorization);

        
        

        if (event.event === 'ingress_started') {
            await db.stream.update({
                where: {
                    ingressId: event.ingressInfo?.ingressId,
                },
                data: {
                    isLive: true,
                },
            });
        } 
        if (event.event === 'ingress_ended') {
            await db.stream.update({
                where: {
                    ingressId: event.ingressInfo?.ingressId,
                },
                data: {
                    isLive: false,
                },
            });
        }

        return new Response("Event processed successfully", { status: 200 });
    } catch (error) {
        console.error("Error processing event:", error);
        return new Response("Error occurred -- internal server error", { status: 500 });
    }
}
