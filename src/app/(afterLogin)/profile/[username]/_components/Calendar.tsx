'use client';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { formatDate, formatFirebaseTimestamp } from './converter';

const timestamp1 = { seconds: 1670470800, nanoseconds: 0 };
const timestamp2 = { seconds: 1672561200, nanoseconds: 0 };
const timestamp3 = { seconds: 1675153200, nanoseconds: 0 };
const timestamp4 = { seconds: 1677831600, nanoseconds: 0 };

interface HeatmapData {
  date: Date;
  count: number;
}
const timestamp = { seconds: 1670470800, nanoseconds: 0 };
export default function Calendar() {
  // console.log(formatFirebaseTimestamp(timestamp1));

  // console.log(new Date(timestamp1.seconds * 1000));
  // console.log(new Date(1670470800 * 1000));
  // console.log(new Date(2023, 6, 5));

  console.log(new Date(Date.now()));

  const startDate = new Date(2023, 6, 1); // 2023년 1월 1일
  // const endDate = new Date(2023, 11, 31); // 2023년 12월 31일
  const endDate = new Date(Date.now());

  console.log(startDate);
  console.log(endDate);

  // console.log(new Date(endDate.setMonth(endDate.getMonth() - 6)));
  const importantDates: Date[] = [
    new Date(1670470800 * 1000), // 5월 8일
    new Date(2023, 6, 5), // 7월 5일
    new Date(2023, 11, 11) // 12월 11일
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
  );
}
// /**user의 post를 가져와서 timestamp를 뽑는다.
//  * timestamp를 yyyy-mm-dd로 변환하고
//  * day에 넣기 value는 그냥 1?
//  * projects?
// */
