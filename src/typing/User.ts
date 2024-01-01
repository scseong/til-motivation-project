import { Profile } from './Profile';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export type UserName = Pick<User, 'displayName'>;

export type UserProfile = Omit<User & Profile, 'pfid'>;

const user: UserProfile = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  blogURL: '',
  comment: '',
  followers: [],
  followings: [],
  continousDays: 0,
  count: {
    followers: 0,
    followings: 0
  }
};
