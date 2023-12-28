import { AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { LiaCommentDots } from 'react-icons/lia';
import styles from './Post.module.scss';
import AddComment from './AddComment';

export default function Post() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.userInfo}>
          유저 프로필 정보
          <button>팔로우</button>
        </div>
        <div className={styles.content}>
          <h1>STT를 이용해 음성을 텍스트로 변환하기 🗣️</h1>
          <p>
            STT는 Speech-to-Text의 약자로 음성 인식을 통해 텍스트로 변환하는것을 말합니다 🙋🏻
            애플에서는 내장된 Speech 프레임워크를 사용하여 이 기능을 쉽게 구현해줄 수 있습니다! 관심
            있으신분들께 STT 톺아보는 과정을 공유드립니다 😃
          </p>
        </div>
        <div className={styles.time}>
          <time>2023년 12월 27일 오전 11:05</time>
        </div>
        <div className={styles.buttons}>
          <div>
            <button>
              <AiOutlineLike />
              <span> 좋아요 3</span>
            </button>
            <button>
              <LiaCommentDots />
              <span> 댓글 2</span>
            </button>
          </div>
          <button>
            <AiOutlineShareAlt size="20" />
          </button>
        </div>
      </div>
      <div className={styles.div}>
        <AddComment />
      </div>
    </div>
  );
}
