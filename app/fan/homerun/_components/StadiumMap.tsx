"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import hitterImage from "@/public/images/hitter.png";
import ballImage from "@/public/images/home-run-ball.png";
import { PlayerHomerunData } from "@/app/fan/homerun/page";

interface StadiumMapProps {
  selectedPlayerId: number | null;
  playersHomerunData: PlayerHomerunData[];
  error: string | null;
  onStadiumData: (areaNames: string) => void;
  tooltipVisible: boolean;
  setTooltipVisible: (visible: boolean) => void;
}

interface Coordinates {
  x: number;
  y: number;
}

interface Zone {
  zone: string;
  coordinates: Coordinates;
}

interface Area {
  area_name: string;
  price: number;
  zones: Zone[];
}

interface Facility {
  facility_name: string;
  zones: Zone[];
}

interface StadiumData {
  stadium: string;
  info: string;
  areas: Area[];
  facilities: Facility[];
}

const StadiumMap = ({
  selectedPlayerId,
  playersHomerunData,
  error,
  onStadiumData,
  tooltipVisible,
  setTooltipVisible,
}: StadiumMapProps) => {
  const [isBallHit, setIsBallHit] = useState(false);

  useEffect(() => {
    resetBall();
    const hitTag = d3.select("#hit-tag");
    hitTag.classed("animate-bounce", true);
    setTimeout(() => {
      hitTag.classed("animate-bounce", false);
    }, 2000);
  }, [selectedPlayerId]);

  useEffect(() => {
    const svg = d3.select("#stadium-svg");

    const colors: { [key: string]: string } = {
      "중앙지정석": "#702CA4",
      "1루 응원지정석": "#C63737",
      "3루 응원지정석": "#C63737",
      "지니TV석": "#509336",
      "Y박스석": "#ED9342",
      "스카이박스": "#33D1FF",
      "스카이박스 구역": "#1F2937",
      "1루 스카이존": "#211C79",
      "3루 스카이존": "#211C79",
      "티빙 테이블석(외야)": "#DC7490",
      "외야잔디/자유석1": "#BDBDBD",
      "외야잔디/자유석2": "#BDBDBD",
      "1루 휠체어석": "#C63737",
      "3루 휠체어석": "#C63737",
      "키즈랜드 캠핑존": "#1F8DCC",
      "KT알파쇼핑석": "#CE4F9D",
      "지니존": "#4864CB",
      "익사이팅석": "#37A09B",
      "하이파이브존": "#37A09B",
      "Gate1-1": "#020c24",
      "Gate1-2": "#020c24",
      "Gate3-1": "#020c24",
      "Gate3-2": "#020c24",
      "Gate3-3": "#020c24",
      "1루 메인게이트": "#020c24",
      "3루 메인게이트": "#020c24",
      "화장실1": "#2ab8b8",
      "화장실2": "#2ab8b8",
      "매점1": "#ff7e42",
      "매점2": "#ff7e42",
      "매점3": "#ff7e42",
      "매점4": "#ff7e42",
      "매점5": "#ff7e42",
      "매점6": "#ff7e42",
      "매점7": "#ff7e42",
      "매점8": "#ff7e42",
    };

    d3.json("/data/stadium_coordinates.json")
      .then((data: StadiumData) => {
        const allCoordinates = [
          ...data.areas.flatMap((area: Area) =>
            area.zones.map((zone: Zone) => [
              zone.coordinates.x,
              zone.coordinates.y,
            ])
          ),
          ...data.facilities.flatMap((facility: Facility) =>
            facility.zones.map((zone: Zone) => [
              zone.coordinates.x,
              zone.coordinates.y,
            ])
          ),
        ];

        const minX = d3.min(allCoordinates, (d) => d[0]);
        const maxX = d3.max(allCoordinates, (d) => d[0]);
        const minY = d3.min(allCoordinates, (d) => d[1]);
        const maxY = d3.max(allCoordinates, (d) => d[1]);

        const padding = 300;
        const viewBox = `${minX! - padding} ${minY! - padding} ${
          maxX! - minX! + 2 * padding
        } ${maxY! - minY! + 2 * padding}`;
        svg.attr("viewBox", viewBox);

        const boundaryCoordinates = d3.polygonHull(allCoordinates);
        if (boundaryCoordinates) {
          const boundaryPadding = 200;
          const expandedBoundary = boundaryCoordinates.map(([x, y]) => {
            const angle = Math.atan2(
              y - (minY! + maxY!) / 2,
              x - (minX! + maxX!) / 2
            );
            return [
              x + boundaryPadding * Math.cos(angle),
              y + boundaryPadding * Math.sin(angle),
            ];
          });

          svg
            .insert("g", ":first-child")
            .attr("id", "boundary-group")
            .append("polygon")
            .attr("points", expandedBoundary.map((d) => d.join(",")).join(" "))
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 30)
            .attr("stroke-opacity", 0.5);
        }

        data.areas.forEach((area: Area) => {
          const areaGroup = svg.append("g").attr("class", "area-group");

          const seatRadius = 40;
          const auraRadius = seatRadius + 10;

          if (
            [
              "익사이팅석",
              "하이파이브존",
              "지니존",
              "KT알파쇼핑석",
              "키즈랜드 캠핑존",
              "외야잔디/자유석1",
              "외야잔디/자유석2",
            ].includes(area.area_name)
          ) {
            const points = area.zones.map((zone: Zone) => [
              zone.coordinates.x,
              zone.coordinates.y,
            ]);

            const line = d3
              .line()
              .x((d) => d[0])
              .y((d) => d[1])
              .curve(d3.curveBasisClosed);

            areaGroup
              .append("path")
              .attr("id", `path-${area.area_name}`)
              .attr("d", line(points))
              .attr("fill", colors[area.area_name] || "white")
              .attr("opacity", 0.6)
              .attr("stroke", colors[area.area_name] || "white")
              .attr("stroke-width", seatRadius * 2);

            const centerX = d3.mean(points, (d) => d[0]);
            const centerY = d3.mean(points, (d) => d[1]);

            defineAreaFontStyle(area, areaGroup);
          } else {
            area.zones.forEach((zone: Zone) => {
              const { x, y } = zone.coordinates;

              if (zone.zone === "<<< 스카이박스 >>>") {
                areaGroup
                  .append("text")
                  .attr("x", x)
                  .attr("y", y + 8)
                  .attr("text-anchor", "middle")
                  .attr("font-size", "35px")
                  .attr("font-weight", "bold")
                  .attr("fill", "white")
                  .text(zone.zone);
              } else {
                areaGroup
                  .append("circle")
                  .attr("cx", x)
                  .attr("cy", y)
                  .attr("r", auraRadius)
                  .attr("fill", colors[area.area_name] || "white")
                  .attr("opacity", 0.2);

                areaGroup
                  .append("circle")
                  .attr("cx", x)
                  .attr("cy", y)
                  .attr("r", seatRadius)
                  .attr("fill", colors[area.area_name] || "white")
                  .attr("stroke", "black")
                  .attr("stroke-width", 2);

                areaGroup
                  .append("text")
                  .attr("x", x)
                  .attr("y", y + 8)
                  .attr("text-anchor", "middle")
                  .attr("font-size", "24px")
                  .attr("font-weight", "bold")
                  .attr("fill", "white")
                  .text(zone.zone);
              }
            });
          }
        });

        const facilityWidth = 160;
        const facilityHeight = 70;

        data.facilities.forEach((facility: Facility) => {
          facility.zones.forEach((zone: Zone) => {
            const { x, y } = zone.coordinates;

            svg
              .append("rect")
              .attr("x", x - facilityWidth / 2)
              .attr("y", y - facilityHeight / 2)
              .attr("width", facilityWidth)
              .attr("height", facilityHeight)
              .attr("fill", colors[facility.facility_name] || "red")
              .attr("stroke", "black")
              .attr("stroke-width", 2);

            svg
              .append("text")
              .attr("x", x)
              .attr("y", y + 8)
              .attr("text-anchor", "middle")
              .attr("font-size", "24px")
              .attr("font-weight", "bold")
              .attr("fill", "white")
              .text(facility.facility_name);
          });
        });

        const batterX = 1820;
        const batterY = 2800;
        svg
          .append("image")
          .attr("id", "batter-image")
          .attr("href", hitterImage.src)
          .attr("x", batterX - 75)
          .attr("y", batterY - 75)
          .attr("width", 220)
          .attr("height", 220)
          .attr("transform-origin", `${batterX}px ${batterY}px`);

        resetBall();
      })
      .catch((error) => {
        console.error("Error loading the JSON file:", error);
      });
  }, []);

  useEffect(() => {
    const hitButton = d3.select("#hit-button");
    hitButton.on("click", () => {
      resetBall();
      animateBatter();
      setTooltipVisible(true);
      if (selectedPlayerId === null) {
        playersHomerunData.forEach((playerData) => {
          animateBall(
            playerData.x_coord,
            playerData.y_coord,
            playerData.playerId
          );
        });
      } else {
        const playerData = playersHomerunData.find(
          (player) => player.playerId == selectedPlayerId
        );
        if (playerData) {
          animateBall(
            playerData.x_coord,
            playerData.y_coord,
            playerData.playerId
          );
        }
      }
    });
  }, [playersHomerunData, selectedPlayerId]);

  function defineAreaFontStyle(
    area: Area,
    areaGroup: d3.Selection<SVGGElement>
  ) {
    const areaStyles: { [key: string]: { dy: string; startOffset: string } } = {
      "지니존": { dy: "-18", startOffset: "17%" },
      "KT알파쇼핑석": { dy: "-10", startOffset: "17%" },
      "익사이팅석": { dy: "10", startOffset: "17%" },
      "외야잔디/자유석1": { dy: "20", startOffset: "20%" },
      "외야잔디/자유석2": { dy: "20", startOffset: "20%" },
      "키즈랜드 캠핑존": { dy: "20", startOffset: "20%" },
      "하이파이브존": { dy: "15", startOffset: "11%" },
    };

    const defaultStyle = { dy: "-18", startOffset: "16%" };

    const style = areaStyles[area.area_name] || defaultStyle;

    areaGroup
      .append("text")
      .attr("dy", style.dy)
      .append("textPath")
      .attr("href", `#path-${area.area_name}`)
      .attr("startOffset", style.startOffset)
      .attr("text-anchor", "middle")
      .attr("font-size", "35px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text(area.area_name);
  }

  function animateBatter() {
    const batterX = 1820;
    const batterY = 2800;
    d3.select("#batter-image")
      .transition()
      .duration(100)
      .attr("x", batterX - 80)
      .transition()
      .duration(100)
      .attr("x", batterX - 70)
      .transition()
      .duration(100)
      .attr("x", batterX - 75)
      .on("end", () => {
        d3.select("#batter-image").attr("x", batterX - 75);
      });
  }

  const usedColors = new Set<string>();

  function getRandomColor(): string {
    let color;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      color = `hsl(${Math.random() * 360}, 100%, 75%)`;
      attempts++;
    } while (usedColors.has(color) && attempts < maxAttempts);

    usedColors.add(color);
    return color;
  }

  function animateBall(
    targetX: number,
    targetY: number,
    playerId: number,
    areaNames?: Set<string>,
    onAnimationEnd?: () => void
  ) {
    const svg = d3.select("#stadium-svg");
    const ball = svg
      .append("image")
      .attr("href", ballImage.src)
      .attr("class", "ball-image")
      .attr("x", 1820 - 30)
      .attr("y", 2800 - 30)
      .attr("width", 60)
      .attr("height", 60)
      .transition()
      .duration(1000 + Math.random() * 1000)
      .attr("x", targetX - 30)
      .attr("y", targetY - 30)
      .style("filter", "url(#fire-effect)")
      .on("end", () => {
        d3.select(ball.node() as SVGImageElement).style("filter", null);

        const randomColor = getRandomColor();

        svg
          .append("circle")
          .attr("class", "highlight-circle")
          .attr("cx", targetX)
          .attr("cy", targetY)
          .attr("r", 150)
          .attr("fill", randomColor)
          .attr("opacity", 0.5);

        getAreaName(targetX, targetY).then((areaName) => {
          areaNames.add(areaName);
          onAnimationEnd();
        });
      });

    setIsBallHit(true);
  }

  async function getAreaName(x: number, y: number): Promise<string> {
    let closestAreaName = "알 수 없음";
    let closestDistance = Infinity;
    const data: StadiumData = await d3.json("/data/stadium_coordinates.json");

    data.areas.forEach((area: Area) => {
      area.zones.forEach((zone: Zone) => {
        const { x: zoneX, y: zoneY } = zone.coordinates;
        const distance = Math.sqrt((x - zoneX) ** 2 + (y - zoneY) ** 2);
        if (distance < 500 && distance < closestDistance) {
          closestDistance = distance;
          closestAreaName = area.area_name;
        }
      });
    });

    return closestAreaName;
  }

  useEffect(() => {
    const hitButton = d3.select("#hit-button");
    hitButton.on("click", () => {
      resetBall();
      animateBatter();
      setTooltipVisible(false);
      const areaNames = new Set<string>();
      let animationsCompleted = 0;
      const totalAnimations =
        selectedPlayerId === null ? playersHomerunData.length : 1;

      const onAnimationEnd = () => {
        animationsCompleted += 1;
        if (animationsCompleted === totalAnimations) {
          const allAreaNames = Array.from(areaNames).join(", ");
          onStadiumData(allAreaNames);
        }
      };

      if (selectedPlayerId === null) {
        playersHomerunData.forEach((playerData) => {
          animateBall(
            playerData.x_coord,
            playerData.y_coord,
            playerData.playerId,
            areaNames,
            onAnimationEnd
          );
        });
      } else {
        const playerData = playersHomerunData.find(
          (player) => player.playerId == selectedPlayerId
        );
        if (playerData) {
          animateBall(
            playerData.x_coord,
            playerData.y_coord,
            playerData.playerId,
            areaNames,
            onAnimationEnd
          );
        }
      }
    });
  }, [playersHomerunData, selectedPlayerId]);

  function resetBall() {
    const svg = d3.select("#stadium-svg");
    svg.selectAll(".ball-image").remove();
    svg.selectAll(".highlight-circle").remove();
    setIsBallHit(false);
  }

  return (
    <div className="relative w-full h-full">
      <p>{error}</p>
      <div className="fixed m-5">
        <div className="relative" id="hit-tag">
          <span
            className={`z-10 tooltiptext text-center rounded-lg p-2 bg-black text-white absolute bottom-full left-1/2 transform -translate-x-1/2 w-[150px] mb-1 ${
              tooltipVisible ? "opacity-70" : "opacity-0"
            }`}
          >
            아래 버튼을 클릭하여 <br />
            홈런볼을 날려보세요!
          </span>
          <button
            id="hit-button"
            className="border-4  border-[#d60c0c] z-10 bg-white p-1 duration-300 shadow-md rounded-full  "
          >
            <img
              src="/images/homerunBtn.png"
              alt="홈런클릭버튼"
              className="size-24 object-contain rounded-full"
            />
          </button>
        </div>
      </div>

      <svg
        id="stadium-svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full bg-gray-800"
      >
        <defs>
          <filter id="fire-effect">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
            />
            <feDisplacementMap in="SourceGraphic" scale="30" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0.6 0 0 0  0 0 0.6 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default StadiumMap;
