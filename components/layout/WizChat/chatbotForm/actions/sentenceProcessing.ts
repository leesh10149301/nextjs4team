import { paraphraseRecognition } from "./koreanMorphemeParaphraseApi";
import {
  incrementSentenceCount,
  saveNewSentenceToDB,
  fetchSentenceData,
} from "./databaseService";

type Paraphrase = "paraphrase" | "not paraphrase";

interface ParaphraseRecognitionResponse {
  return_object: {
    result: Paraphrase;
  };
}

// 문장 저장 프로세스 함수
const processAndStoreSentence = async (
  sentence: string,
  keywords: string[]
) => {
  // console.log(sentence, keywords);
  try {
    for (const keyword of keywords) {
      const data = await fetchSentenceData(keyword);
      if (!data.length) continue;

      for (const { id, sentence: existSentence } of data) {
        // console.log(sentence, existSentence);
        // 429 error 방지
        await new Promise((resolve) => setTimeout(resolve, 300));
        const paraphraseResponse: ParaphraseRecognitionResponse =
          await paraphraseRecognition(sentence, existSentence);
        const {
          return_object: { result },
        } = paraphraseResponse;

        // console.log(paraphraseResponse);

        if (result === "paraphrase") {
          await incrementSentenceCount(id);
          return; // 문장이 이미 존재하면 함수를 종료
        }
      }
    }
    await saveNewSentenceToDB(sentence); // 문장이 존재하지 않으면 새로 저장
  } catch (error) {
    console.error("Error in processAndStoreSentence:", error);
    throw error;
  }
};

export { processAndStoreSentence };
