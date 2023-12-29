import { UserName } from './User';

export interface Profile {
  pfid: string;
  uid: string;
  blogURL: string;
  followers: UserName[];
  followings: UserName[];
  continousDays: number;
  count: {
    Followers: number;
    Followings: number;
  };
}
