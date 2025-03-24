import {AssemblyAI} from "assemblyai";
import {NextRequest, NextResponse} from "next/server";

const assemblyAi= new AssemblyAI({apiKey:process.env.ASSEMBLYAI_API_KEY!})

export async function GET(req:NextRequest){
  const token = await assemblyAi.realtime.createTemporaryToken({expires_in:3600})
  return NextResponse.json(token)
}