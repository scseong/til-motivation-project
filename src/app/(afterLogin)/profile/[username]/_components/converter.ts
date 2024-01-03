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
    const month = date.getMonth();
    const day = date.getDate();

    return { year, month, day };
  };

  const dateObject = timestampToDate(firebaseTimestamp);
  return formatDate(dateObject);
};
