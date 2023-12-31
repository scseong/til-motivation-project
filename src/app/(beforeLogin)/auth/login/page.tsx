'use client';
import Link from 'next/link';
import styles from './login.module.scss';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/utils/regex';
import {
  createUserDoc,
  githubProvider,
  googleProvider,
  logInWithEmailAndPassword
} from '@/shared/auth';
import { ERRORS } from '@/shared/error';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '@/shared/firebase';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid }
  } = useForm<LoginFormInput>({ defaultValues: { email: '', password: '' }, mode: 'onChange' });
  const { email: isDirtyEmail, password: isDirtyPassword } = dirtyFields;
  const isValidBtn = isDirtyEmail && isDirtyPassword && isValid;
  const [logInError, setLogInError] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const result = await logInWithEmailAndPassword(data.email, data.password);
    if (typeof result !== 'boolean') {
      const { errors } = result;
      setLogInError(ERRORS[errors]);
    } else {
      router.push('/');
    }
  };

  const signInWithGithub = async () => {
    const { user } = await signInWithPopup(auth, githubProvider);

    if (!user) return;

    const metadata = user.metadata;
    if (metadata.creationTime === metadata.lastSignInTime) {
      createUserDoc(user);
    }
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`
      }
    });
    if (res.status === 200) router.push('/');
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);

    if (!user) return;

    const metadata = user.metadata;
    if (metadata.creationTime === metadata.lastSignInTime) {
      createUserDoc(user);
    }
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`
      }
    });
    if (res.status === 200) router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>로그인</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: EMAIL_REGEX,
                  message: '유효한 이메일 형식이 아닙니다.'
                }
              })}
              id="email"
              placeholder="이메일 입력"
            />
            <div className={styles.error}>
              <p>{errors.email && errors.email.message}</p>
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: PASSWORD_REGEX,
                  message: '영문, 숫자 포함 6자 이상 입력해주세요.'
                }
              })}
              id="password"
              type="password"
              placeholder="비밀번호 입력 (영문 숫자 포함 6자 이상)"
            />
            <div className={styles.error}>
              <p>{errors.password && errors.password.message}</p>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button
              className={isValidBtn ? styles.active : ''}
              disabled={!isValidBtn}
              type="submit"
            >
              이메일로 로그인
            </button>
          </div>
          {logInError && (
            <div className={styles.error}>
              <p>{logInError}</p>
            </div>
          )}
          <div className={styles.divide}>
            <span>또는</span>
          </div>
          <div className={styles.btnBox}>
            <button className={styles.google} type="button" onClick={signInWithGoogle}>
              <FaGoogle size="14px" /> 구글 로그인
            </button>
          </div>
          <div className={styles.btnBox}>
            <button className={styles.github} type="button" onClick={signInWithGithub}>
              <FaGithub size="14px" /> 깃허브 로그인
            </button>
          </div>
          <div className={styles.link}>
            <p>
              아직 회원이 아니신가요? <Link href="/auth/signup">가입하기</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
