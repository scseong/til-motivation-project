import Image from 'next/image';
import styles from './UserProfile.module.scss';
import editImage from '../../../../../../public/images/profileEdit.png';
import Link from 'next/link';

export default function OpenProfileEdit() {
  return (
    <Link href="/profile/aaa/update" className={styles.chageProfileBtn}>
      <Image src={editImage} alt="수정" width={50} height={50} />
    </Link>
  );
}
