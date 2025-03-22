"use client";

import React, {useState, useContext, useEffect} from 'react'
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {Blocks, ClipboardCheck, Lightbulb} from "lucide-react";
import {UserInputContext} from "@/context/userInputContext";
import SelectCategory from "@/app/(protected)/create/_components/select-category";
import {Button} from "@/components/ui/button";
import LoadingDialog from "@/components/LoadingDialog";
import TopicDescription from "@/app/(protected)/create/_components/TopicDescription";
import SelectOption from "@/app/(protected)/create/_components/select-option";
import {SaveCourseLayoutInDb} from "@/app/actions/SaveCourseLayoutaction";
const StepperOptions = [
  {
    id: 1,
    name: "Category",
    icon: <Blocks />
  },
  {
    id: 2,
    name: "Topic&Desc",
    icon: <Lightbulb />
  },
  {
    id: 3,
    name: "Options",
    icon: <ClipboardCheck />
  }
]


const CreateCourse = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const {userCourseInput, setUserCourseInput}= useContext<any>(UserInputContext)
  const [loading,setLoading] = useState(false)
  const router = useRouter();

  const checkStatus = () => {
    if(userCourseInput ?.length ==0 )
    {
      return true;
    }
    if(activeIndex == 0 &&(userCourseInput?.category?.length==0||userCourseInput?.category ==undefined)){
      return true
    }
    if(activeIndex == 1 &&(userCourseInput?.topic?.length ==0 || userCourseInput?.topic == undefined)){
      return true
    }
    if(activeIndex ==2 &&(userCourseInput?.level == undefined|| userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfchapter ==0)){
      return true
    }
  };
  const GenerateCourseLayout=async()=>{
    setLoading(true)
    const BASIC_PROMPT="Generate A course Tutorial on following detail with field as Course Name, description Along with ChapterName, about,Duration. ";
    const USER_INPUT_PROMPT='Category:'+userCourseInput?.category+',Topic:'+userCourseInput?.topic+',Level:'+userCourseInput?.level+',Duration:'+userCourseInput.duration+',NoOfChapters:'+userCourseInput?.noOfchapter+',In JSON format';
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT)
    const result = await fetch('/api/outline-gen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: FINAL_PROMPT }),
    })
    const responseData = await result.json();
    console.log(responseData);
    try {
      const courseId = await SaveCourseLayoutInDb(responseData, userCourseInput);
      router.replace(`/create/${courseId}`);
    } catch (error) {
      console.error("Error saving course layout:", error);
    }
    setLoading(false)
  }


  const nextStep = () => {
    if (activeIndex < StepperOptions.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }
  const previousStep =()=>{
    if(activeIndex > 0){
      setActiveIndex(activeIndex-1)
    }
  }
  useEffect(() => {
    console.log(userCourseInput)
  }, [userCourseInput]);

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-blue-500 font-bold">Create course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-blue-200 p-3 rounded-full text-white ${activeIndex >= index ? 'bg-blue-500' : ''}`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-blue-100 ${activeIndex >= index ? 'bg-blue-500' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Component */}
        {activeIndex ===0? <SelectCategory/>:activeIndex===1?<TopicDescription/>:<SelectOption/>}
        {/* Next Previous Button */}
        <div className="flex justify-between mt-10">
          <Button disabled={activeIndex===0} onClick={previousStep}>Previous</Button>
          {activeIndex < 2 &&<Button disabled={checkStatus()} onClick={nextStep}>Next</Button>}
          {activeIndex ===2 &&<Button disabled={checkStatus()} onClick={()=>GenerateCourseLayout()} >Generate Course Layout</Button>}
        </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  )
}
export default CreateCourse
