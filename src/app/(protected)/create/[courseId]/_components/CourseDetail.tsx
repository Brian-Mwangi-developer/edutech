import React from 'react'
import {ChartNoAxesColumnIncreasing,Clock,BookOpenText,Youtube} from 'lucide-react'
const CourseDetail = ({course}:any) => {
  const duration = course?.courseOutput?.Duration;
  const hoursOnly = duration?.split(' ')[0];
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5" >
        <div className="flex gap-2">
          <ChartNoAxesColumnIncreasing className="text-4xl text-blue-500"/>
          <div>
            <h2 className="text-sm text-gray-600">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Clock className="text-4xl text-blue-500"/>
          <div>
            <h2 className="text-sm text-gray-600">Duration</h2>
            <h2 className="font-medium text-lg">{hoursOnly} hours</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <BookOpenText className="text-4xl text-blue-500"/>
          <div>
            <h2 className="text-sm text-gray-600">No of Chapters</h2>
            <h2 className="font-medium text-lg">{course?.courseOutput?.NoOfChapters}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Youtube className="text-4xl text-blue-500"/>
          <div>
            <h2 className="text-sm text-gray-600">Video Included</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CourseDetail
