import supabase from "@/lib/utils/supabase/client";

type COMMENT = {
  post_id?: string;
  id?: string;
  user_id?: string;
  username?: string;
  comment?: string;
  created_at?: string;
};

type newComment = Omit<COMMENT, "id" | "created_at">;

const getComments = async (postId: string) => {
  const { data, error } = await supabase
    .from("board_comment")
    .select("*")
    .eq("post_id", postId);
  if (error) {
    console.error("Failed to get comments:", error);
  }
  return data;
};

const addComment = async (newComment: newComment) => {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Failed to fetch current user:", userError);
    return;
  }

  const { error } = await supabase.from("board_comment").insert({
    ...newComment,
    user_id: user.user?.id,
  });

  if (error) {
    console.error("Failed to add comment:", error);
  }
};

const deleteComment = async (id: string) => {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Failed to fetch current user:", userError);
    return;
  }

  const { error } = await supabase
    .from("board_comment")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user?.id);

  if (error) {
    console.error("Failed to delete comment:", error);
  } else {
    console.log("Comment deleted successfully");
  }
};

export { getComments, addComment, deleteComment };
