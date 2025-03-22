"use client"
import React, {use, useEffect, useState} from 'react'
import {useUser} from "@clerk/nextjs";
import {Copy} from 'lucide-react'
import {useParams, useRouter} from "next/navigation";

import {GetCourse} from "@/app/actions/getCourse-action";
import CourseBasicInfo from "@/app/(protected)/create/[courseId]/_components/CoursebasicInfo";

const FinishScreen = () => {
  const {user} = useUser()
  const { courseId } = useParams();
  const [course,setCourse] = useState<any>([])
  const router = useRouter();

  useEffect(() => {
    if (user && courseId) {
      const fetchCourse = async () => {
        // setLoading(true);
        const courseData = await GetCourse(String(courseId));
        setCourse(courseData);
      };
      fetchCourse();
    }
  }, [courseId, user]);


  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className='text-center font-bold text-2xl my-3 text-blue-500'>Congrats! your course is Ready</h2>
      <CourseBasicInfo course={course}/>
      <h2 className="mt-3">Course URl:</h2>
      <h2 className="text-center text-gray-400 border p-2 rounded-lg flex gap-5 items-center">{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course.id}
      <Copy className="h-5 w-5 cursor-pointer" onClick={async ()=> await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"/course/view/"+course.id)}/></h2>

    </div>
  )
}
export default FinishScreen
