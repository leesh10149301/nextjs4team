"use client";

import React from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Navigation } from "swiper/modules";

// Import Swiper styles and custom CSS
import "swiper/css";
import "swiper/css/pagination";
import "./custom-swiper.css"; // custom-swiper.css 파일 import

const SwiperComponent: FC = () => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel
      pagination={{ clickable: true }}
      navigation
      modules={[Pagination, Mousewheel, Navigation]}
      className="h-screen"
    >
      <SwiperSlide className="h-screen flex items-center justify-center">
        {/* YouTube 비디오 */}
        <iframe
          className="w-11/12 h-full border-none min-h-[500px] mx-auto"
          src="https://www.youtube.com/embed/yCqLhzTVgTs?si=2lA05OiqC4p63lfF&mute=1&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </SwiperSlide>
      <SwiperSlide className="h-screen flex flex-col items-center justify-center">
        {/* 다음 섹션 */}
        <div className="p-5 text-center">
          <img
            src="/images/ktwiz_schedule.png"
            className="w-[826px] mx-auto my-auto mt-20"
          />
          <div className="w-[1099.99px] h-[680.95px] flex flex-col items-center justify-center mx-auto mt-5">
            <div className="w-full h-[302px] flex items-center justify-center border-2 border-red-100">
              <div className="w-[605px] h-[222px] bg-gray-100 flex items-center justify-center mx-2">
                <img />
                <button>경기 정보</button>
              </div>
              <div className="relative w-[395px] h-[222px] overflow-hidden bg-[url('/images/ktwiz_cheonplayer.png')] bg-cover">
                <img
                  src="/icons/ktwiz_logo.svg"
                  className="object-cover w-[85px] h-[35px] flex items-center justify-center mt-9 ml-8 mx-2"
                />
                <p className="text-white text-[12px] relative bottom-2 right-12">
                  이달의 선수
                </p>
                <div>
                  <p className="text-red-600 text-5xl relative right-36">14</p>
                  <p className="text-white text-5xl relative right-20 mr-8">
                    천성호
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-[189.98px] bg-gray-300 flex items-center justify-center mt-4">
              <div className="w-[550px] h-[190px] bg-gray-100 flex items-center justify-center mx-2">
                현재 순위
              </div>
              <div className="w-[550px] h-[190px] bg-gray-400 flex items-center justify-center mx-2">
                wiz 소식
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
