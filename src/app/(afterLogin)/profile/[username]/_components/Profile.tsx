import ProfileTIL from './ProfileTIL';
import styles from './profile.module.scss';
import Spacer from '@/app/_components/Spacer';
import { useProfilePostsQuery } from '@/api/posts';
import { UserProfile } from '@/typing/User';
import TargetUserProfile from './UserProfile';
import Loader from '@/app/_components/Loader';
type Props = {
  userProfile: UserProfile;
};
export default function Profile({ userProfile }: Props) {
  const displayName = userProfile.displayName;
  console.log(displayName);
  const { isLoading, data: myPosts } = useProfilePostsQuery(displayName);
  if (isLoading) return <Loader />;
  const heatMapData = myPosts!.map((post) => post.createdAt);
  return (
    <div className={styles.container}>
      <Spacer y={50} />
      <TargetUserProfile userProfile={userProfile} heatMapData={heatMapData} />
      <Spacer y={50} />
      <ProfileTIL myPosts={myPosts} isLoading={isLoading} displayName={displayName} />
    </div>
  );
}
