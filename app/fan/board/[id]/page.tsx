"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/app/utils/supabase/client";
import Link from "next/link";

export default function Post() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보 상태

  useEffect(() => {
    async function fetchPost() {
      if (id) {
        try {
          const response = await fetch(`/api/board/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const data = await response.json();
          console.log("Post data:", data); // 게시물 데이터 로그 출력
          setPost(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
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
        console.log("Session data:", data); // session 데이터 로그 출력
        const user = data.session.user;
        console.log("User data:", user); // user 데이터 로그 출력
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  if (loading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  // 게시글 작성자와 현재 로그인한 사용자의 username 비교
  const canEditDelete =
    currentUser && post.username === currentUser.user_metadata.username;

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-500 mr-2">
              {formatDate(post.createdAt)}
            </p>
            <p className="text-sm text-gray-500">{`Likes: ${post.likes}`}</p>
          </div>
          <p className="text-lg text-gray-800 mb-6">{post.content}</p>
          {canEditDelete && (
            <div className="flex justify-end space-x-3">
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
          <Link href="/fan/board" passHref>
            <button className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-500">
              뒤로 가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
