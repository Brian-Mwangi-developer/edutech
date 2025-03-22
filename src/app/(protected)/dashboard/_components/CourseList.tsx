"use client"
import React, {useEffect,useState} from 'react'
import {useUser} from "@clerk/nextjs";
import {GetAllCourse} from "@/app/actions/getAllCoursesaction";
import CourseCard from "@/app/(protected)/dashboard/_components/CourseCard";

const CourseList = () => {
  const {user} = useUser();
  const [courseList,setCourseList]= useState<any>([])

  useEffect(() => {
    const fetchAllCourses = async () => {
      if (user) {
        const courses = await GetAllCourse();
        setCourseList(courses);
        console.log(courses);
        console.log("Course List", courseList);
      }
    };
    fetchAllCourses();
  }, [user]);
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-10">My AI Courses</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        {courseList?.length>0 ? courseList?.map((course:any,index:number)=>(
          <CourseCard course={course} key={index}/>
        )):
            [1,2,3,4,5].map((item,index)=>(
              <div key={index} className="w-full bg-slate-400 animate-pulse rounded-lg h-[200px]">
              </div>
            ))
        }
      </div>
    </div>
  )
}
export default CourseList
