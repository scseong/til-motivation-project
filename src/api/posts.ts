import { Post } from '@/typing/Post';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../shared/firebase';
import { UserName } from '@/typing/User';
import { displayName } from 'react-quill';

const postsRef = collection(db, 'posts');

export const getPosts = async (): Promise<Post[]> => {
  const res = await getDocs(postsRef);
  const posts = res.docs.map((doc) => ({
    psid: doc.id,
    ...(doc.data() as Omit<Post, 'psid'>)
  }));
  return posts;
};

export const addPosts = async (post: Omit<Post, 'psid'>) => {
  const result = await addDoc(postsRef, post);
  return result.id;
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

export const getPostDetail = async (postId: string) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const getMyPost = async (displayName: string): Promise<Post[]> => {
  const q = query(postsRef, where('displayName', '==', displayName));
  const querySnapshot = await getDocs(q);
  const myPosts = querySnapshot.docs.map((doc) => ({
    psid: doc.id,
    ...(doc.data() as Omit<Post, 'psid'>)
  }));
  return myPosts;
};

export const getLikePost = async (displayName: string): Promise<Post[]> => {
  const q = query(postsRef, where('likesUser', '==', displayName));
  const querySnapshot = await getDocs(q);
  const myPosts = querySnapshot.docs.map((doc) => ({
    psid: doc.id,
    ...(doc.data() as Omit<Post, 'psid'>)
  }));
  return myPosts;
};
