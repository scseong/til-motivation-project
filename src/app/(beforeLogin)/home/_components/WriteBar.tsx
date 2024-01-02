'use client';

import styles from './writebar.module.scss';
import Link from 'next/link';
import { useAuth } from '@/app/_components/AuthSession';

export default function WriteBar() {
  const { user } = useAuth();
  return (
    <Link href={'/posts/create'}>
      <div className={styles.container}>
        <div className={styles.writeBox}>
          <div className={styles.avatar}>
            <img src={user?.photoURL} alt="avatar" />
          </div>
          <div className={styles.write}>
            <div className={styles.writePlaceholder}>나누고 싶은 생각이 있으신가요?</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
