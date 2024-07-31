"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/lib/utils/supabase/client";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import {
  addComment,
  deleteComment,
  getComments,
} from "@/app/api/_board_comment/route";
import { BoardLike } from "@/components/board/like";

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
        // console.log("Post data:", data);
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
          // console.log("User data:", user);
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
      // console.log("Attempting to delete comment with ID:", commentId);
      await deleteComment(commentId);
      // console.log("Comment deleted successfully");
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
    <div className="container mx-auto py-12 relative">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-t border-gray-200">
        <div className="flex justify-between mt-4 ml-4">
          <Link href="/fan/board" passHref>
            <button className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300">
              <FiArrowLeft size={24} />
            </button>
          </Link>
        </div>
        <div className="p-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <p className="text-sm text-gray-600 mr-4 pt-3">
              {formatDate(post.createdAt)}
            </p>
          </div>
          <p className="text-gray-800 text-base leading-relaxed mb-6 text-left">
            {post.content}
          </p>
          <div className="flex justify-between items-center mb-6">
            <BoardLike postId={post.id} userId={currentUser?.id} />
            {canEditDelete && (
              <div className="flex space-x-2">
                <button
                  className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                  onClick={editHandler}
                >
                  수정
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300"
                  onClick={deleteHandler}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-8 bg-gray-100 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">댓글</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">
                  {formatDate(comment.created_at)}
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
              <p className="text-gray-700 text-base text-left">
                {comment.comment}
              </p>
            </div>
          ))}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
              rows={2}
              placeholder="댓글을 입력하세요..."
            />
            <div className="flex justify-end">
              <button
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
                onClick={addCommentHandler}
              >
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
