"use client"
import React, {useEffect,useState} from 'react'
import {useParams} from "next/navigation";
import {GetCourse} from "@/app/actions/getCourse-action";
import {useUser} from "@clerk/nextjs";
import CourseBasicInfo from "@/app/(protected)/create/[courseId]/_components/CoursebasicInfo";
import CourseDetail from "@/app/(protected)/create/[courseId]/_components/CourseDetail";

const Page = () => {
  const { user } = useUser();
  const { courseId } = useParams();
  const [course,setCourse] = useState<any>([])

  useEffect(() => {
    if (user && courseId) {
      const fetchCourse = async () => {

        const courseData = await GetCourse(String(courseId));
        setCourse(courseData);
      };
      fetchCourse();
    }
  }, [courseId, user]);
  return (
    <div>
      <div className="px-10 p-10 md:px-20 lg:px-44">
        <CourseBasicInfo course={course} edit={false}/>
        <CourseDetail course={course}/>
      </div>

    </div>
  )
}
export default Page
