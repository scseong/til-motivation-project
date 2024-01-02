'use client';
import { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { formatFirebaseTimestamp } from './converter';
import { Timestamp } from 'firebase/firestore';

interface HeatmapData {
  date: Date;
  count: number;
}
type Props = {
  heatMapData: Timestamp[];
};
export default function Calendar({ heatMapData }: Props) {
  //오늘 기준 -6개월 데이터 동적 생성필요
  const startDate = new Date(2023, 6, 3);
  const endDate = new Date(2024, 0, 3);
  // const importantDates: Date[] = heatMapData.map((createdAt) => new Date(createdAt.seconds * 1000));
  // console.log(importantDates);
  const importantDates: Date[] = [new Date(1704164645 * 1000), new Date(24, 0, 1)];

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
        // onClick={(value) => alert(`Clicked on value with count: ${value.count}`)}
      />
    </>
  );
}
