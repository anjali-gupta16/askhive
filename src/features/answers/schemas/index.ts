import { z } from "zod";

export const AnswerCreateSchema = z.object({
  questionId: z.string().cuid(),
  body: z
    .string()
    .min(20, "Answer must be at least 20 characters long to provide meaningful assistance"),
  parentId: z.string().cuid().optional(), // For threaded replies (Level 2)
});

export type AnswerCreateInput = z.infer<typeof AnswerCreateSchema>;

export const AnswerUpdateSchema = z.object({
  id: z.string().cuid(),
  body: z.string().min(20, "Answer must be at least 20 characters long"),
});

export type AnswerUpdateInput = z.infer<typeof AnswerUpdateSchema>;

export const AcceptAnswerSchema = z.object({
  questionId: z.string().cuid(),
  answerId: z.string().cuid(),
});

export type AcceptAnswerInput = z.infer<typeof AcceptAnswerSchema>;
