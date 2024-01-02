'use client';
import styles from './profileTIL.module.scss';
import { useState } from 'react';
import Spacer from '@/app/_components/Spacer';
import { useLikePostsQuery } from '@/api/posts';
import ProfilePosts from './ProfilePosts';
import { Post } from '@/typing/Post';
type Props = {
  myPosts: Post[] | undefined;
  isLoading: boolean;
  displayName: string;
};
export default function ProfileTIL({ myPosts, isLoading, displayName }: Props) {
  const [switchBtn, setSwitchBtn] = useState('my');

  const { data: likePosts } = useLikePostsQuery(displayName);

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button onClick={() => setSwitchBtn('my')}>내 TIL</button>
        <button onClick={() => setSwitchBtn('like')}>내가 좋아하는 TIL</button>
      </div>
      <Spacer y={30} />
      <div className={styles.tilBox}>
        <div className={styles.tilList}>
          {switchBtn === 'my' ? (
            <ProfilePosts postsData={myPosts} isLoading={isLoading} displayName={displayName} />
          ) : (
            <ProfilePosts postsData={likePosts} isLoading={isLoading} displayName={displayName} />
          )}
        </div>
      </div>
    </div>
  );
}
