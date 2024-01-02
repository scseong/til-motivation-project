import { Timestamp } from 'firebase/firestore';
import { UserName } from './User';

export interface Post {
  psid: string;
  uid: string;
  displayName: string;
  photoUrl: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  blogURL: string;
  likesUser: UserName[];
  tags: string[];
  openGraph: openGraph | undefined;
  comments: Comment[];
}

export type openGraph = {
  title: string;
  description: string;
  url: string;
  image?: string;
};

export interface Comment {
  cid: string;
  psid: string;
  displayName: string;
  content: string;
  photoUrl: string;
  createdAt: Timestamp;
}
