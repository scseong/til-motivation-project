import { db } from '@/shared/firebase';
import { UserProfile } from '@/typing/User';
import { doc, getDoc } from 'firebase/firestore';

export const getUserProfile = async (uid: string): Promise<UserProfile | undefined> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as UserProfile) : undefined;
};
