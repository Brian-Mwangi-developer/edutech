"use client";
import React, { useState, useEffect } from 'react';
import { useParams,useRouter } from 'next/navigation';
import LoadingDialog from "@/components/LoadingDialog";
import { useUser } from "@clerk/nextjs";

import { GetCourse } from "@/app/actions/getCourse-action";
import CourseBasicInfo from "@/app/(protected)/create/[courseId]/_components/CoursebasicInfo";
import { Button } from "@/components/ui/button";
import CourseDetail from "@/app/(protected)/create/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/(protected)/create/[courseId]/_components/ChapterList";
import {SaveChapterLayoutInDb} from "@/app/actions/saveChapterContentaction";
//@ts-ignore
import uuid4 from 'uuid4'

export default function Page() {
  const { courseId } = useParams();
  const { user } = useUser();
  const [course, setCourse] = useState<any>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      const fetchCourse = async () => {
        setLoading(true);
        const courseData = await GetCourse(String(courseId));
        setCourse(courseData);
        setLoading(false);
      };
      fetchCourse();
    }
  }, [courseId, user]);

  const GenerateChapterContent =()=>{
    setLoading(true)
    const chapters = course?.courseOutput.Chapters;
    chapters.forEach(async(chapter:any,index:number)=>{
      const PROMPT='Explain the concept in Detail on Topic:'+course?.name+', Chapter:'+chapter.ChapterName+', in JSON Format with field as title, explanation of the given chapter in details not less than 1 paragraph of 5 described lines,Code Example (Cod field in <precode> format) if applicable'
      // console.log(PROMPT)
      try{
        const result= await fetch('/api/detail-gen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: PROMPT }),
        })
        const responseData = await result.json();
        //Generate Video url
        let videoId= ''
        const query=course?.name+':'+chapter?.ChapterName
        const response = await fetch(`/api/getVideos?query=${query}`);
        const data = await response.json()

        const id = uuid4()

        videoId = data[0]?.id?.videoId
        const ChapterData={
          id:courseId,
          chapterId:chapter?.chapterId,
          course:course,
          content:responseData,
          videoId:videoId
        }
        //Save Chapter Content + video Url
        await SaveChapterLayoutInDb(ChapterData)
        setLoading(false)

        router.replace('/create/'+courseId+"/finish")
      }catch(e){
        setLoading(false)
        console.log(e)
      }


    })
  }
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      {course ? (
        <>
          <h2 className="font-bold text-center text-2xl">
            {course.courseOutput.CourseName}
          </h2>
          <CourseBasicInfo course={course} />
          <CourseDetail course={course}/>
          <ChapterList course={course}/>
          <Button className="my-10" onClick={GenerateChapterContent}>Generate Course Content</Button>
        </>
      ) : (
        <LoadingDialog loading={loading} />
      )}
    </div>
  );
}
