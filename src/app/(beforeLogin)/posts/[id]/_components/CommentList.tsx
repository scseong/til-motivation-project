'use client';
import Link from 'next/link';
import styles from './CommentList.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/shared/comment';
import { useParams } from 'next/navigation';

export default function CommnetList() {
  const { id }: { id: string } = useParams();
  const {
    isLoading,
    error,
    data: comments
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(id)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const sortedComments = comments?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));

  return (
    <div className={styles.layout}>
      {sortedComments?.map((comment) => {
        const { displayName, content, photoUrl, createdAt } = comment;
        return (
          <>
            <div>
              <Link href="/profile/1" className={styles.userInfo}>
                <img src={photoUrl} alt="avatar" />
                <div>
                  <p className={styles.nickname}>{displayName}</p>
                  <p className={styles.createdAt}>{new Date(createdAt).toLocaleString()}</p>
                </div>
              </Link>
            </div>
            <div className={styles.content}>
              <p>{content}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}
