"use client"
import React, {useEffect, useState} from 'react'
import {useUser} from "@clerk/nextjs";
import {GetCourse} from "@/app/actions/getCourse-action";
import {useParams} from "next/navigation";
import ChapterListCard from "@/app/(protected)/course/[courseId]/start/_components/ChapterListCard";
import ChapterContent from "@/app/(protected)/course/[courseId]/start/_components/ChapterContent";
import {GetCourseChapters} from "@/app/actions/getCourseChaptersaction";
const CourseStart = () => {
  const {user} = useUser();
  const {courseId } = useParams();
  const [selectedChapter,setSelectedChapter]= useState<any>()
  const [course,setCourse]= useState<any>([]);
  const [chapterContent,setChapterContent] = useState<any>()

  const GetSelectedChapterContent=async({chapterId,courseId}:{chapterId:string,courseId:string})=>{
    const result =await GetCourseChapters({courseId,chapterId})
    setChapterContent(result[0])
  }

  useEffect(() => {
    const fetchAllCourses = async () => {
      if (user) {
        const MatchedCourse = await GetCourse(String(courseId));
        setCourse(MatchedCourse);
        GetSelectedChapterContent({chapterId:'0',courseId:course?.id})
      }
    };
    fetchAllCourses();
  }, [user]);
  return (
    <div>
      {/*Chapter list Side Bar*/}
      <div className=" fixed md:w-72 hidden md:block h-screen border-r gap-3 shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-3 text-white">{course?.courseOutput?.CourseName}</h2>
        <div>
          {course?.courseOutput?.Chapters.map((chapter:any,index:any)=>(
            <div key={index} className={`cursor-pointer hover:bg-blue-50
            ${selectedChapter?.ChapterName === chapter?.ChapterName && 'bg-blue-100'}`}
                 onClick={()=> {setSelectedChapter(chapter)
                 GetSelectedChapterContent({chapterId:index,courseId:course?.id})}}>
              <ChapterListCard chapter={chapter} index={index}/>
            </div>
          ))}
        </div>
      </div>
    {/*  Content Div*/}
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent}/>
      </div>
    </div>
  )
}
export default CourseStart
