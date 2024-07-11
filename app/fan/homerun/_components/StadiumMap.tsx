"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import hitterImage from "@/public/images/hitter.png";
import ballImage from "@/public/images/home-run-ball.png";

interface StadiumMapProps {
  selectedCard: number | null;
}

const StadiumMap = ({ selectedCard }: StadiumMapProps) => {
  const [isBallHit, setIsBallHit] = useState(false);

  useEffect(() => {
    if (selectedCard !== null) {
      const hitButton = d3.select("#hit-button");
      hitButton.classed("animate-bounce", true);
      setTimeout(() => {
        hitButton.classed("animate-bounce", false);
      }, 2000);
    }
  }, [selectedCard]);

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
    };

    d3.json("/data/stadium_coordinates.json")
      .then((data: any) => {
        const allCoordinates = [
          ...data.areas.flatMap((area: any) =>
            area.zones.map((zone: any) => [
              zone.coordinates.x,
              zone.coordinates.y,
            ])
          ),
          ...data.facilities.flatMap((facility: any) =>
            facility.zones.map((zone: any) => [
              zone.coordinates.x,
              zone.coordinates.y,
            ])
          ),
        ];

        const minX = d3.min(allCoordinates, (d) => d[0]);
        const maxX = d3.max(allCoordinates, (d) => d[0]);
        const minY = d3.min(allCoordinates, (d) => d[1]);
        const maxY = d3.max(allCoordinates, (d) => d[1]);
        console.log(minX, maxX);
        console.log(minY, maxY);

        const padding = 300;
        const viewBox = `${minX - padding} ${minY - padding} ${
          maxX - minX + 2 * padding
        } ${maxY - minY + 2 * padding}`;
        svg.attr("viewBox", viewBox);

        const boundaryCoordinates = d3.polygonHull(allCoordinates);
        if (boundaryCoordinates) {
          const boundaryPadding = 200;
          const expandedBoundary = boundaryCoordinates.map(([x, y]) => {
            const angle = Math.atan2(
              y - (minY + maxY) / 2,
              x - (minX + maxX) / 2
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

        data.areas.forEach((area: any) => {
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
            const points = area.zones.map((zone: any) => [
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

            // 경로 중앙에 텍스트 추가
            const centerX = d3.mean(points, (d) => d[0]);
            const centerY = d3.mean(points, (d) => d[1]);

            areaGroup
              .append("text")
              .append("textPath")
              .attr("href", `#path-${area.area_name}`) // 경로 ID 참조
              .attr("startOffset", "20%") // 경로의 중간에 배치
              // .attr("x", centerX)
              // .attr("y", centerY)
              .attr("text-anchor", "middle")
              .attr("font-size", "26px")
              .attr("font-weight", "bold")
              .attr("fill", "white")
              .text(area.area_name);
          } else {
            // 각 영역의 좌석(zone) 처리
            area.zones.forEach((zone: any) => {
              const { x, y } = zone.coordinates;

              if (zone.zone === "<<< 스카이박스 >>>") {
                areaGroup
                  .append("text")
                  .attr("x", x)
                  .attr("y", y + 8)
                  .attr("text-anchor", "middle")
                  .attr("font-size", "26px")
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

        data.facilities.forEach((facility: any) => {
          facility.zones.forEach((zone: any) => {
            const { x, y } = zone.coordinates;

            svg
              .append("rect")
              .attr("x", x - facilityWidth / 2)
              .attr("y", y - facilityHeight / 2)
              .attr("width", facilityWidth)
              .attr("height", facilityHeight)
              .attr("fill", "red")
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
        const batterY = 1800;
        const batter = svg
          .append("image")
          .attr("id", "batter-image")
          .attr("href", hitterImage.src)
          .attr("x", batterX - 75)
          .attr("y", batterY - 75)
          .attr("width", 220)
          .attr("height", 220)
          .attr("transform-origin", `${batterX}px ${batterY}px`);

        function animateBatter() {
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

        const ball = svg
          .append("image")
          .attr("id", "ball-image")
          .attr("href", ballImage.src)
          .attr("x", batterX - 30)
          .attr("y", batterY - 30)
          .attr("width", 60)
          .attr("height", 60);

        const initialBallX = batterX - 30;
        const initialBallY = batterY - 30;

        function animateBall(targetX: number, targetY: number) {
          animateBatter();

          d3.select("#ball-image")
            .transition()
            .duration(1000)
            .attr("x", targetX - 30)
            .attr("y", targetY - 30)
            .style("filter", "url(#fire-effect)")
            .on("end", () => {
              d3.select("#ball-image").style("filter", null);
              svg
                .append("circle")
                .attr("class", "highlight-circle")
                .attr("cx", targetX)
                .attr("cy", targetY)
                .attr("r", 300)
                .attr("fill", "lightgreen")
                .attr("opacity", 0.5);
              setIsBallHit(true);
            });
        }

        function resetBall() {
          d3.select("#ball-image")
            .transition()
            .duration(1000)
            .attr("x", initialBallX)
            .attr("y", initialBallY)
            .on("end", () => {
              setIsBallHit(false);
              svg.selectAll(".highlight-circle").remove();
            });
        }

        d3.select("#hit-button").on("click", () => {
          const targetX = 1000;
          const targetY = 1800;
          animateBall(targetX, targetY);
        });

        d3.select("#reset-button").on("click", () => {
          resetBall();
        });
      })
      .catch((error) => {
        console.error("Error loading the JSON file:", error);
      });
  }, []);

  return (
    <div className="relative w-full h-full">
      {isBallHit ? (
        <button
          id="reset-button"
          className="absolute  bottom-20 right-20 z-10 bg-white p-5 rounded"
        >
          공 복귀
        </button>
      ) : (
        <button
          id="hit-button"
          className="absolute  bottom-20 right-20 z-10 bg-white p-5  rounded"
        >
          홈런볼 치기
        </button>
      )}
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
