import ProfileTIL from './_components/ProfileTIL';
import styles from './profile.module.scss';
import UserProfile from './_components/UserProfile';
import Spacer from '@/app/_components/Spacer';
export default function Page() {
  return (
    <div className={styles.container}>
      <Spacer y={50} />

      <UserProfile />
      <Spacer y={50} />
      <ProfileTIL />
    </div>
  );
}
