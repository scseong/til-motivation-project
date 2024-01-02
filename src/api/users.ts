import { db } from '@/shared/firebase';
import { UserProfile } from '@/typing/User';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const usersRef = collection(db, 'users');

export const getUsers = async (): Promise<UserProfile[]> => {
  const res = await getDocs(usersRef);
  const users = res.docs.map((doc) => doc.data() as UserProfile);
  return users;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | undefined> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as UserProfile) : undefined;
};
