'use client';
import { useState } from 'react';
import Button from './_components/Button';
import ClientOpenGraph, { openGraph } from './_components/ClientOpenGraph';
import Editor from './_components/Editor';
import Tag from './_components/Tag';
import styles from './postCreatePage.module.scss';

export default function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [openGraphData, setClientOpenGraphData] = useState<openGraph>();
  const [tagData, setTagData] = useState<string[]>([]);
  const handleSubmit = async () => {
    const formData = {
      title,
      editorContent,
      openGraphData,
      tagData
    };
    // setPosts(formData);
    console.log('Form Data:', formData);
  };
  return (
    <div className={styles.container}>
      <form className={styles.postingForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.titleBox}>
          <input
            className={styles.postTitle}
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.editorBox}>
          <Editor setEditorContent={setEditorContent} />
        </div>
        <ClientOpenGraph setClientOpenGraphData={setClientOpenGraphData} />
        <Tag setTagData={setTagData} />
        <div className={styles.postingBtnBox}>
          <Button text="게시하기" onClick={handleSubmit} />
          <Button text="취소" />
        </div>
      </form>
    </div>
  );
}
