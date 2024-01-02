'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import SearchModal from './Modal';
import styles from './navbar.module.scss';
import { useAuth } from '@/app/_components/AuthSession';
import { auth } from '@/shared/firebase';
import Swal from 'sweetalert2';

export default function NavBar() {
  const router = useRouter();
  const { user } = useAuth();
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

  const handleLogout = () => {
    Swal.fire({
      title: '로그아웃 하겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut();
        Swal.fire({ icon: 'success', title: '로그아웃 되었습니다' });
      }
    });
  };

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
        {user ? (
          <>
            <Link href={`/profile/${user.uid}`} className={styles.menuItem}>
              마이페이지
            </Link>
            <button className={styles.menuItem} onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href={`/auth/login`} className={styles.menuItem}>
              로그인
            </Link>
            <Link href={`/auth/signup`} className={styles.menuItem}>
              회원가입
            </Link>
          </>
        )}
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
