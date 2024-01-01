import { UserName } from './User';

export interface Profile {
  pfid: string;
  uid: string;
  blogURL: string;
  followers: UserName[];
  followings: UserName[];
  continousDays: number;
  comment: string;
  count: {
    followers: number;
    followings: number;
  };
}
