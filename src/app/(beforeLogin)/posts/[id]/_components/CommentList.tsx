'use client';
import Link from 'next/link';
import styles from './CommentList.module.scss';
import Loader from '@/app/_components/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getComments, updateComment } from '@/shared/comment';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { Comment } from '@/typing/Post';

export default function CommnetList() {
  const { id }: { id: string } = useParams();
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [text, setText] = useState('');
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
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  const handleDelete = (comment: Comment) => {
    if (window.confirm('댓글을 삭제하겠습니까?')) {
      deleteCommentMutation.mutate(comment);
    }
  };

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      // queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  const handleUpdate = (comment: Comment, text: string) => {
    if (window.confirm('수정하시겠습니까?')) {
      setEditCommentId(null);
      updateCommentMutation.mutate({ comment, text });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  //const sortedComments = comments?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));

  return (
    <div className={styles.layout}>
      {comments?.map((comment) => {
        const { cid, psid, displayName, content, photoUrl, createdAt } = comment;
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
              {editCommentId === cid ? (
                <textarea defaultValue={content} onChange={(e) => setText(e.target.value)} />
              ) : (
                <p>{content}</p>
              )}
              <button onClick={() => handleDelete(comment)}>
                <FaTrashAlt />
              </button>
              {editCommentId !== cid && <button onClick={() => setEditCommentId(cid)}>수정</button>}
              {editCommentId === cid && (
                <button onClick={() => setEditCommentId(null)}>취소</button>
              )}
              {editCommentId === cid && (
                <button onClick={() => handleUpdate(comment, text)}>수정 완료</button>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
}
