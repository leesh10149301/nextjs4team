"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/app/utils/supabase/client";
import Link from "next/link";
import {
  addComment,
  deleteComment,
  getComments,
} from "@/app/api/board_comment/route";

type Post = {
  id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  likes: number;
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  comment: string;
  created_at: string;
};

export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Invalid ID value:", id);
      return;
    }

    async function fetchPost() {
      try {
        const response = await fetch(`/api/board/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        console.log("Post data:", data);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw new Error("Failed to fetch current user");
        }
        const user = data.session?.user;
        if (user) {
          console.log("User data:", user);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getComments(id);
        setComments(data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [id]);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (currentUser && post) {
        try {
          const response = await fetch(`/api/board_like/${post.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch likes: ${response.statusText}`);
          }
          const likes = await response.json();
          const liked = likes.some(
            (like: any) => like.user_id === currentUser.id
          );
          setIsLiked(liked);
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      }
    };

    checkIfLiked();
  }, [currentUser, post]);

  const handleLike = async () => {
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }

    try {
      const method = isLiked ? "DELETE" : "POST";
      const response = await fetch(`/api/board_like/${post?.id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsLiked(!isLiked);
        setPost(
          (prevPost) =>
            prevPost && {
              ...prevPost,
              likes: prevPost.likes + (isLiked ? -1 : 1),
            }
        );
      } else {
        console.error(`Error updating like status: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const editHandler = () => {
    router.push(`/fan/board/${id}/edit`);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(`/api/board/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push(`/fan/board`);
      } else {
        const errorData = await response.json();
        console.error("Error deleting post:", errorData);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const addCommentHandler = async () => {
    if (!newComment.trim()) return;

    if (
      !currentUser ||
      !currentUser.user_metadata ||
      !currentUser.user_metadata.username
    ) {
      console.error("No user logged in or username missing");
      return;
    }

    try {
      await addComment({
        post_id: id,
        username: currentUser.user_metadata.username,
        comment: newComment,
      });
      const data = await getComments(id);
      setComments(data || []);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteCommentHandler = async (commentId: string) => {
    try {
      console.log("Attempting to delete comment with ID:", commentId);
      await deleteComment(commentId);
      console.log("Comment deleted successfully");
      const data = await getComments(id);
      setComments(data || []);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ko-KR", options);
  };

  if (loading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  const canEditDelete =
    currentUser && post.username === currentUser.user_metadata?.username;

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-500 mr=2">
              {formatDate(post.createdAt)}
            </p>
            <p className="text-sm text-gray-500">{`Likes: ${post.likes}`}</p>
          </div>
          <p className="text-lg text-gray-800 mb-6">{post.content}</p>
          <button
            className={`py-2 px-4 rounded-lg ${
              isLiked ? "bg-red-600 text-white" : "bg-gray-300 text-black"
            } hover:bg-red-500`}
            onClick={handleLike}
          >
            {isLiked ? "Unlike" : "Like"}
          </button>
          <div className="flex justify-between items-center mb-6 mt-4">
            <div>
              <Link href="/fan/board" passHref>
                <button className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-500">
                  뒤로 가기
                </button>
              </Link>
            </div>
            {canEditDelete && (
              <div className="flex space-x-4">
                <button
                  className="bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-800"
                  onClick={editHandler}
                >
                  수정
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-500"
                  onClick={deleteHandler}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">댓글</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {comment.username} - {formatDate(comment.created_at)}
                </p>
                {currentUser &&
                  comment.username === currentUser.user_metadata?.username && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteCommentHandler(comment.id)}
                    >
                      삭제
                    </button>
                  )}
              </div>
              <p className="text-lg text-gray-800">{comment.comment}</p>
            </div>
          ))}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              rows={4}
              placeholder="댓글을 입력하세요..."
            />
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-lg mt-2 hover:bg-black"
              onClick={addCommentHandler}
            >
              댓글 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
