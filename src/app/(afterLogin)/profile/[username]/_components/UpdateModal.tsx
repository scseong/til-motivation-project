'use client';

import Spacer from '@/app/_components/Spacer';
import styles from './UpdateModal.module.scss';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import editImage from '/public/images/profileEdit.png';
import Image from 'next/image';

export default function UpdateModal() {
  const [nickname, setNickname] = useState('우주최고 코딩개발자');
  const [comment, setComment] = useState('안녕하세요! 프론트엔드 개발자를 꿈꾸는 코린이 입니다!');
  const [email, setEmail] = useState('https://velog.io/@minseok0920/posts');
  const router = useRouter();
  const onHandleCloseBtn = () => {
    router.replace('http://localhost:3000/profile/aaa');
  };
  const onHandleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onHandleProfileEditSubmit = () => {};
  return (
    // <div className={style.modalBackground} onClick={onHandleCloseBtn}>
    //바깥누르면 닫게 해놓고 버블링
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onHandleCloseBtn}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>프로필 수정</div>
        </div>

        <form className={styles.eidtBoxWrapper} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.editBox}>
            <div className={styles.profileImage}>
              {/**input으로 받아서 바로 바꾸고싶긴함 */}
              <Image src={editImage} alt="" fill={true} />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="nickname">닉네임</label>
              <input id="nickname" value={nickname} onChange={(e) => onHandleStateChange(e)} />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="comment">소개</label>
              <input
                className={styles.comment}
                id="comment"
                value={comment}
                onChange={(e) => onHandleStateChange(e)}
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="email">블로그 주소</label>
              <input id="email" value={email} onChange={(e) => onHandleStateChange(e)} />
            </div>

            {/* </div> */}
          </div>
          <div className={styles.editBtnWrapper}>
            <button className={styles.editBtn} onClick={onHandleProfileEditSubmit}>
              수정완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
