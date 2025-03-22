import React from 'react'

const CourseIdPublishedLayout =async ({children,params}:{children: React.ReactNode;params: {courseId: string}}) => {

  const {courseId} = await params
  return (
    <div>
      {children}
    </div>
  )
}
export default CourseIdPublishedLayout
