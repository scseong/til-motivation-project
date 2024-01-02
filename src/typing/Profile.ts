export interface Profile {
  pfid: string;
  uid: string;
  blogURL: string;
  followers: string[];
  followings: string[];
  continueDays: number;
  comment: string;
  count: {
    followers: number;
    followings: number;
  };
}
