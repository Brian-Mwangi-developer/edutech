"use client"

import React from 'react'
import {useUser} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const AddCourse = () => {
  const {user} =  useUser()
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl">Welcome,
          <span className="font-bold">{" "}{user?.fullName}</span>
          <p className="text-sm text-gray-500 mt-10"> Create new Course with AI,Share with Friends and Learn Together</p>
        </h2>
      </div>
      <Link href={'/create'}>
        <Button className="bg-primary"> + Create AI Course</Button>
      </Link>
    </div>
  )
}
export default AddCourse
