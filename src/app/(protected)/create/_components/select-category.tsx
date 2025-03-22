"use client"
import React,{useContext} from 'react'
import Image from "next/image";
import {UserInputContext} from "@/context/userInputContext";
import CategoryList from "@/components/CategoryList";
const SelectCategory = () => {
  const {userCourseInput, setUserCourseInput}= useContext(UserInputContext)
  const handleCategoryChange=(category:string)=>{
    setUserCourseInput((prev:any)=>({
      ...prev,
      category:category
    }))
    console.log("Changed",category)
  }
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select the Course Category</h2>
      <div className="grid grid-cols-3 gap-10 px:10 md:px:20">
        {CategoryList.map((item,index)=>(
          <div key={index} className={`flex cursor-pointer flex-col
             p-5 border items-center rounded-xl hover:border-blue-700 hover:bg-blue-100
             ${userCourseInput?.category === item.name ? 'border-blue-600 bg-blue-50':''}`}
               onClick={()=>handleCategoryChange(item.name)}>
            <Image src={item.icon} alt="Image" width={100} height={100}/>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectCategory
