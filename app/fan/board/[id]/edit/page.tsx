"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState(""); // username 상태 추가
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/board/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        console.log("Post data:", data); // 게시물 데이터 로그 출력
        setTitle(data.title);
        setContent(data.content);
        setUsername(data.username); // username 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const saveHandle = async () => {
    try {
      const response = await fetch(`/api/board/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, username }), // username 포함
      });

      if (response.ok) {
        router.push(`/fan/board/${id}`);
      } else {
        const errorData = await response.json();
        console.error("Error updating post:", errorData);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>Edit Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // username 입력 필드 추가
      />
      <button onClick={saveHandle}>저장</button>
      <button onClick={() => router.push(`/fan/board/${id}`)}>취소</button>
    </>
  );
}
