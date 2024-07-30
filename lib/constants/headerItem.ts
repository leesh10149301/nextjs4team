const MENU_ITEM = {
  "kt wiz": "/",
  "wiz park": "/",
  "Game": "/",
  "Player": "/player",
  "Media": "/",
  "팬페이지": "/fan/board",
  "티켓구매": "/",
};

const MENU_SUB_ITEM = {
  "kt wiz": [
    { name: "kt wiz는?", href: "/" },
    { name: "구단 BI", href: "/" },
    { name: "회원 정책", href: "/" },
    { name: "스폰서", href: "/" },
    { name: "웰페이퍼", href: "/" },
  ],
  "wiz park": [
    { name: "수원 wiz park", href: "/" },
    { name: "주차 예약", href: "/" },
    { name: "찾아오기", href: "/" },
    { name: "익산야구장", href: "/" },
  ],
  "Game": [
    { name: "정규리그", href: "/" },
    { name: "퓨처스리그", href: "/" },
  ],
  "Player": [
    { name: "코칭스텝", href: "/player/coach" },
    { name: "선수단", href: "/player/pitcher" },
  ],
  "Media": [
    { name: "wiz 뉴스", href: "/" },
    { name: "wiz 스토리", href: "/" },
    { name: "시구자 정보", href: "/" },
    { name: "wiz 포토", href: "/" },
    { name: "하이라이트", href: "/" },
    { name: "Live 영상모음", href: "/" },
  ],
  "팬페이지": [
    { name: "홈런볼 예측", href: "/fan/homerun" },
    { name: "경기 예측", href: "/fan/gameprediction" },
    { name: "응원 게시판", href: "/fan/board" },
  ],
  "티켓구매": [
    { name: "티켓 예매", href: "/" },
    { name: "단체 관람", href: "/" },
    { name: "입장 및 좌석 정보", href: "/" },
  ],
};

export { MENU_ITEM, MENU_SUB_ITEM };
