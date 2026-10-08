import { z } from "zod";

export const QuestionCreateSchema = z.object({
  title: z
    .string()
    .min(15, "Title must be at least 15 characters long")
    .max(150, "Title cannot exceed 150 characters"),
  body: z
    .string()
    .min(30, "Please provide sufficient detail in your question body (at least 30 characters)"),
  tags: z
    .array(z.string().min(1).max(25))
    .min(1, "Please specify at least 1 tag")
    .max(5, "You can select up to 5 tags"),
});

export type QuestionCreateInput = z.infer<typeof QuestionCreateSchema>;

export const QuestionUpdateSchema = QuestionCreateSchema.partial().extend({
  id: z.string().cuid(),
});

export type QuestionUpdateInput = z.infer<typeof QuestionUpdateSchema>;

export const QuestionFilterSchema = z.object({
  tab: z.enum(["newest", "active", "unanswered", "bountied", "top"]).default("newest"),
  tag: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(15),
});

export type QuestionFilterInput = z.infer<typeof QuestionFilterSchema>;
