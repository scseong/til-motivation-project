import { Profile } from './Profile';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export type UserProfile = Omit<User & Profile, 'pfid'>;

export const user: UserProfile = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  blogURL: '',
  comment: '',
  followers: [],
  followings: [],
  lastPostCreatedAt: undefined,
  continueDays: 0,
  count: {
    followers: 0,
    followings: 0
  }
};
