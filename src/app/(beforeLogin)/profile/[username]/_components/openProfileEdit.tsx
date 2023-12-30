'use client';
import Image from 'next/image';
import styles from './UserProfile.module.scss';
import editImage from '../../../../../../public/images/profileEdit.png';

import { VscGear } from 'react-icons/vsc';

export default function OpenProfileEdit() {
  const openEdit = () => {
    console.log('hi');
  };
  return (
    <div className={styles.chageProfileBtn} onClick={openEdit}>
      <Image src={editImage} alt="수정" width={50} height={50} />
    </div>
  );
}
