"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GetAllCourse() {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const emailAddress = user.primaryEmailAddress?.emailAddress || '';
  const course = await db.course.findMany({
    where: {
      createdBy: emailAddress
    }
  });
  if (!course) {
    throw new Error("Course not found or you do not have access to it");
  }
  return course;
}