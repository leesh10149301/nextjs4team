"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={editHandler}>수정</button>
      <button onClick={deleteHandler}>삭제</button>
    </>
  );
}
