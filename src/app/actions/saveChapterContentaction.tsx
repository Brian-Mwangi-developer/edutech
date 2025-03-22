// app/actions/ChapterActions.ts
"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export async function SaveChapterLayoutInDb(ChapterData:any) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  try {
    const result = await db.chapter.create({
      data: {
        chapterId: ChapterData?.chapterId || '',
        courseId: ChapterData?.course?.courseId || '',
        content: ChapterData?.content,
        videoId: ChapterData?.videoId || '',
      },
    });
    await CoursePublished(ChapterData?.id)
    return result.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const CoursePublished = async (courseId: string) => {
  try {
    const result = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        published: true,
      },
    });

    return result.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
