'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AddComment.module.scss';

type Comment = { text: string };

export default function AddComment() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<Comment>();
  const onSubmit: SubmitHandler<Comment> = (data) => {
    reset();
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
              {...register('text', {
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
