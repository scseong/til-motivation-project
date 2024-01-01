import ProfileTIL from './ProfileTIL';
import UserProfile from './UserProfile';
import styles from './profile.module.scss';
import Spacer from '@/app/_components/Spacer';
export default function Profile() {
  return (
    <div className={styles.container}>
      <Spacer y={50} />
      <UserProfile />
      <Spacer y={50} />
      <ProfileTIL />
    </div>
  );
}
