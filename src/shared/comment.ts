import { Post } from '@/typing/Post';
import { db } from './firebase';
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  arrayUnion
} from 'firebase/firestore';
import { Comment } from '@/typing/Post';

export const getComments = async (postId: string) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const comments = docSnap.data().comments as Comment[];
    console.log('comments', comments);
    return comments.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
};

export const deleteComment = async (commentId: string) => {
  const deleted = query(collection(db, 'comments'), where('cid', '==', commentId));
  const data = await getDocs(deleted);
  return await deleteDoc(data.docs[0].ref);
};

export const addComment = async (comment: Comment) => {
  // const commentRef = doc(db, 'posts', comment.psid, 'comments', comment.cid);
  // await setDoc(commentRef, comment);
  await updateDoc(doc(db, 'posts', comment.psid), {
    comments: arrayUnion(comment)
  });
};
