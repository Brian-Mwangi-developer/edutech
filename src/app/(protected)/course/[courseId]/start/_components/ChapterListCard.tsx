import React from 'react'
import {Clock} from "lucide-react";

const ChapterListCard = ({chapter,index}: {chapter:any,index:number}) => {
  return (
    <div className="grid grid-cols-5 p-3 border-b" key={index}>
    <div>
      <h2 className="p-1 bg-primary w-8 h-8 text-white rounded-full text-center">{index+1}</h2>
    </div>
      <div className="col-span-4">
        <h2 className="font-medium">{chapter.ChapterName}</h2>
        <h2 className="flex items-center gap-2 text-sm text-primary"><Clock/>{chapter.Duration}</h2>
      </div>
    </div>
  )
}
export default ChapterListCard
