import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {Puzzle} from 'lucide-react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
// import EditCourseBasicInfo from "@/app/create-course/[courseId]/_components/EditCourseBasicInfo";
// import {storage} from '@/configs/firebaseConfig'
// import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
// import {db} from "@/configs/db";
// import {CourseList} from "@/configs/schema";
// import {eq} from "drizzle-orm";
const CourseBasicInfo = ({course, edit=true}:{course:any, edit:boolean}) => {
  const [ selectedFile,setSelectedFile]=useState()

  useEffect(() => {
    if(course){
      setSelectedFile(course?.courseImage)
    }
  }, [course]);
  // const onFileSelected=async(event)=>{
  //   const file = event.target.files[0]
  //   setSelectedFile(URL.createObjectURL(file))
  //   const fileName = Date.now()+'.jpg'
  //   const storageRef = ref(storage,'ai-course/'+fileName)
  //   await uploadBytes(storageRef,file).then((snapshot)=>{
  //     console.log('Upload file completed')
  //   }).then(resp=>{
  //     getDownloadURL(storageRef).then(async(downloadUrl)=>{
  //       console.log("Download Url",downloadUrl)
  //       await db.update(CourseList).set({
  //         courseImage:downloadUrl
  //       }).where(eq(CourseList.id,course?.id))
  //     })
  //   })
  //
  // }
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="flex flex-col">
            <span className="font-bold text-xl">{course?.courseOutput?.CourseName}</span>
            {/*<EditCourseBasicInfo course={course}/>*/}
          </div>
          <p className="text-sm text-gray-600 mt-3 ">{course?.courseOutput?.Description}</p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-blue-500"><Puzzle/>{course?.category}</h2>
          {!edit &&<Link href={'/course/'+course?.id+'/start'}>
            <Button className="w-full mt-5">Start</Button>
          </Link>}

        </div>
        <div>
          <label htmlFor='upload-image'>
            <Image src={selectedFile? selectedFile:'/placeholder.jpg'} alt="Placeholder" width={700} height={500} className=" w-4/4 h-[300px] object-cover cursor-pointer rounded-xl"/>
          </label>
          {edit && <input type="file" id="upload-image" className="opacity-0"/>}
        </div>
      </div>

    </div>
  )
}
export default CourseBasicInfo
