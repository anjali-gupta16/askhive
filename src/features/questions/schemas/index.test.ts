import { describe, it, expect } from "vitest";
import { QuestionCreateSchema, QuestionFilterSchema } from "./index";

describe("Question Schemas", () => {
  it("rejects questions with title shorter than 15 characters", () => {
    const invalidData = {
      title: "Short title",
      body: "This is a detailed enough body that has more than thirty characters definitely.",
      tags: ["react"],
    };
    const result = QuestionCreateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects questions with body shorter than 30 characters", () => {
    const invalidData = {
      title: "This is a long valid question title here",
      body: "Too short",
      tags: ["react"],
    };
    const result = QuestionCreateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects questions with no tags or more than 5 tags", () => {
    const noTags = {
      title: "Valid question title with sufficient length",
      body: "Valid body that provides plenty of contextual details for the question.",
      tags: [],
    };
    expect(QuestionCreateSchema.safeParse(noTags).success).toBe(false);

    const tooManyTags = {
      ...noTags,
      tags: ["t1", "t2", "t3", "t4", "t5", "t6"],
    };
    expect(QuestionCreateSchema.safeParse(tooManyTags).success).toBe(false);
  });

  it("accepts valid question input", () => {
    const validData = {
      title: "How to properly stream Server Actions in Next.js 15?",
      body: "We are trying to stream chunks back to the client while keeping the transition active.",
      tags: ["nextjs", "react"],
    };
    const result = QuestionCreateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("defaults filter parameters correctly", () => {
    const filter = QuestionFilterSchema.parse({});
    expect(filter.tab).toBe("newest");
    expect(filter.page).toBe(1);
    expect(filter.limit).toBe(15);
  });
});
