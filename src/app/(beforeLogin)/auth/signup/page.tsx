'use client';
import Link from 'next/link';
import styles from './signup.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SignUpInput {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  blogUrl: string;
}

export default function Page() {
  const { register, handleSubmit } = useForm<SignUpInput>();
  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>회원가입</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input {...register('email')} id="email" type="email" placeholder="이메일 입력" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="nickname">닉네임</label>
            <input {...register('nickname')} id="nickname" type="text" placeholder="닉네임 입력" />
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
          <div className={styles.inputBox}>
            <label htmlFor="password-check">비밀번호 확인</label>
            <input
              {...register('passwordCheck')}
              id="password-check"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="blog-url">블로그 주소</label>
            <input
              {...register('blogUrl')}
              id="blog-url"
              type="url"
              placeholder="TIL 블로그 주소"
            />
          </div>
          <div className={styles.btnBox}>
            <button>회원가입</button>
          </div>
          <div className={styles.link}>
            <p>
              이미 회원이신가요? <Link href="/auth/login">로그인하기</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
