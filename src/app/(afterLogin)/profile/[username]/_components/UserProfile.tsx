'use client';
import styles from './UserProfile.module.scss';
import Spacer from '@/app/_components/Spacer';

import Image from 'next/image';
import Calendar from './Calendar';
import { UserProfile } from '@/typing/User';
import Loader from '@/app/_components/Loader';
import { Timestamp } from 'firebase/firestore';
import OpenProfileUpdate from './OpenProfileUpdate';
import { useAuth } from '@/app/_components/AuthSession';
type Props = {
  userProfile: UserProfile;
  heatMapData: Timestamp[];
  userRef: string;
};

export default function TargetUserProfile({ userProfile, heatMapData, userRef }: Props) {
  const { comment, displayName, blogURL, photoURL, continueDays } = userProfile;
  const { user } = useAuth();

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
        {user!.uid === userRef ? <OpenProfileUpdate userRef={userRef} /> : ''}
        <Spacer y={100} />
        <div className={styles.tilCalendar}>
          <Calendar heatMapData={heatMapData} userRef={userRef} />
        </div>
        <p className={styles.record}>{continueDays}일 연속 TIL 제출중 입니다!!!</p>
      </div>
    </main>
  );
}
