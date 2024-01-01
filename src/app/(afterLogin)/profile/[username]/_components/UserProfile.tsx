import React from 'react';
import styles from './UserProfile.module.scss';
import Spacer from '@/app/_components/Spacer';

import editImage from '/public/images/profileEdit.png';
import Image from 'next/image';
import OpenProfileEdit from './openProfileEdit';
import Calendar from './Calendar';

export default function UserProfile() {
  const email = 'https://velog.io/@minseok0920/posts';
  return (
    <main className={styles.userProfileContainer}>
      <div className={styles.userInfoLeft}>
        <Spacer y={30} />
        <div className={styles.profileImage}>
          <Image src={editImage} alt="" fill={true} />
        </div>
        <Spacer y={20} />
        <div className={styles.commentBox}>
          <p className={styles.comment}>안녕하세요! 프론트엔드 개발자를 꿈꾸는 코린이 입니다!</p>
        </div>
        <Spacer y={10} />
        <a href={email} className={styles.email} target="_blank">
          {email}
        </a>
        <Spacer y={20} />
        <div className={styles.follow}>
          <div>팔로워 00명</div>
          <div>팔로잉 00명</div>
        </div>
      </div>
      <div className={styles.userInfoRight}>
        <OpenProfileEdit />
        <Spacer y={70} />
        <div className={styles.tilCalendar}>
          <Calendar />
        </div>
        <Spacer y={30} />
        <p className={styles.record}>13일 연속 TIL 제출중 입니다!!!</p>
      </div>
    </main>
  );
}
//react-d3-calendar-heatmap 잔디밭
//두개만들기...?
/**
 * 팔롱우 팔로워 ?
 * 프로필설정 => 패러럴+인터셉터 / 모달?
 * 메인페이지 완성에 따라 TIL보여주기
 */
