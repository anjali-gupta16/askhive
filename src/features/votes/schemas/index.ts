import { z } from "zod";

export const VoteSchema = z.object({
  targetId: z.string().cuid(),
  targetType: z.enum(["question", "answer"]),
  value: z.union([z.literal(1), z.literal(-1), z.literal(0)]), // 1 = upvote, -1 = downvote, 0 = remove
});

export type VoteInput = z.infer<typeof VoteSchema>;
