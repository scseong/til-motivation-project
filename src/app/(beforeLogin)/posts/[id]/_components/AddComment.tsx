import styles from './AddComment.module.scss';

export default function AddComment() {
  return (
    <>
      <form className={styles.form}>
        <div className={styles.commentBox}>
          <div className={styles.userComment}>
            <img
              src="https://careerly.co.kr/_next/static/images/img_profile-dummy-f39ccb87481ab4a70525a9d2d461307d.png"
              alt="avatar"
            />
            <textarea placeholder="댓글을 남겨보세요." />
          </div>
          <button>등록</button>
        </div>
      </form>
    </>
  );
}
