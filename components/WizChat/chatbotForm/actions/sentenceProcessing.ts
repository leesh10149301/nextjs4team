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
    let exist = false;
    for (const keyword of keywords) {
      const data = await fetchSentenceData(keyword);
      if (data && data.length > 0) {
        for (const { id, sentence: existSentence } of data) {
          const paraphraseResponse: ParaphraseRecognitionResponse =
            await paraphraseRecognition(sentence, existSentence);

          const {
            return_object: { result },
          } = paraphraseResponse;

          if (result === "paraphrase") {
            await incrementSentenceCount(id);
            exist = true;
            break;
          }
        }
        if (exist) {
          break;
        }
      }
    }

    if (!exist) {
      await saveNewSentenceToDB(sentence, keywords);
    }
  } catch (error) {
    console.error("Error in processAndStoreSentence:", error);
    throw error;
  }
};

export { processAndStoreSentence };
