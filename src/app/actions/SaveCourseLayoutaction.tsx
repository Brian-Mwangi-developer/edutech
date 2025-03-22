// app/actions/courseActions.ts
"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export async function SaveCourseLayoutInDb(courseLayout: any, userCourseInput: any) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const emailAddress = user.primaryEmailAddress?.emailAddress || '';
  const fullName = user.fullName || '';
  const imageUrl = user.imageUrl || '';

  try {
    const result = await db.course.create({
      data: {
        name: userCourseInput?.topic || '',
        level: userCourseInput?.level || '',
        includeVideo: userCourseInput?.displayVideo || 'Yes', // Assuming it’s a string
        category: userCourseInput?.category || '',
        courseOutput: courseLayout, // Make sure courseLayout is a valid JSON object
        createdBy: emailAddress,
        courseImage: userCourseInput?.courseImage || '',
        userName: fullName,
        userProfileImage: imageUrl,
      },
    });
    // console.log(result);
    return result.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
