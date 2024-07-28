"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState("list");

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

  const toggleView = (type) => {
    setViewType(type);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              viewType === "list"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => toggleView("list")}
          >
            List
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              viewType === "card"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => toggleView("card")}
          >
            Card
          </button>
        </div>
        <Link href="/fan/board/write">
          <button className="text-white bg-black inline-block px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
            글쓰기
          </button>
        </Link>
      </div>
      <div>
        {viewType === "list" && (
          <ul className="divide-y divide-gray-300">
            <li className="flex justify-between py-4 font-bold text-gray-500 border-gray-200 border-b-2">
              <div className="w-1/4">제목</div>
              <div className="w-1/4">내용</div>
              <div className="w-1/4">날짜</div>
              <div className="w-1/4">좋아요</div>
            </li>
            {posts.map((post) => (
              <Link href={`/fan/board//${post.id}`} key={post.id}>
                <li
                  key={post.id}
                  className="flex justify-between py-4 hover:underline"
                >
                  <div className="w-1/4">{post.title}</div>
                  <div className="w-1/4">{post.content}</div>
                  <div className="w-1/4">{formatDate(post.createdAt)}</div>
                  <div className="w-1/4">{post.likes}</div>
                </li>
              </Link>
            ))}
          </ul>
        )}
        {viewType === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition duration-300"
              >
                <Link href={`/fan/board/${post.id}`} passHref>
                  <div className="hover:underline">
                    <div className="text-xl font-semibold text-black">
                      {post.title}
                    </div>
                    <div className="text-gray-600">{post.content}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-gray-500">
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="text-gray-500">좋아요: {post.likes}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
