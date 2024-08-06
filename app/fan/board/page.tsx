"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import { getLikesCount } from "@/lib/utils/supabase/query/boardLikeQuery";

export default function Board() {
  const router = useRouter();
  const { loading, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [likesCounts, setLikesCounts] = useState({});
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/logIn");
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/board`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }

        // 최신순으로 정렬
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(data);

        // 각 게시물의 좋아요 수
        const likesData = {};
        for (const post of data) {
          const count = await getLikesCount(post.id);
          likesData[post.id] = count;
        }
        setLikesCounts(likesData);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError(err.message);
      }
    }

    if (user) {
      // 사용자가 존재할 때만 게시글
      fetchPosts();
    }
  }, [user]);

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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // 현재 페이지에 맞는 게시글 필터링
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage); // 총 페이지 수 계산

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태를 표시합니다
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-2">
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
              <div className="w-1/5 text-center">제목</div>
              <div className="w-2/5 text-center">내용</div>
              <div className="w-1/5 text-center">날짜</div>
              <div className="w-1/5 text-center">좋아요</div>
            </li>
            {currentPosts.map((post) => (
              <Link href={`/fan/board/${post.id}`} key={post.id}>
                <li className="flex justify-between py-4 hover:bg-gray-100 transition duration-300">
                  <div className="w-1/5 pl-2">
                    {truncateText(post.title, 10)}
                  </div>
                  <div className="w-2/5">{truncateText(post.content, 23)}</div>
                  <div className="w-1/5 text-center">
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="w-1/5 text-center">
                    {likesCounts[post.id] || 0}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
        {viewType === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition duration-300 hover:bg-gray-100 border"
              >
                <Link href={`/fan/board/${post.id}`} passHref>
                  <div>
                    <div className="text-xl font-semibold text-black">
                      {truncateText(post.title, 10)}
                    </div>
                    <div className="text-gray-600">
                      {truncateText(post.content, 17)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-gray-500">
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="text-gray-500">
                        좋아요: {likesCounts[post.id] || 0}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
