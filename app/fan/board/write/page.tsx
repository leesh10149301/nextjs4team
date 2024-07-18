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
    <>
      <h1>Create a New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center h-[680px]"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}
