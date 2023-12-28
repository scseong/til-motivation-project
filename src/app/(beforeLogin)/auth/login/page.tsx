'use client';
import Link from 'next/link';
import styles from './login.module.scss';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function Page() {
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>로그인</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input {...register('email')} id="email" type="email" placeholder="이메일 입력" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="비밀번호 입력"
            />
          </div>
          <div className={styles.btnBox}>
            <button type="submit">이메일로 로그인</button>
          </div>
          <div className={styles.divide}>
            <span>또는</span>
          </div>
          <div className={styles.btnBox}>
            <button className={styles.google}>
              <FaGoogle size="14px" /> 구글 로그인
            </button>
          </div>
          <div className={styles.btnBox}>
            <button className={styles.github}>
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
