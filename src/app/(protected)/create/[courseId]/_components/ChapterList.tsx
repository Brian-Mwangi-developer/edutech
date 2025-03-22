import React from 'react'
import {Clock,CircleCheckBig} from 'lucide-react'
// import EditChapters from "@/app/create-course/[courseId]/_components/Editchapters";
const ChapterList = ({course}:any) => {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-2xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.Chapters.map((chapter:any,index:number)=>(
          <div key={index} className="border p-5 rounded-lg mb-2 flex items-center justify-between">
            <div className="flex gap-5 items-center ">
              <h2 className="bg-blue-500 flex-none h-10 w-10 text-white rounded-full text-center p-2">{index+1}</h2>
              <div>
                <h2 className="font-medium text-lg">{chapter?.ChapterName}</h2>
                <p className="text-md text-gray-600">{chapter?.About}</p>
                <p className="flex gap-2 text-blue-500 items-center"><Clock/>{chapter?.Duration}</p>
              </div>
            </div>
            <CircleCheckBig className="text-3xl flex-none text-gray-400"/>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ChapterList
