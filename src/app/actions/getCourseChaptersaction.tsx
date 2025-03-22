"use server"

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GetCourseChapters({courseId,chapterId}: {courseId:string,chapterId:string}) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await db.chapter.findMany({
      where: {
        courseId: courseId,
        chapterId: chapterId.toString(),
      },
    });
    if(!result){
      return []
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}