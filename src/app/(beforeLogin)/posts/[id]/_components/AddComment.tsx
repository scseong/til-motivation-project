'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AddComment.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '@/shared/comment';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/_components/AuthSession';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { getPosts } from '@/api/posts';
import Swal from 'sweetalert2';

type Comment = { content: string };

export default function AddComment({ commentCount }: { commentCount: number }) {
  const { id }: { id: string } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<Comment>();

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts });
    }
  });

  const onSubmit: SubmitHandler<Comment> = (data) => {
    reset();
    if (!user) {
      Swal.fire({ icon: 'warning', title: '로그인 후 댓글을 입력하세요!' });
      return;
    }
    Swal.fire({ icon: 'success', title: '댓글 등록이 완료되었습니다' });
    const newComment = {
      cid: uuidv4(),
      psid: id,
      content: data.content,
      displayName: user?.displayName as string,
      photoUrl: user?.photoURL as string,
      createdAt: Timestamp.now()
    };
    addCommentMutation.mutate(newComment);
  };

  return (
    <>
      <h3 className={styles.h3}>
        댓글
        <span> {commentCount}</span>
      </h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.commentBox}>
          <div className={styles.userComment}>
            <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : 'https://careerly.co.kr/_next/static/images/img_profile-dummy-f39ccb87481ab4a70525a9d2d461307d.png'
              }
              alt="avatar"
            />
            <textarea
              placeholder="댓글을 남겨보세요."
              {...register('content', {
                required: true,
                validate: (value) => (value.trim().length >= 1 ? true : false)
              })}
            />
          </div>
          <button disabled={!isValid}>등록</button>
        </div>
      </form>
    </>
  );
}
