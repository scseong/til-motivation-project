import { Timestamp } from 'firebase/firestore';

export interface Post {
  psid: string;
  displayName: string;
  photoUrl: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  blogURL: string;
  likesUser: string[];
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
