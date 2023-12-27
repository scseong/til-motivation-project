import { UserName } from './User';

export interface Profile {
  pfid: string;
  uid: string;
  blogURL: string;
  followers: UserName[];
  followings: UserName[];
  continue_days: number;
  count: {
    Followers: number;
    Followings: number;
  };
}
