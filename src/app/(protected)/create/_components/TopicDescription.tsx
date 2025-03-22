"use client"
import React, {useContext} from 'react'
import {UserInputContext} from "@/context/userInputContext";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";

const TopicDescription = () => {
  const {userCourseInput, setUserCourseInput}= useContext(UserInputContext);
  const handleInputchange=(fieldName:string,value:string)=>{
    setUserCourseInput((prev:any)=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div>
      {/* Topic*/}
      <div className="mx-20 lg:mx-44">
        <div className="mt-5">
          <label> Write the topic for which you want content to be generated for(python, typescript ... ) </label>
          <Input placeholder="Topic"
                 defaultValue={userCourseInput?.topic}
                 onChange={(e)=> handleInputchange('topic',e.target.value)}/>
        </div>
        <div className="mt-5">
          <label >Tell us more about your course, what you want to be included</label>
          <Textarea placeholder='Course description'
                    defaultValue={userCourseInput?.description}
                    onChange={(e)=> handleInputchange('description',e.target.value)}/>
        </div>
      </div>

    </div>
  )
}
export default TopicDescription
