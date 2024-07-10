// 패러프라이즈 인식 API
const paraphraseRecognition = async (sentence1: string, sentence2: string) => {
  const openApiURL = "http://aiopen.etri.re.kr:8000/ParaphraseQA";
  const accessKey = process.env.NEXT_PUBLIC_ETRI_API;

  if (!accessKey) {
    throw new Error("ETRI API key is missing");
  }

  const requestPayload = {
    argument: {
      sentence1,
      sentence2,
    },
  };

  const response = await fetch(openApiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessKey,
    },
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error from API: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export { paraphraseRecognition };
