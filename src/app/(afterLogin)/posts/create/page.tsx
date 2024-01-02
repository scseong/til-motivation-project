'use client';
import { useEffect, useState } from 'react';
import styles from './postCreatePage.module.scss';
import { addPosts } from '@/api/posts';
import { Timestamp } from 'firebase/firestore';
import { Post, openGraph } from '@/typing/Post';
import ClientOpenGraph from './_components/ClientOpenGraph';
import Editor from './_components/Editor';
import Tag from './_components/Tag';
import Button from './_components/Button';
import Spacer from '@/app/_components/Spacer';
import { useAuth } from '@/app/_components/AuthSession';

export default function Create() {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [openGraphData, setClientOpenGraphData] = useState<openGraph | undefined>();
  const [tagData, setTagData] = useState<string[]>([]);
  const { user } = useAuth();
  console.log(user);

  const handleSubmit = async () => {
    //들어갈 유저정보  displayname:
    if (user) {
      const formData: Omit<Post, 'psid'> = {
        displayName: user.displayName as string,
        photoUrl: user.photoURL as string,
        title,
        content: editorContent,
        createdAt: Timestamp.now(),
        blogURL: openGraphData!.url,
        likesUser: [],
        tags: tagData,
        openGraph: openGraphData || undefined,
        comments: []
      };
      addPosts(formData);
    }
  };
  return (
    <>
      <Spacer y={30} />

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
            <Button
              text="게시하기"
              onClick={handleSubmit}
              disabled={!title || !editorContent || !openGraphData}
            />
            <Button text="취소" />
          </div>
        </form>
      </div>
    </>
  );
}
