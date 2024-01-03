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
  userRef: string;
};
export default function Calendar({ heatMapData, userRef }: Props) {
  const startDate = new Date(2023, 6, 3);
  const endDate = new Date(2024, 0, 3);

  const importantDates: Date[] = [];
  heatMapData
    .map((date) => formatFirebaseTimestamp(date))
    .forEach((date) => importantDates.push(new Date(date.year, date.month, date.day)));

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
        onClick={() => alert('잘생겼다 갖고싶다 스윗챌린저 손.창.성')}
      />
    </>
  );
}
