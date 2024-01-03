import Image from 'next/image';
import styles from './UserProfile.module.scss';
import editImage from '../../../../../../public/images/profileEdit.png';
import Link from 'next/link';
type Props = {
  userRef: string;
};
export default function OpenProfileUpdate({ userRef }: Props) {
  return (
    <Link href={`/profile/${userRef}/update`} className={styles.chageProfileBtn}>
      <Image src={editImage} alt="수정" width={50} height={50} />
    </Link>
  );
}
