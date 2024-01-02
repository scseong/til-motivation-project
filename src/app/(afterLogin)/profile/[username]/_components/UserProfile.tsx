'use client';
import React, { useState } from 'react';
import styles from './UserProfile.module.scss';
import Spacer from '@/app/_components/Spacer';

import editImage from '/public/images/profileEdit.png';
import Image from 'next/image';
import OpenProfileEdit from './OpenProfileEdit';
import Calendar from './Calendar';
import { UserProfile } from '@/typing/User';
import Loader from '@/app/_components/Loader';
type Props = {
  userProfile: UserProfile;
};

export default function UserProfile({ userProfile }: Props) {
  const { comment, displayName, blogURL, photoURL } = userProfile;
  console.log(userProfile);
  if (!userProfile) return <Loader />;

  return (
    <main className={styles.userProfileContainer}>
      <div className={styles.userInfoLeft}>
        <Spacer y={30} />
        <div className={styles.profileImage}>
          <Image src={photoURL} alt="" fill={true} />
        </div>
        <Spacer y={20} />
        <div className={styles.commentBox}>
          <p className={styles.comment}>{displayName}</p>
          <Spacer y={5} />
          <p className={styles.comment}>{comment}</p>
        </div>
        <Spacer y={10} />

        <a href={blogURL} className={styles.email} target="_blank">
          {blogURL}
        </a>
        <Spacer y={20} />
        <div className={styles.follow}>
          <div>팔로워 00명</div>
          <div>팔로잉 00명</div>
        </div>
      </div>
      <div className={styles.userInfoRight}>
        <OpenProfileEdit />
        <Spacer y={100} />
        <div className={styles.tilCalendar}>
          <Calendar />
        </div>
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
