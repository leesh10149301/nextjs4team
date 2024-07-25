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
      <SwiperSlide className="h-screen flex items-center justify-center">
        <TodayScore />
      </SwiperSlide>
      <SwiperSlide className="h-screen flex flex-col items-center justify-center">
        {/* 다음 섹션 */}
        <div className="p-5 text-center mt-7">
          <img
            src="/images/ktwiz_schedule.png"
            className="w-[826px] mx-auto my-20"
          />
          <div className="w-[1099.99px] flex flex-col items-center justify-center mx-auto">
            <div className="w-full flex items-center justify-center">
              <WeekSchedule />
            </div>
            <div className="w-full h-[189.98px] mt-14 flex">
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
