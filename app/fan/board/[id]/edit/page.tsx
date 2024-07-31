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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-14 border">
      <h1 className="text-3xl font-bold mb-12 text-black mt-4 text-left">
        게시글 수정
      </h1>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            제목
          </label>
          <input
            type="text"
            value={title}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            내용
          </label>
          <textarea
            value={content}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={6}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={saveHandle}
            className="w-1/6 py-3 bg-black text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
          >
            저장
          </button>
          <button
            onClick={() => router.push(`/fan/board/${id}`)}
            className="w-1/6 py-3 ml-4 bg-black text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
