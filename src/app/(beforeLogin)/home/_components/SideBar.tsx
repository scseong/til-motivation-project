'use client';

import styles from './sidebar.module.scss';
import Image from 'next/image';
import mockAvatar from '/public/images/logo.png';
import { useEffect } from 'react';

export default function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>TIL Top 10🏆</div>
      </div>
      <div className={styles.subcontainer}>
        <div className={styles.rank}>
          <div className={styles.number}>1</div>
          <div className={styles.userBox}>
            <Image className={styles.avatar} src={mockAvatar} alt="avatar" />
            <div>
              <div className={styles.name}>닉네임</div>
              <div className={styles.days}>연속 123567일 제출</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
