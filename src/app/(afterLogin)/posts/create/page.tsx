'use server';
import Button from './_components/Button';
import ClientOpenGraph from './_components/ClientOpenGraph';
import Editor from './_components/Editor';
import Tag from './_components/Tag';
import styles from './postCreatePage.module.scss';
export default async function PostCreatePage() {
  return (
    <div className={styles.container}>
      <div className={styles.postingForm}>
        <div className={styles.titleBox}>
          <input className={styles.postTitle} placeholder="제목을 입력해 주세요" />
        </div>
        <div className={styles.editorBox}>
          <Editor />
        </div>
        <ClientOpenGraph />
        <Tag />
        <div className={styles.postingBtnBox}>
          <Button text="게시하기" />
          <Button text="취소" />
        </div>
      </div>
    </div>
  );
}
