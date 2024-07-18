"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/board");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError(err.message);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <Link href={"/fan/board/write"}>글쓰러가기</Link>
      <div className="pt-40">
        <h1>게시글 목록</h1>
        {error && <p>Error: {error}</p>}
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/fan/board/${post.id}`}>
                {post.title} - {post.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
