import Editor from './_componen/Editor';
import styles from './postCreatePage.module.scss';
export default function PostCreatePage() {
  return (
    <div className={styles.container}>
      <p>제목</p>
      <div style={{ height: '150px', backgroundColor: 'pink' }}>
        <Editor />
      </div>
      <div>오픈그래프</div>
      <div>
        <button>게시하기</button>
        <button>취소</button>
      </div>
    </div>
  );
}
