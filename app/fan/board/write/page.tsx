"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/app/utils/supabase/client";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) {
        setToken(data.session.access_token); // 토큰 설정
      } else {
        console.error("Failed to fetch session:", error);
      }
    };
    fetchSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("로그인되어 있지 않습니다.");
      return;
    }

    const response = await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // 인증 토큰 포함
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push("/fan/board");
    } else {
      const errorData = await response.json();
      console.error("Failed to create post:", errorData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-10">
      {/* <h1 className="text-4xl font-bold mb-6 text-center text-red-500">
        게시글 작성
      </h1> */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="제목을 입력해주세요"
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
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="내용을 입력해주세요"
            rows={6}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-1/6 py-3 bg-black text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
          >
            작성
          </button>
        </div>
      </form>
    </div>
  );
}
