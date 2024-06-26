import React from "react";

const Home = () => {
  return (
    <>
      <section className="h-screen bg-blue-200 flex items-center justify-center">
        {/* YouTube 비디오 */}
        <iframe
          className="w-full h-full border-none min-h-[500px]"
          src="https://www.youtube.com/embed/yCqLhzTVgTs?si=2lA05OiqC4p63lfF&mute=1&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>
      <section className="h-screen bg-red-200 flex flex-col items-center justify-center">
        {/* 다음 섹션 */}
        <div className="p-5 text-center">
          <img src="/images/ktwiz_schedule.png" className="w-[826px] mx-auto" />
          <div className="w-[1099.99px] h-[680.95px] bg-gray-200 flex flex-col items-center justify-center mx-auto mt-5">
            <div className="w-full h-[302px] bg-gray-500 flex items-center justify-center">
              <div className="w-[605px] h-[222px] bg-gray-100 flex items-center justify-center mx-2">
                몇 대 몇
              </div>
              <div className="w-[395px] h-[222px] bg-gray-200 flex items-center justify-center mx-2">
                이달의 선수
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
      </section>
    </>
  );
};

export default Home;
