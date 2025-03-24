// "use server";
//
// import {currentUser} from "@clerk/nextjs/server";
// import {db} from "@/server/db";
//
// export async function GetdiscussionbyId(roomId: string) {
//   const user = await currentUser();
//   if (!user) {
//     throw new Error("User is not authenticated");
//   }
//   const emailAddress = user.primaryEmailAddress?.emailAddress || '';
//
//   const discussion = await db.discussions.findFirst({
//     where: {
//       id: roomId,
//       createdBy: emailAddress
//     }
//   });
//   if (!discussion) {
//     throw new Error("Discussion not found or you do not have access to it");
//   }
//   return discussion;
// }