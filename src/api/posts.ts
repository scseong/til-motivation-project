import { Post } from '@/typing/Post';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../shared/firebase';

const postsRef = collection(db, 'posts');

export const getPosts = async (): Promise<Post[]> => {
  const res = await getDocs(postsRef);
  const posts = res.docs.map((doc) => ({
    psid: doc.id,
    ...(doc.data() as Omit<Post, 'psid'>)
  }));
  return posts;
};

export const addPosts = async (post: Post) => {
  await addDoc(postsRef, post);
};
