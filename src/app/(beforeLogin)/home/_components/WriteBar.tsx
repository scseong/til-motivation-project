import Image from 'next/image';
import styles from './writebar.module.scss';
import mockAvatar from '/public/images/logo.png';
import Link from 'next/link';

export default function WriteBar() {
  return (
    <Link href={'/posts/create'}>
      <div className={styles.container}>
        <div className={styles.writeBox}>
          <Image className={styles.avatar} src={mockAvatar} alt="avatar" />
          <div className={styles.write}>
            <div className={styles.writePlaceholder}>
            나누고 싶은 생각이 있으신가요?
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
