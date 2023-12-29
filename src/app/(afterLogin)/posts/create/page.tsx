'use server';
import ClientOpenGraph from './_components/ClientOpenGraph';
import Editor from './_components/Editor';
import styles from './postCreatePage.module.scss';
export default async function PostCreatePage() {
  return (
    <div className={styles.container}>
      <p>제목</p>
      <div style={{ height: '150px', backgroundColor: 'pink' }}>
        <Editor />
      </div>
      <ClientOpenGraph />

      <div>
        <button>게시하기</button>
        <button>취소</button>
      </div>
    </div>
  );
}
