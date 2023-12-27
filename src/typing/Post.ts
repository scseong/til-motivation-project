import { UserName } from './User';

export interface Post {
  psid: string;
  displayName: string;
  photoURL: string;
  title: string;
  content: string;
  created_at: Date;
  blog_url: string;
  likes_user: UserName[];
  tags: string[];
  comments: [
    {
      cid: string;
      displayName: string;
      photoURL: string;
      content: string;
      created_at: Date;
    }
  ];
}
