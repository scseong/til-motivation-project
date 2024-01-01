import { Post } from '@/typing/Post';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { db } from '../shared/firebase';
import { UserName } from '@/typing/User';

const postsRef = collection(db, 'posts');

export const getPosts = async (): Promise<Post[]> => {
  const res = await getDocs(postsRef);
  const posts = res.docs.map((doc) => ({
    psid: doc.id,
    ...(doc.data() as Omit<Post, 'psid'>)
  }));
  return posts;
};

export const setPosts = async (post: Post) => {
  await addDoc(postsRef, post);
};

export const addPostLikeUser = async (psid: string, displayName: UserName) => {
  const postRef = doc(db, 'posts', psid);
  return updateDoc(postRef, {
    likesUser: arrayUnion(displayName)
  });
};

export const removePostLikeUser = async (psid: string, displayName: UserName) => {
  const postRef = doc(db, 'posts', psid);
  return updateDoc(postRef, {
    likesUser: arrayRemove(displayName)
  });
};
