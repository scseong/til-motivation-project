'use client';
import Link from 'next/link';
import styles from './signup.module.scss';

export default function Page() {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>회원가입</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" placeholder="이메일 입력" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="nickname">닉네임</label>
            <input id="nickname" type="text" placeholder="닉네임 입력" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="current-password" placeholder="비밀번호 입력" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password-check">비밀번호 확인</label>
            <input id="password-check" type="current-password" placeholder="비밀번호 확인" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="blog-url">블로그 주소</label>
            <input id="blog-url" type="url" placeholder="TIL 블로그 주소" />
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
