import Image from 'next/image';
import styles from './list.module.scss';
import mockAvatar from '/public/images/logo.png';

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
          <div className={styles.postContent}>
            <span>내용</span>
          </div>
        </div>
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
          <div className={styles.postContent}>
            <span>내용</span>
          </div>
        </div>
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
          <div className={styles.postContent}>
            <span>내용</span>
          </div>
        </div>
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
          <div className={styles.postContent}>
            <span>내용</span>
          </div>
        </div>
      </div>
    </>
  );
}
