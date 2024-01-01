'use client';
import Link from 'next/link';
import styles from './CommentList.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getComments } from '@/shared/comment';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';

export default function CommnetList() {
  const { id }: { id: string } = useParams();
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: comments
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(id)
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });
  const handleDelete = (commentId: string) => {
    if (window.confirm('댓글을 삭제하겠습니까?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  //const sortedComments = comments?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));

  return (
    <div className={styles.layout}>
      {comments?.map((comment) => {
        const { cid, displayName, content, photoUrl, createdAt } = comment;
        return (
          <>
            <div>
              <Link href="/profile/1" className={styles.userInfo}>
                <img src={photoUrl} alt="avatar" />
                <div>
                  <p className={styles.nickname}>{displayName}</p>
                  <p className={styles.createdAt}>
                    {createdAt.toDate().toLocaleDateString('ko', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </Link>
            </div>
            <div className={styles.content}>
              <p>{content}</p>
              <button onClick={() => handleDelete(cid)}>
                <FaTrashAlt />
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}
