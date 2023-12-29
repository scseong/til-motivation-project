import { Timestamp } from 'firebase/firestore';
import { UserName } from './User';

export interface Post {
  psid: string;
  displayName: string;
  photoURL: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  blogURL: string;
  likesUser: UserName[];
  tags: string[];
}
