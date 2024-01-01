import { Timestamp } from 'firebase/firestore';
import { UserName } from './User';

export interface Post {
  psid?: string;
  displayName: string;
  photoUrl: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  blogURL: string;
  likesUser: UserName[];
  tags: string[];
  openGraph: openGraph | undefined;
}
export type openGraph = {
  title: string;
  description: string;
  url: string;
  image?: string;
};
