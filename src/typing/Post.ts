import { UserName } from './User';

export interface Post {
  psid: string;
  displayName: string;
  photoUrl: string;
  title: string;
  content: string;
  createdAt: Date;
  blogUrl: string;
  likesUser: UserName[];
  tags: string[];
}
