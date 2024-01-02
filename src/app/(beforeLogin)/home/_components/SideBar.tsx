'use client';

import styles from './sidebar.module.scss';
import mockAvatar from '/public/images/logo.png';
import { Fragment, useEffect } from 'react';
import { getUsers } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/app/_components/Loader';

export default function SideBar() {
  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    select: (users) => users.sort((a, b) => b.continueDays - a.continueDays).slice(0, 10)
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>TIL Top 10🏆</div>
      </div>
      {users?.map((user, index) => (
        <Fragment key={index}>
          <div className={styles.subcontainer}>
            <div className={styles.rank}>
              <div className={styles.number} style={index < 3 ? { color: 'red' } : undefined}>
                {index + 1}
              </div>
              <div className={styles.userBox}>
                <div className={styles.avatar}>
                  <img src={user.photoURL} alt="avatar" />
                </div>
                <div>
                  <div className={styles.name}>{user.displayName}</div>
                  <div className={styles.days}>연속 {user.continueDays}일 제출</div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
