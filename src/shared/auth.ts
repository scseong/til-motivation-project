import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from './firebase';
import { ErrorResponse } from './error';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { APIResponse } from '@/typing/API';

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
githubProvider.setCustomParameters({ prompt: 'select_account' });

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | ErrorResponse> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return { errors: error.code };
    });
};

interface SignupProp {
  email: string;
  password: string;
  nickname: string;
  blogURL: string;
}

export const signUpWithEmailAndPassword = async ({
  email,
  nickname,
  password,
  blogURL
}: SignupProp): Promise<User | ErrorResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: nickname });
    createUserDoc({ ...user });
    return user;
  } catch (error: any) {
    return { errors: error.code };
  }
};

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
};

export const signInWithGithub = async () => {
  return signInWithPopup(auth, githubProvider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
};

export const logout = async () => {
  try {
    await signOut(auth);
    const res = await fetch('/api/auth/logout', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { success } = (await res.json()) as APIResponse<string>;
    return success;
  } catch (error) {
    return false;
  }
};

const getRandomPosition = () => {
  const position = ['프론트엔드', '서버', '안드로이드', '백엔드'];
  const randomPosition = position[Math.floor(Math.random() * position.length)];
  return `안녕하세요! ${randomPosition} 개발자를 꿈꾸는 코린이 입니다!`;
};

export const createUserDoc = async (user: User) => {
  const { uid, email, displayName, photoURL } = user;
  const userInfo = {
    uid,
    email,
    displayName,
    comments: getRandomPosition(),
    photoURL: photoURL || '',
    blogURL: '',
    followers: [],
    followings: [],
    continueDays: 0,
    count: {
      followers: 0,
      followings: 0
    }
  };
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, { ...userInfo });
};

export const checkDisplayNameExists = async (displayName: string) => {
  const q = query(collection(db, 'users'), where('displayName', '==', displayName));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const getUser = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const querySnapshot = await getDoc(userRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data();
  }
};
