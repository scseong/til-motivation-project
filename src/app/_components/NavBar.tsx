'use client';
import SearchModal from './Modal';
import Link from 'next/link';
import styles from './navbar.module.scss';
import { BsSearchHeart } from 'react-icons/bs';
import { useState } from 'react';

export default function NavBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className={styles.navbarBox}>
      <div className={styles.logoBox}>
        <Link href={`/home`} className={styles.logoText}>
          여러분 TIL 제출하러 갑시다~ 🚗💕
        </Link>
      </div>
      <div className={styles.menuBox}>
        <div className={styles.icon} onClick={() => setModalIsOpen((prev) => !prev)}>
          <BsSearchHeart size={20} />
        </div>
        <Link href={`/auth/login`} className={styles.menuItem}>
          로그인
        </Link>
        <Link href={`/auth/signup`} className={styles.menuItem}>
          회원가입
        </Link>
      </div>
      <SearchModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} ariaHideApp={false}>
        <div className={styles.searchBox}>
          <BsSearchHeart size={40} />
          <input className={styles.input} autoFocus />
        </div>
      </SearchModal>
    </div>
  );
}
