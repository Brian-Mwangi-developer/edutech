"use client"
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { CoachingExpert } from "@/lib/discussiontypes"
import { api } from "@/trpc/react"
import { RealtimeTranscriber } from "assemblyai"
import { getToken } from "@/app/actions/getTokensactions"
import { UpdateDiscussionConversation } from "@/app/actions/createDiscussionRoomaction"
import ChatBox from "@/app/(protected)/discussions/[roomId]/_components/ChatBox"
import {AIModelAzure, ConvertTextToSpeech} from "@/lib/ai-response";

const RoomIdPage = () => {
  const { roomId } = useParams()
  const [transcribe, setTranscribe] = useState<string>("")
  const { data } = api.discussionRoom.getDiscussionRoom.useQuery({ id: String(roomId) })
  const DiscussionRoomData = data
  const [expert, setExpert] = useState<any>()
  const [enableMic, setEnableMic] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string|null>()
  const [imageSrc, setImageSrc] = useState("/t2.jpg")
  const recorder = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const realtimeTranscriber = useRef<any>(null)
  let texts: any = {}
  let silenceTimeout: any

  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Hi, I am your coaching expert. How can I help you today?"
    },
    {
      role: 'user',
      content: "Hi, I am looking for coaching in {user_topic}."
    }
  ])

  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert = CoachingExpert.find(item => item.name === DiscussionRoomData.expertName)
      if (!Expert) return
      setImageSrc(Expert.avatar)
      setExpert(Expert)
    }
  }, [DiscussionRoomData])

  const connectToServer = async () => {
    setEnableMic(true)
    setLoading(true)

    // Dynamically import RecordRTC when needed
    //@ts-ignore
    const RecordRTC = (await import("recordrtc")).default

    realtimeTranscriber.current = new RealtimeTranscriber({
      token: await getToken(),
      sampleRate: 16_000
    })

    if (realtimeTranscriber.current) {
      realtimeTranscriber.current.on('transcript', async (transcript: any) => {
        console.log("Transcript",transcript)
        if (transcript.message_type === 'FinalTranscript') {
          setConversation(prev => [...prev, {
            role: "user",
            content: transcript.text
          }])
        }
        texts[transcript.audio_start] = transcript.text
        const keys = Object.keys(texts)
        keys.sort((a: any, b: any) => a - b)
        let msg = ''
        for (const key of keys) {
          if (texts[key]) {
            msg += `${texts[key]} `
          }
        }
        setTranscribe(msg)
      })
    }

    await realtimeTranscriber.current.connect()
    setLoading(false)

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          recorder.current = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm;codecs=pcm',
            recorderType: RecordRTC.StereoAudioRecorder,
            timeSlice: 250,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: async (blob:any) => {
              if (!realtimeTranscriber.current) return;
              // Reset the silence detection timer on audio input
              clearTimeout(silenceTimeout);

              const buffer = await blob.arrayBuffer();
              console.log(buffer)
              realtimeTranscriber.current.sendAudio(buffer);
              // Restart the silence detection timer
              silenceTimeout = setTimeout(() => {
                console.log('User stopped talking');
                // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
              }, 2000);
            },
          });
          recorder.current.startRecording();
        })
        .catch((err) => console.error(err));
    }
  }

  const disconnect = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    await realtimeTranscriber.current?.close()
    if (recorder.current) {
      recorder.current.stopRecording(() => {
        recorder.current = null
      })
    }
    setEnableMic(false)
    if (DiscussionRoomData) {
      // await UpdateDiscussionConversation({
      //   id: DiscussionRoomData.id,
      //   conversation: conversation
      // })
    }
    setLoading(false)
  }
  useEffect(() => {
    async function fetchData(){
      if(!DiscussionRoomData) return
      if(!conversation) return
      if(conversation[conversation.length-1]!.role ==='user'){
        const lastTwoMsg = conversation.slice(-2)
        const AiResponse = await  AIModelAzure(
          DiscussionRoomData.topic,
          DiscussionRoomData.coachingOption,
          lastTwoMsg,
          DiscussionRoomData.fileName!
          )

        const url = await  ConvertTextToSpeech(AiResponse.content,DiscussionRoomData.expertvoice)
        console.log(url)
        setAudioUrl(url)
        setConversation(prev=>[...prev,AiResponse])
      }
    }
    fetchData()
  }, [conversation]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">{DiscussionRoomData?.coachingOption}</h2>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="h-[80vh] bg-secondary border rounded-4xl flex flex-col relative items-center justify-center">
            <Image
              src={imageSrc}
              alt="Avatar"
              width={200}
              height={200}
              className="h-[80px] w-[80px] rounded-full object-cover animate-pulse"
            />
            <h2 className="text-gray-500">{expert?.name}</h2>
            {/*@ts-ignore*/}
            <audio src={audioUrl!} type="audio/mp3" autoPlay />
            <div className="p-5 px-10 rounded-lg absolute bottom-10 right-10">
              <UserButton />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            {!enableMic ? (
              <Button disabled={loading} onClick={connectToServer}>
                {loading && <Loader2Icon className="animate-spin mr-2" />}
                Connect
              </Button>
            ) : (
              <Button variant="destructive" disabled={loading} onClick={disconnect}>
                {loading && <Loader2Icon className="animate-spin mr-2" />}
                Disconnect
              </Button>
            )}
          </div>

        </div>
        <div>
          <ChatBox conversation={conversation} />
        </div>
        <h2>Transcribe{transcribe}</h2>
      </div>

    </div>
  )
}

export default RoomIdPage