"use client";

import AddCourse from "@/app/(protected)/dashboard/_components/AddCourse";
import CourseList from "@/app/(protected)/dashboard/_components/CourseList";

export default function Home() {

  return (
  <div>
    <AddCourse/>
  {/*  Display courses*/}
    <CourseList/>
  </div>
  );
}
