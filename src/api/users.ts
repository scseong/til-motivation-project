import { FormData } from '@/app/(afterLogin)/profile/[username]/_components/UpdateModal';
import { db } from '@/shared/firebase';
import { UserProfile } from '@/typing/User';
import { collection, getDocs, doc, getDoc, updateDoc, increment } from 'firebase/firestore';

const usersRef = collection(db, 'users');

export const getUsers = async (): Promise<UserProfile[]> => {
  const res = await getDocs(usersRef);
  const users = res.docs.map((doc) => doc.data() as UserProfile);
  return users;
};

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as UserProfile;
};

export const updateUserLastPostCreatedAt = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  return updateDoc(userRef, {
    lastPostCreatedAt: new Date()
  });
};

export const increaseUserContinueDays = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  return updateDoc(userRef, {
    continueDays: increment(1)
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
