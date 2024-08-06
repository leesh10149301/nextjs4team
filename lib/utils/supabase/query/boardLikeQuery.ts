import supabase from "@/lib/utils/supabase/client";

export const getLikes = async () => {
  const { data, error } = await supabase.from("board_likes").select("*");
  if (error) {
    console.error("좋아요 데이터를 가져오는 데 실패했습니다:", error);
  }
  return data;
};

export const getLikesCount = async (postId: string) => {
  const { count, error } = await supabase
    .from("board_likes")
    .select("*", { count: "exact" })
    .eq("post_id", postId);

  if (error) {
    console.error("좋아요 수를 가져오는 데 실패했습니다:", error);
    return 0;
  }

  return count ? count : 0;
};

export const addLike = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("board_likes")
    .insert([{ post_id: postId, user_id: userId, like: 1 }]);
  if (error) {
    console.error("좋아요 추가에 실패했습니다:", error);
  } else {
    console.log("좋아요가 성공적으로 추가되었습니다");
  }
  return data;
};

export const removeLike = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("board_likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    console.error("좋아요 삭제에 실패했습니다:", error);
  } else {
    console.log("좋아요가 성공적으로 삭제되었습니다");
  }
  return data;
};
