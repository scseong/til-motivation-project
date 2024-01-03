import ProfileTIL from './ProfileTIL';
import styles from './profile.module.scss';
import Spacer from '@/app/_components/Spacer';
import { getMyPosts } from '@/api/posts';
import { UserProfile } from '@/typing/User';
import TargetUserProfile from './UserProfile';
import Loader from '@/app/_components/Loader';
import { useQuery } from '@tanstack/react-query';
type Props = {
  userProfile: UserProfile;
  userRef: string;
};
export default function Profile({ userProfile, userRef }: Props) {
  const displayName = userProfile.displayName;
  const { isLoading, data: myPosts } = useQuery({
    queryKey: ['myPosts', userRef],
    queryFn: () => getMyPosts(displayName)
  });
  if (isLoading) return <Loader />;
  const heatMapData = myPosts!.map((post) => post.createdAt);
  return (
    <div className={styles.container}>
      <Spacer y={50} />
      <TargetUserProfile userProfile={userProfile} heatMapData={heatMapData} userRef={userRef} />
      <Spacer y={50} />
      <ProfileTIL
        myPosts={myPosts}
        isLoading={isLoading}
        displayName={displayName}
        userRef={userRef}
      />
    </div>
  );
}
