"use client";


import React from 'react'
import {useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Discussions} from "@/lib/discussiontypes";
import UserInputDialog from "@/app/(protected)/discussions/_components/UserInputDialog";

interface discussionProps {
  icon: string;
  description: string;
  prompt: string;
  summaryPrompt: string;
  name: string;
}

const HeroSection = () => {
  const { user } = useUser();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="font-medium text-gray-500">My Discussion</h2>
          <h2 className="text-xl font-medium">Improve your skills {user?.fullName} with AI Discussions</h2>
        </div>
        <Button>Profile</Button>
      </div>
      <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 mt-10">
        {Discussions.map((option,index)=>(
            <div key={index} className="p-3  flex flex-col justify-center items-center">
              <UserInputDialog Discussion={option}>
                <div key={index} className="p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center">
                  <Image src={option.icon} alt={option.name} width={150} height={150} className="h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all"/>
                  <h2 className="mt-2">{option.name}</h2>
                </div>
              </UserInputDialog>
            </div>
        ))}
      </div>
      </div>
    </div>
  )
}
export default HeroSection
