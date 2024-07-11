"use server";

import { OpenAI } from "openai";
import { formDataSchema } from "./schemas";
import {
  performMorphologicalAnalysis,
  analyzeKeywords,
} from "./morphologicalAnalysis";
import { processAndStoreSentence } from "./sentenceProcessing";
import { answerGameQuestion, answerPlayerQuestion } from "./questionHandlers";
import { MESSAGES } from "@/lib/constants/chatbot";
import {
  generateBookingMessage,
  generateCreateMessage,
  generateFavoritePlayerMessage,
  generateMascotMessage,
} from "./generateMessage";

const openai = new OpenAI();

// GPT 챗봇 함수
export async function gptModel(userQuestion: string) {
  let responseMessage = "";
  const result = formDataSchema.safeParse({
    question: userQuestion,
  });

  if (!result.success) {
    return result.error.flatten().fieldErrors.question[0];
  }

  const { question } = result.data;

  // 형태소 분석 수행
  const analysisResult = await performMorphologicalAnalysis(question);

  const keywordAnalysis = await analyzeKeywords(
    analysisResult.return_object.sentence
  );

  const keywords = analysisResult.return_object.sentence[0].word.map(
    (d) => d.text
  );

  await processAndStoreSentence(question, keywords);

  const hasRelevantKeyword = Object.values(keywordAnalysis).some(
    (v) => v === true
  );

  if (hasRelevantKeyword) {
    if (keywordAnalysis.hasBaseballKeyword) {
      responseMessage = await answerGameQuestion(question);
    } else if (keywordAnalysis.hasPlayerKeyword) {
      responseMessage = await answerPlayerQuestion(analysisResult);
    } else if (keywordAnalysis.hasTodayResult) {
      responseMessage = "오늘?";
    } else if (keywordAnalysis.hasMascot) {
      responseMessage = generateMascotMessage;
    } else if (keywordAnalysis.hasBooking) {
      responseMessage = generateBookingMessage;
    } else if (keywordAnalysis.hasFavlite) {
      responseMessage = generateFavoritePlayerMessage;
    } else if (keywordAnalysis.hasCreateTeam) {
      responseMessage = generateCreateMessage;
    }
  } else {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-05-13",
        max_tokens: 250,
        messages: [
          {
            role: "system",
            content:
              "WizBot is a useful assistant that provides general information about KT Wiz in the KBO, Korean Baseball League. WizBot always provides accurate and concise information in Korean. It refuses to answer questions that are not related to KT Wiz or baseball.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      });
      responseMessage = completion.choices[0].message.content;
    } catch (error) {
      console.error(error);
      responseMessage = MESSAGES.GPT_API_ERROR;
    }
  }

  return responseMessage;
}
