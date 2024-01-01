// firebaseUtils.ts
interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}
export type formatDate = {
  year: number;
  month: number;
  day: number;
};

export const formatFirebaseTimestamp = (firebaseTimestamp: FirebaseTimestamp): formatDate => {
  const timestampToDate = (timestamp: FirebaseTimestamp): Date => {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    return new Date(milliseconds);
  };

  const formatDate = (date: Date): formatDate => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();

    // 2023, 4, 8 형식으로 포맷팅
    return { year, month, day };
  };

  const dateObject = timestampToDate(firebaseTimestamp);
  return formatDate(dateObject);
};
