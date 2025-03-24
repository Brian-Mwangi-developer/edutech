"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export async function CreateDiscussionRoom({expertName,expertVoice,topic,coachingOption,fileName}:{expertName:string,expertVoice:string,topic:string,coachingOption:string,fileName:string}) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const emailAddress = user.primaryEmailAddress?.emailAddress || '';
  //@ts-ignore
  const result = await db.discussions.create({
    data: {
      topic: topic,
      coachingOption: coachingOption,
      expertName: expertName,
      expertvoice: expertVoice,
      fileName: fileName,
      createdBy: emailAddress,
    },
  });
  return result.id;
}

export async function UpdateDiscussionConversation({id,conversation}:{id:string,conversation:any}){
  const result = await db.discussions.update({
    where: {
      id: id,
    },
    data: {
      discussion: conversation,
    },
  });
  return result;
}

// export async function CreateAzureSearchKey({key,documentId}:{key:string}){
//   const result = await db.documentSection.update({
//     where: {
//       documentId: documentId,
//
//     }
//   })
// }
