import React from 'react'
import Image from 'next/image'
import {BookOpen} from "lucide-react";
import Link from "next/link";
const CourseCard = ({course}:{course:any}) => {
  return (
    <div className="shadow-sm rounded-lg flex flex-col gap-1 border p-2 border-gray-300
    hover:scale-105 transition-all cursor-pointer mt-4">
      <Link href={'/course/'+course?.id}>
      <Image src={course.courseImage} alt="Image" width={100} height={100} className="w-full h-[250px] rounded-lg object-cover"/>
      <div className="p-2">
        <h2 className="font-medium text-lg">{course?.courseOutput.CourseName}</h2>
        <p className="text-sm text-gray-500">{course?.category}</p>
        <div className="flex items-center justify-between my-1">
          <h2 className="flex gap-2 items-center text-md bg-blue-100 text-primary rounded-lg p-1">
            <BookOpen/>
            {course?.courseOutput?.NoOfChapters} Chapters</h2>
          <h2 className="text-sm bg-blue-100 rounded-lg p-2 text-primary">Level: {course?.courseOutput?.Level}</h2>
        </div>
      </div>
      </Link>
    </div>
  )
}
export default CourseCard
