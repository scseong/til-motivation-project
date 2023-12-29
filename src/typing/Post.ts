import { UserName } from './User';

export interface Post {
  psid: string;
  displayName: string;
  photoURL: string;
  title: string;
  content: string;
  createdAt: Date;
  blogURL: string;
  likesUser: UserName[];
  tags: string[];
}
