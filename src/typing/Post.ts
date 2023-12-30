import { Timestamp } from 'firebase/firestore';
import { UserName } from './User';

export interface Post {
  psid: string;
  displayName: string;
  photoUrl: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  blogURL: string | undefined;
  likesUser: UserName[];
  tags: string[];
}
