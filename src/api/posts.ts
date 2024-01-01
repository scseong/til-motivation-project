import { Post } from '@/typing/Post';
import { setDoc, addDoc, doc, collection, getDocs, getDoc, onSnapshot } from 'firebase/firestore';
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

export const setPosts = async (post: Post) => {
  await addDoc(postsRef, post);
};

export const getPostDetail = async (postId: string) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};
