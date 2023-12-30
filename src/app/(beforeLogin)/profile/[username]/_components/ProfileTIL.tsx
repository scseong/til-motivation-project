'use client';
import List from '@/app/(beforeLogin)/home/_components/List';
import styles from './profileTIL.module.scss';
import { useState } from 'react';
import LikePostList from './LikePostList';
import Spacer from '@/app/_components/Spacer';

export default function ProfileTIL() {
  const [switchBtn, setSwitchBtn] = useState('my');

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button onClick={() => setSwitchBtn('my')}>내 TIL</button>
        <button onClick={() => setSwitchBtn('like')}>내가 좋아하는 TIL</button>
      </div>
      <Spacer y={30} />
      <div className={styles.tilBox}>
        <div className={styles.tilList}>{switchBtn === 'my' ? <List /> : <LikePostList />}</div>
      </div>
    </div>
  );
}
//react-calendar-heatmap 잔디밭
/**
 * 팔롱우 팔로워 ?
 * 프로필설정 => 패러럴+인터셉터 / 모달?
 * 메인페이지 완성에 따라 TIL보여주기
 */
