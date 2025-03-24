import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import {currentUser} from "@clerk/nextjs/server"; // Adjust the import as needed

export const discussionRoomRouter = createTRPCRouter({
  getDiscussionRoom: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }:any) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const emailAddress = user.primaryEmailAddress?.emailAddress || '';
      //@ts-ignore
      const discussion = await db.discussions.findFirst({
        where: {
          id: input.id,
          createdBy: emailAddress,
        },
      });
      if (!discussion) {
        throw new Error("Discussion not found or you do not have access to it");
      }
      return discussion;
    }),
});
