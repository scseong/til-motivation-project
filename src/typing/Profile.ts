export interface Profile {
  pfid: string;
  uid: string;
  blogURL: string;
  followers: string[];
  followings: string[];
  continousDays: number;
  comment: string;
  count: {
    followers: number;
    followings: number;
  };
}
