'use client';
import Link from 'next/link';
import styles from './CommentList.module.scss';
import Loader from '@/app/_components/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getComments, updateComment } from '@/shared/comment';
import { useParams } from 'next/navigation';
import { FaTrashAlt, FaPencilAlt, FaCheck, FaUndo } from 'react-icons/fa';
import { useState } from 'react';
import { Comment } from '@/typing/Post';
import { getPosts } from '@/api/posts';
import Swal from 'sweetalert2';

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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts });
    }
  });
  const handleDelete = (comment: Comment) => {
    Swal.fire({
      title: '댓글을 삭제하겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommentMutation.mutate(comment);
        Swal.fire({ icon: 'success', title: '댓글을 삭제했습니다' });
      }
    });
  };

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  const handleUpdate = (comment: Comment, text: string) => {
    Swal.fire({
      title: '댓글을 수정하겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        setEditCommentId(null);
        updateCommentMutation.mutate({ comment, text });
        Swal.fire({ icon: 'success', title: '댓글을 수정했습니다' });
      }
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;
  if (!comments?.length) return <></>;

  return (
    <div className={styles.layout}>
      {comments?.map((comment) => {
        const { cid, psid, displayName, content, photoUrl, createdAt } = comment;
        return (
          <div key={cid}>
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
              <div className={styles.buttons}>
                <button onClick={() => handleDelete(comment)}>
                  <FaTrashAlt />
                </button>
                {editCommentId !== cid && (
                  <button onClick={() => setEditCommentId(cid)}>
                    <FaPencilAlt />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.content}>
              {editCommentId === cid ? (
                <textarea defaultValue={content} onChange={(e) => setText(e.target.value)} />
              ) : (
                <p>{content}</p>
              )}
              <div className={styles.buttons}>
                {editCommentId === cid && (
                  <button onClick={() => setEditCommentId(null)}>
                    <FaUndo />
                  </button>
                )}
                {editCommentId === cid && (
                  <button
                    disabled={!text || text === content}
                    onClick={() => handleUpdate(comment, text)}
                  >
                    <FaCheck />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
