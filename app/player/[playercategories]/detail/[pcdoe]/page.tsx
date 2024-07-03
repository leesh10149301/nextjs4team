export default function DetailPage() {
  return (
    <div className="flex flex-col justify-center items-center mb-3 pt-12">
      <div className="w-[1100px] my-[1%] border-b-2 border-red-200">
        <div className="w-full">뒤로가기</div>
      </div>

      <div className="w-[1100px] pt-6 ">
        <div className="w-full relative flex justify-center h-[465px]">
          <img src="https://wizzap.ktwiz.co.kr/files/playerImg/ktImg2/94415_2024-03-06_104853.jpg" />
          <div className="absolute top-[31.2%] left-[36%]">
            <div className="flex flex-col text-white">
              <span className="text-[#c00000] text-3xl mb-2 font-bold">
                No. 1
              </span>
              <span className="text-5xl mb-3 font-bold">한글 이름</span>
              <span>포지션 / 우투양타</span>
            </div>
          </div>
          <div>
            <div className="absolute top-[20%] text-white left-[65%]">
              <ul>
                <li className="flex ">
                  <div className=" w-16 mb-2">생년월일</div>
                  <div>1000년 00월 00일</div>
                </li>
                <li className="flex ">
                  <div className=" w-16 mb-2">프로입단</div>
                  <div>0000년</div>
                </li>
                <li className="flex ">
                  <div className=" w-16 mb-2">신장/체중</div>
                  <div>190cm / 88kg</div>
                </li>
                <li className="flex ">
                  <div className=" w-16 mb-2">출신교</div>
                  <div>출신초-출신중-출신고-출신대</div>
                </li>
              </ul>
              <div className="text-blue-200 ">선수의 역량을 여기 넣어볼까?</div>
            </div>
            <div className="absolute bottom-0 left-[70%] text-white mb-4">
              여기에 사진 버튼?
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center mt-10">
        <div className="w-[1100px] border-t-2">
          <ul className=" w-full flex gap-2">
            <li className=" p-4 ">
              <button>선수 역량</button>
            </li>
            <li className=" p-4">
              <button>정규 리그 기록</button>
            </li>
            <li className=" p-4">
              <button>최근 5경기</button>
            </li>
            <li className=" p-4">
              <button>통산기록</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
