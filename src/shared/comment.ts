import { db } from './firebase';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { Comment } from '@/typing/Comment';

export const getComments = async (postId: string) => {
  const data: Comment[] = [];
  const q = query(collection(db, 'comments'), where('psid', '==', postId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const createdAt = doc.data().createdAt;
    const formatCreatedAt = createdAt.toDate();
    data.push({
      ...doc.data(),
      createdAt: formatCreatedAt
    } as Comment);
  });
  console.log('data', data);
  return data;
};

export const addComment = async (comment: Comment) => {
  return await addDoc(collection(db, 'comments'), comment);
};
