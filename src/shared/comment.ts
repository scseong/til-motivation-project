import { Post } from '@/typing/Post';
import { db } from './firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Comment } from '@/typing/Post';

export const getComments = async (postId: string) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const comments = docSnap.data().comments as Comment[];
    return comments.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
};

export const deleteComment = async (comment: Comment) => {
  const postId = comment.psid;
  const docRef = doc(db, 'posts', postId);
  return await updateDoc(docRef, {
    comments: arrayRemove(comment)
  });
};

export const addComment = async (comment: Comment) => {
  return await updateDoc(doc(db, 'posts', comment.psid), {
    comments: arrayUnion(comment)
  });
};

export const updateComment = async ({ comment, text }: { comment: Comment; text: string }) => {
  deleteComment(comment);
  const updated = { ...comment, content: text };
  addComment(updated);
};
