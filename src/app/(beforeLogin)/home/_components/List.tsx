import Image from 'next/image';
import styles from './list.module.scss';
import mockAvatar from '/public/images/logo.png';
import { AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { LiaCommentDots } from 'react-icons/lia';

export default function List() {
  return (
    <>
      <div className={styles.postBox}>
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.userBox}>
              <Image className={styles.avatar} src={mockAvatar} alt="avatar" />
              <div>
                <div className={styles.postName}>닉네임</div>
                <div className={styles.postDate}>12월25일</div>
              </div>
            </div>
            <button className={styles.postFollow}>팔로우</button>
          </div>
          <div className={styles.postTitle}>데이터가 없을 때 200인가 404인가?</div>
          <div className={styles.postContent}>
            내용이 많은면 오또카지내용이 많은면 오또카지내용이 많은면 오또카지내용이 많은면
            오또카지내용이 많은면 오또카지
          </div>
          <p>... 더 보기</p>
          <div className={styles.openGraphBox}>오픈그래프자리</div>
          <div className={styles.postFooter}>
            <div>
              <div className={styles.postLike}>
                <AiOutlineLike size={18} />
                <span>좋아요 </span>
                <div className={styles.postLikeCount}>2</div>
              </div>
              <div className={styles.postComment}>
                <LiaCommentDots size={18} />
                <span>댓글 </span>
                <div className={styles.postLikeCount}>2</div>
              </div>
            </div>
            <div className={styles.postShare}>
              <AiOutlineShareAlt size={18} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
