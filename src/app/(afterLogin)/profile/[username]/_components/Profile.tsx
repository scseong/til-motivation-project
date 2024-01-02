'use client';
import { useParams } from 'next/navigation';
import ProfileTIL from './ProfileTIL';
import UserProfile from './UserProfile';
import styles from './profile.module.scss';
import Spacer from '@/app/_components/Spacer';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/users';
import Loader from '@/app/_components/Loader';
export default function Profile() {
  const params = useParams();
  const userRef = params.username;
  const {
    isLoading,
    error,
    data: userProfile
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(userRef as string)
  });
  console.log(userProfile);
  if (isLoading) return <Loader />;
  if (!userProfile) {
    return <div>User profile not found.</div>;
  }
  return (
    <div className={styles.container}>
      <Spacer y={50} />
      <UserProfile userProfile={userProfile} />
      <Spacer y={50} />
      <ProfileTIL displayName={userProfile!.displayName} />
    </div>
  );
}
