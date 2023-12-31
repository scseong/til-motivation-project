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
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
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
    createUserDoc({ ...user, blogURL });
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
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
};

export const userStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

const createUserDoc = async (user: User & { blogURL: string }) => {
  const { uid, email, displayName, photoURL, blogURL } = user;
  const userInfo = {
    uid,
    email,
    displayName,
    photoURL,
    blogURL,
    followers: [],
    followings: [],
    continueDays: 0,
    count: {
      Followers: 0,
      Followings: 0
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
