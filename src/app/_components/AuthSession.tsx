'use client';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '@/shared/firebase';
import { ChildrenProp } from '@/typing/props';
import { getUser } from '@/shared/auth';
import { UserProfile } from '@/typing/User';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext<{ user: UserProfile | null }>({
  user: null
});

export function AuthProvider({ children }: ChildrenProp) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user_profile = (await getUser(user.uid)) as UserProfile;
        setUser(user_profile);
      } else {
        setUser(null);
      }
      setInit(true);
    });
  }, []);

  // TODO: Cookie 사용한 Auth
  //   return auth.onIdTokenChanged(async (user) => {
  //     if (!user) {
  //       setUser(null);
  //     } else {
  //       const user_profile = (await getUser(user.uid)) as UserProfile;
  //       setUser(user_profile);
  //     }

  useEffect(() => {
    const refreshToken = setInterval(
      async () => {
        const { currentUser } = getAuth();
        if (currentUser) await currentUser.getIdToken(true);
      },
      10 * 60 * 1000
    );

    return () => clearInterval(refreshToken);
  }, []);

  const userState = useMemo(
    () => ({
      user
    }),
    [user]
  );

  return <AuthContext.Provider value={{ ...userState }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
