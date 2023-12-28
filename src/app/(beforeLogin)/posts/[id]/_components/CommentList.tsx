import Link from 'next/link';
import styles from './CommentList.module.scss';

export default function CommnetList() {
  return (
    <div className={styles.layout}>
      <div>
        <Link href="/profile/1" className={styles.userInfo}>
          <img
            src="https://careerly.co.kr/_next/static/images/img_profile-dummy-f39ccb87481ab4a70525a9d2d461307d.png"
            alt="avatar"
          />
          <div>
            <p className={styles.nickname}>코코볼</p>
            <p className={styles.createdAt}>12월 6일</p>
          </div>
        </Link>
      </div>
      <div className={styles.content}>
        <p>
          좋은 답변 감사합니다!! 우선 제가 겪었던 일은 서버에서 작업할 때 하나의 작업을 처리하고,
          데이터를 불러오는 과정에서 생각보다? 오래 걸렸습니다... 대략 10초정도..? 로컬에선 1초밖에
          안걸렸던 작업들 입니다! 이 프로젝트는 django로 풀스택으로 개발하였는데 개발하기에 급급하여
          썼던 데이터를 계속 불러오고 불필요한 저장과 중복된 for문, if문 등으로 인하여 성능 저하가
          발생했다고 생각했습니다... 선생님의 말씀을 들어보니 제가 생각했던 방향과 행동한? 방향이 좀
          달랐던 것 같습니다. 우선 제가 목표로 했던 것은 코드를 잘 짜는 것이였습니다! 선생님의
          말씀에 제 생각을 덧붙여서 올바른 방향으로 가보겠습니다 👍
        </p>
      </div>
      <div>
        <Link href="/profile/2" className={styles.userInfo}>
          <img
            src="https://careerly.co.kr/_next/static/images/img_profile-dummy-f39ccb87481ab4a70525a9d2d461307d.png"
            alt="avatar"
          />
          <div>
            <p className={styles.nickname}>홍길동</p>
            <p className={styles.createdAt}>12월 6일</p>
          </div>
        </Link>
      </div>
      <div className={styles.content}>
        <p>좋은 의견 감사합니다</p>
      </div>
    </div>
  );
}
