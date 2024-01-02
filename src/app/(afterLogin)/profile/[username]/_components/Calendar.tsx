'use client';
import { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { formatFirebaseTimestamp } from './converter';

interface HeatmapData {
  date: Date;
  count: number;
}

export default function Calendar() {
  //오늘 기준 -6개월 데이터 동적 생성필요
  const startDate = new Date(2023, 6, 3);
  const endDate = new Date(2024, 0, 3);

  const convertDate = formatFirebaseTimestamp({ seconds: 1704164645, nanoseconds: 788000000 });
  const importantDates: Date[] = [
    new Date(1704164645 * 1000), // 7월 5일
    new Date(convertDate.year, convertDate.month, convertDate.day) // 12월 11일
  ];

  const heatmapData: HeatmapData[] = Array.from({ length: 365 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return {
      date,
      count: importantDates.some((date) => date.getTime() === date.getTime()) ? 1 : 0
    };
  });

  return (
    <>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty';
          }

          if (importantDates.some((date) => date.getTime() === value.date.getTime())) {
            return 'color-blue';
          }

          return 'color-empty';
        }}
        showWeekdayLabels={true}
        onClick={(value) => alert(`Clicked on value with count: ${value.count}`)}
      />
    </>
  );
}
// /**user의 post를 가져와서 timestamp를 뽑는다.
//  * timestamp를 yyyy-mm-dd로 변환하고
//  * day에 넣기 value는 그냥 1?
//  * projects?
// */
