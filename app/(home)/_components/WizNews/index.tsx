"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css/bundle";
import "./swiper.css";

export default function WizNews() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/news_list");
      if (!response.ok) return;
      const data = await response.json();
      setNewsList(data);
    };
    fetchData();
  }, []);

  if (!newsList)
    return (
      <div className="w-full max-w-[500px] h-[280px] bg-gray-300 mx-2 rounded-2xl animate-pulse"></div>
    );

  return (
    <div className="relative w-full max-w-[500px] h-[280px] mx-2 news">
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        slidesPerGroup={1}
        pagination
        loop
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        modules={[Pagination, Autoplay]}
        className="size-full rounded-xl"
      >
        {newsList.map((newsItem, index) => (
          <SwiperSlide key={index} className="relative">
            <a
              href={`https://www.ktwiz.co.kr/media/wiznews/${newsItem.artcSeq}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-full h-full rounded-2xl">
                <Image
                  src={newsItem.imgFilePath}
                  alt="news"
                  fill
                  sizes="(max-width: 540px) 100vw, 520px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-2 rounded-b-lg">
                  <span>{newsItem.artcTitle}</span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
