"use client";

import React from "react";
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

const SwiperComponent: FC = () => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel
      navigation
      modules={[Pagination, Mousewheel, Navigation]}
      className="h-screen"
    >
      <SwiperSlide className="bg-white">
        <div className="h-screen flex flex-col mt-[80px]">
          <div className="flex-grow flex items-center justify-center">
            <iframe
              className="w-full h-full min-h-[520px] border-none"
              src="https://www.youtube.com/embed/yCqLhzTVgTs?si=2lA05OiqC4p63lfF&mute=1&autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="w-full">
            <TodayScore />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-full flex items-center justify-center">
          <div className="container mx-auto p-4 flex flex-col items-center justify-center">
            <WeekSchedule />
            <div className="flex items-center justify-center w-full max-w-[1440px]">
              <MonthlyPlayer />
              <WizNews />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
