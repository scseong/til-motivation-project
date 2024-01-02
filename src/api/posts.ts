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
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { FormData } from '@/app/(afterLogin)/profile/[username]/_components/UpdateModal';

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
  await addDoc(postsRef, post);
};

export const addPostLikeUser = async (psid: string, displayName: string) => {
  const postRef = doc(db, 'posts', psid);
  return updateDoc(postRef, {
    likesUser: arrayUnion(displayName)
  });
};

export const removePostLikeUser = async (psid: string, displayName: string) => {
  const postRef = doc(db, 'posts', psid);
  return updateDoc(postRef, {
    likesUser: arrayRemove(displayName)
  });
};

export const getPostDetail = async (postId: string): Promise<Post> => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Post;
};

const getMyPosts = async (displayName: string): Promise<Post[]> => {
  const q = query(postsRef, where('displayName', '==', displayName));
  //orderBy('createdAt', 'desc')) 적용시 에러발생
  const querySnapshot = await getDocs(q);
  const myPosts = querySnapshot.docs
    .map((doc) => ({
      psid: doc.id,
      ...(doc.data() as Omit<Post, 'psid'>)
    }))
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  return myPosts;
};
export const useProfilePostsQuery = (displayName: string): UseQueryResult<Post[], Error> => {
  return useQuery<Post[], Error>({
    queryKey: ['myPosts', 0],
    queryFn: () => getMyPosts(displayName)
  });
};

const getLikePosts = async (displayName: string): Promise<Post[]> => {
  const q = query(postsRef, where('likesUser', 'array-contains', displayName));
  const querySnapshot = await getDocs(q);
  const myPosts = querySnapshot.docs
    .map((doc) => ({
      psid: doc.id,
      ...(doc.data() as Omit<Post, 'psid'>)
    }))
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  return myPosts;
};
export const useLikePostsQuery = (displayName: string): UseQueryResult<Post[], Error> => {
  return useQuery<Post[], Error>({
    queryKey: ['likePosts', 'profilePosts'],
    queryFn: () => getLikePosts(displayName)
  });
};

export const updateUserProfile = async (data: FormData) => {
  const userRef = doc(db, 'users', data.uid);
  return await updateDoc(userRef, {
    displayName: data.nickname,
    comment: data.editComment,
    blogURL: data.email
  });
};
