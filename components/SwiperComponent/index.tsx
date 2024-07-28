"use client";

import React, { useEffect } from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Navigation } from "swiper/modules";

// Import Swiper styles and custom CSS
import "swiper/css";
import "swiper/css/pagination";
import "./custom-swiper.css"; // custom-swiper.css 파일 import
import TodayScore from "./TodayScore";
import WeekSchedule from "./WeekSchedule";
import MonthlyPlayer from "./MonthlyPlayer";
import WizNews from "./WizNews";
import Image from "next/image";

const SwiperComponent: FC = () => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel
      // pagination={{ clickable: true }}
      navigation
      modules={[Pagination, Mousewheel, Navigation]}
      className="h-screen"
    >
      <SwiperSlide className="mt-[80px]">
        <iframe
          className="w-full h-2/3 border-none min-h-[500px] mx-auto"
          src="https://www.youtube.com/embed/yCqLhzTVgTs?si=2lA05OiqC4p63lfF&mute=1&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <TodayScore />
      </SwiperSlide>
      <SwiperSlide>
        {/* 다음 섹션 */}
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={"/images/ktwiz_schedule.png"}
            alt="schedule"
            width={826}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="mt-2"
          />
          <WeekSchedule />
          <div className="flex items-center justify-between w-[1060px]">
            <MonthlyPlayer />
            <WizNews />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
