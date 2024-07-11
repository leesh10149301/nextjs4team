import { paraphraseRecognition } from "./paraphraseRecognition";
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
  try {
    for (const keyword of keywords) {
      const data = await fetchSentenceData(keyword);

      if (data && data.length > 0) {
        const { id, sentence: existSentence } = data[0];

        const paraphraseResponse: ParaphraseRecognitionResponse =
          await paraphraseRecognition(sentence, existSentence);
        const {
          return_object: { result },
        } = paraphraseResponse;

        console.log("result", result);

        if (result === "paraphrase") {
          await incrementSentenceCount(id);
          return;
        }
      }
    }
    await saveNewSentenceToDB(sentence, keywords);
  } catch (error) {
    console.error("Error in processAndStoreSentence:", error);
    throw error;
  }
};

export { processAndStoreSentence };
