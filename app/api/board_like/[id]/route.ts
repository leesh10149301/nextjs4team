import supabase from "@/app/utils/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: postId } = req.query;
  console.log("Request method:", req.method);
  console.log("Request ID:", postId);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    console.log("Authentication error or no user data:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = data.user;

  switch (req.method) {
    case "GET":
      console.log("GET method called");
      return getLikes(postId as string, res);
    case "POST":
      console.log("POST method called");
      return addLike(postId as string, user.id, res);
    case "DELETE":
      console.log("DELETE method called");
      return removeLike(postId as string, user.id, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      console.log("Method Not Allowed");
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const getLikes = async (postId: string, res: NextApiResponse) => {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    return res.status(500).json({ error: "Failed to get likes" });
  }

  res.status(200).json(data);
};

const addLike = async (
  postId: string,
  userId: string,
  res: NextApiResponse
) => {
  const { error } = await supabase
    .from("likes")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    return res.status(500).json({ error: "Failed to add like" });
  }

  res.status(200).json({ message: "Like added successfully" });
};

const removeLike = async (
  postId: string,
  userId: string,
  res: NextApiResponse
) => {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    return res.status(500).json({ error: "Failed to remove like" });
  }

  res.status(200).json({ message: "Like removed successfully" });
};

export default handler;
