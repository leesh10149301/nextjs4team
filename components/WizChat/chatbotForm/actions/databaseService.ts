import supabase from "@/lib/utils/supabase/client";

// DB 서버에서 선수 정보를 가져오는 함수
const getPlayerData = async (name: string) => {
  try {
    const { data } = await supabase
      .from("player")
      .select("*")
      .eq("playerName", name);

    return { success: true, data: data[0] };
  } catch (error) {
    console.log("Unexpected error:", error);
    return {
      success: false,
      data: null,
      message: "서버 에러 발생, 다시 시도 해주세요.",
    };
  }
};

const getPlayerSelectedData = async (keyword: string) => {
  try {
    const { data, error } = await supabase
      .from("player")
      .select("pcode, position")
      .eq("playerName", keyword)
      .single();
    if (error) {
      throw new Error(`Error fetching existing sentence: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in fetchSentenceData:", error);
    throw error;
  }
};

// DB 서버에서 경기 결과를 가져오는 함수
const getGameResult = async (date: string) => {
  try {
    const { data } = await supabase
      .from("gameResult")
      .select("*")
      .eq("gameDate", date);

    const { gameDate, home, hscore, visit, vscore, kt_win } = data[0];
    const formattedResult = {
      gameDate,
      home,
      homeScore: hscore,
      visit,
      visitScore: vscore,
      result: kt_win,
    };

    return { success: true, data: formattedResult };
  } catch (err) {
    console.log("Unexpected error:", err);
    return {
      success: false,
      data: null,
      message: "서버 에러 발생, 다시 시도 해주세요.",
    };
  }
};

// 문장 카운트를 증가시키는 함수
const incrementSentenceCount = async (id: string) => {
  try {
    // 현재 count 값을 가져오기
    const { data: currentData, error: fetchError } = await supabase
      .from("sentence")
      .select("count")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching current count: ${fetchError.message}`);
    }

    const currentCount = currentData.count;

    // increment 함수를 호출하여 새로운 count 값을 얻기
    const { data: newCount, error: rpcError } = await supabase.rpc(
      "increment",
      { x: currentCount }
    );

    if (rpcError) {
      throw new Error(`Error incrementing count: ${rpcError.message}`);
    }

    // 새로운 count 값을 업데이트
    const { data, error } = await supabase
      .from("sentence")
      .update({ count: newCount })
      .eq("id", id);

    if (error) {
      throw new Error(`Error increasing count: ${error.message}`);
    }
  } catch (error) {
    console.error("Error in incrementSentenceCount:", error);
    throw error;
  }
};

// 새로운 문장을 DB에 저장하는 함수
const saveNewSentenceToDB = async (sentence: string, keywords: string[]) => {
  try {
    const { error } = await supabase
      .from("sentence")
      .insert([{ sentence, count: 1 }]);

    if (error) {
      throw new Error(`Error saving new sentence: ${error.message}`);
    }

    console.log("New sentence saved. Response:");
  } catch (error) {
    console.error("Error in saveNewSentenceToDB:", error);
    throw error;
  }
};

// 문장 데이터를 가져오는 함수
const fetchSentenceData = async (keyword: string) => {
  try {
    const { data, error } = await supabase
      .from("sentence")
      .select("*")
      .ilike("sentence", `%${keyword}%`);

    if (error) {
      throw new Error(`Error fetching existing sentence: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in fetchSentenceData:", error);
    throw error;
  }
};

export {
  getPlayerData,
  getGameResult,
  incrementSentenceCount,
  saveNewSentenceToDB,
  fetchSentenceData,
  getPlayerSelectedData,
};
