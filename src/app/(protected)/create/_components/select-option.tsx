import React, {useContext} from 'react'
import {UserInputContext} from "@/context/userInputContext";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";


const SelectOption = () => {
  const {userCourseInput, setUserCourseInput}= useContext(UserInputContext)

  const handleInputchange=(fieldName:string,value:string)=>{
    setUserCourseInput((prev:any)=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm"> Difficulty Level</label>
          <Select onValueChange={(value)=>handleInputchange('level',value)}
                  defaultValue={userCourseInput?.level}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm"> Course Duration</label>
          <Select onValueChange={(value)=>handleInputchange('duration',value)}
                  defaultValue={userCourseInput?.duration}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 hour">1 Hour</SelectItem>
              <SelectItem value="2 hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm"> Add  Video</label>
          <Select onValueChange={(value)=>handleInputchange('displayVideo',value)}
                  defaultValue={userCourseInput?.displayVideo}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">No of Chapters</label>
          <Input type="number" className="w-[300px]"
                 defaultValue={userCourseInput?.noOfchapter}
                 onChange={(event)=>handleInputchange('noOfchapter',event.target.value)}/>
        </div>
      </div>
    </div>
  )
}
export default SelectOption
