import Link from 'next/link';
import styles from './navbar.module.scss';
import { BsSearchHeart } from 'react-icons/bs';

export default function NavBar() {
  return (
    <div className={styles.navbarBox}>
      <div className={styles.logoBox}>
        <Link href={`/home`} className={styles.logoText}>
          여러분 TIL 제출하러 갑시다~ 🚗💕
        </Link>
      </div>
      <div className={styles.menuBox}>
        <Link href={`/search`} className={styles.icon}>
          <BsSearchHeart size={20} />
        </Link>
        <Link href={`/auth/login`} className={styles.menuItem}>
          로그인
        </Link>
        <Link href={`/auth/signup`} className={styles.menuItem}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
