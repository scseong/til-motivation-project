import Image from 'next/image';
import styles from './UserProfile.module.scss';
import editImage from '../../../../../../public/images/profileEdit.png';
import Link from 'next/link';

export default function OpenProfileUpdate() {
  return (
    <Link href="/profile/update" className={styles.chageProfileBtn}>
      <Image src={editImage} alt="수정" width={50} height={50} />
    </Link>
  );
}
