'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AddComment.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '@/shared/comment';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';

type Comment = { content: string };

export default function AddComment() {
  const { id }: { id: string } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<Comment>();

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  const onSubmit: SubmitHandler<Comment> = (data) => {
    reset();
    const newComment = {
      cid: uuidv4(),
      psid: id,
      content: data.content,
      displayName: '코코볼',
      photoUrl:
        'https://careerly.co.kr/_next/static/images/img_profile-dummy-f39ccb87481ab4a70525a9d2d461307d.png',
      createdAt: Timestamp.now()
    };
    addCommentMutation.mutate(newComment);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.commentBox}>
          <div className={styles.userComment}>
            <img
              src="https://careerly.co.kr/_next/static/images/img_profile-dummy-f39ccb87481ab4a70525a9d2d461307d.png"
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
