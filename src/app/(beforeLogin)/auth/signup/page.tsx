'use client';
import Link from 'next/link';
import styles from './signup.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BLOG_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@/util/regex';
import { useEffect } from 'react';

interface SignUpInput {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  blogUrl: string;
}

const defaultValues = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
  blogUrl: ''
};

export default function Page() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    setError,
    clearErrors
  } = useForm<SignUpInput>({
    defaultValues
  });

  const { email, password, nickname, passwordCheck, blogUrl } = dirtyFields;
  const isValidBtn = email && password && nickname && passwordCheck && blogUrl && isValid;

  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (watch('password') !== watch('passwordCheck') && watch('passwordCheck')) {
      setError('passwordCheck', {
        type: 'password-mismatch',
        message: '비밀번호가 일치하지 않습니다.'
      });
    } else clearErrors('passwordCheck');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setError, watch, watch('password'), watch('passwordCheck')]);

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <h1>회원가입</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: EMAIL_REGEX,
                  message: '유요한 이메일 형식이 아닙니다.'
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
            <label htmlFor="nickname">닉네임</label>
            <input
              {...register('nickname', { required: '닉네임을 입력해주세요.' })}
              id="nickname"
              placeholder="닉네임 입력"
            />
            <div className={styles.error}>
              <p>{errors.nickname && errors.nickname.message}</p>
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
              placeholder="비밀번호 입력"
            />
            <div className={styles.error}>
              <p>{errors.password && errors.password.message}</p>
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password-check">비밀번호 확인</label>
            <input
              {...register('passwordCheck', {
                required: '비밀번호를 다시 입력해주세요.',
                validate: (passwordCheck: string) => {
                  if (watch('password') != passwordCheck) {
                    return '비밀번호가 일치하지 않습니다.';
                  }
                }
              })}
              id="password-check"
              type="password"
              placeholder="비밀번호 확인"
            />
            <div className={styles.error}>
              <p>{errors.passwordCheck && errors.passwordCheck.message}</p>
            </div>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="blog-url">블로그 주소</label>
            <input
              {...register('blogUrl', {
                required: 'TIL 블로그를 입력해주세요.',
                pattern: {
                  value: BLOG_REGEX,
                  message: '사용가능한 블로그 주소 (tistory, medium, github, velog, notion).'
                }
              })}
              id="blog-url"
              placeholder="TIL 블로그 주소"
            />
            <div className={styles.error}>
              <p>{errors.blogUrl && errors.blogUrl.message}</p>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button className={isValidBtn ? styles.active : ''} type="submit">
              회원가입
            </button>
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
