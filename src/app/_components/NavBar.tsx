'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import SearchModal from './Modal';
import styles from './navbar.module.scss';

export default function NavBar() {
  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    if (searchKeyword === '') return;
    else {
      setSearchKeyword('');
      setModalIsOpen(false);
      router.push(`/search?keyword=${searchKeyword}`);
    }
  };

  return (
    <div className={styles.navbarBox}>
      <div className={styles.logoBox}>
        <Link href={`/home`} className={styles.logoText}>
          여러분 TIL 제출하러 갑시다~ 🚗💕
        </Link>
      </div>
      <div>
        <Link href={`/profile/aaa`}>프로필페이지</Link>
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
          <input
            className={styles.input}
            autoFocus
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
        </div>
      </SearchModal>
    </div>
  );
}
