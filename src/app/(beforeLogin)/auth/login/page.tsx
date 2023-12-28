'use client';
import Link from 'next/link';
import styles from './login.module.scss';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/util/regex';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid }
  } = useForm<LoginFormInput>({ defaultValues: { email: '', password: '' } });

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
  };
  const { email: isDirtyEmail, password: isDirtyPassword } = dirtyFields;
  const isValidBtn = isDirtyEmail && isDirtyPassword && isValid;

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
            <button className={isValidBtn ? styles.active : ''} type="submit">
              이메일로 로그인
            </button>
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
