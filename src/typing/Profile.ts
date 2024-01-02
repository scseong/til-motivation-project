import { Timestamp } from 'firebase/firestore';

export interface Profile {
  pfid: string;
  uid: string;
  blogURL: string;
  followers: string[];
  followings: string[];
  continueDays: number;
  comment: string;
  lastPostCreatedAt: Timestamp | undefined;
  count: {
    followers: number;
    followings: number;
  };
}
