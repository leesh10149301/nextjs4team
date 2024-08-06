import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import supabase from "@/lib/utils/supabase/client";
import {
  addLike,
  getLikesCount,
  removeLike,
} from "@/lib/utils/supabase/query/boardLikeQuery";

export function BoardLike({ postId, userId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // 좋아요 수 가져오기
        const count = await getLikesCount(postId);
        setLikesCount(count);

        // 사용자가 이미 좋아요를 눌렀는지 확인
        const { data: likeData, error: likeError } = await supabase
          .from("board_likes")
          .select("*")
          .eq("post_id", postId)
          .eq("user_id", userId)
          .single();

        if (likeError) {
          console.error("좋아요 상태를 가져오는 데 실패했습니다:", likeError);
        } else if (likeData) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error("좋아요 데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      // console.log(`postId: ${postId}, userId: ${userId}`);
      if (isLiked) {
        await removeLike(postId, userId);
        setLikesCount((prev) => prev - 1);
      } else {
        await addLike(postId, userId);
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="flex space-x-2 cursor-pointer">
      <button
        onClick={handleLike}
        className={`flex space-x-1 ${
          isLiked ? "text-red-600" : "text-gray-400"
        }`}
      >
        <FaHeart size={28} />
      </button>
      <span className="text-base font-medium">{likesCount}</span>
    </div>
  );
}
