'use client';
import styles from './UserProfile.module.scss';
import Spacer from '@/app/_components/Spacer';

import Image from 'next/image';
import OpenProfileEdit from './OpenProfileEdit';
import Calendar from './Calendar';
import { UserProfile } from '@/typing/User';
import Loader from '@/app/_components/Loader';
import { Timestamp } from 'firebase/firestore';
type Props = {
  userProfile: UserProfile;
  heatMapData: Timestamp[];
};

export default function TargetUserProfile({ userProfile, heatMapData }: Props) {
  const { comment, displayName, blogURL, photoURL, continueDays } = userProfile;
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
          <Calendar heatMapData={heatMapData} />
        </div>
        <p className={styles.record}>{continueDays}일 연속 TIL 제출중 입니다!!!</p>
      </div>
    </main>
  );
}
