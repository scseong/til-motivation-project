import { db } from '@/shared/firebase';
import { UserProfile } from '@/typing/User';
import { collection, getDocs } from 'firebase/firestore';

const usersRef = collection(db, 'users');

export const getUsers = async (): Promise<UserProfile[]> => {
  const res = await getDocs(usersRef);
  const users = res.docs.map((doc) => doc.data() as UserProfile);
  return users;
};
