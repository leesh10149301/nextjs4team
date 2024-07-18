import { z } from "zod";
import { MESSAGES } from "@/lib/constants/chatbot";

const formDataSchema = z.object({
  question: z.string().min(1, { message: MESSAGES.EMPTY_QUESTION_ERROR }),
});

export { formDataSchema };
