'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/shared/firebase';
import { ChildrenProp } from '@/typing/props';
import { getUser } from '@/shared/auth';
import { UserProfile } from '@/typing/User';

const AuthContext = createContext<{ user: UserProfile | null }>({
  user: null
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: ChildrenProp) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchData(uid: string) {
      const response = await getUser(uid);
      return response;
    }

    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
      } else {
        // const token = await user.getIdToken();
        const user_profile = (await fetchData(user.uid)) as UserProfile;
        setUser(user_profile);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
