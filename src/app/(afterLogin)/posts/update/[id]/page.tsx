'use client';
import { useState } from 'react';
import styles from './postUpdatePage.module.scss';
import { updatePost } from '@/api/posts';
import { Timestamp } from 'firebase/firestore';
import { Post, openGraph } from '@/typing/Post';
import ClientOpenGraph from '../../create/_components/ClientOpenGraph';
import Editor from '../../create/_components/Editor';
import Tag from '../../create/_components/Tag';
import Button from '../../create/_components/Button';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getPostDetail } from '@/api/posts';
import Spacer from '@/app/_components/Spacer';
import { useAuth } from '@/app/_components/AuthSession';
import LinkPreviewCard from '../../create/_components/LinkPreviewCard';

export default function Update() {
  const { id }: { id: string } = useParams();

  const { data: post } = useQuery<Post>({
    queryKey: ['posts', id],
    queryFn: () => getPostDetail(id)
  });

  const [title, setTitle] = useState(post!.title);
  const [editorContent, setEditorContent] = useState<string>(
    post!.content.replace(/(<([^>]+)>)/gi, '')
  );
  const [openGraphData, setClientOpenGraphData] = useState<openGraph | undefined>(post!.openGraph);
  const [tagData, setTagData] = useState<string[]>(post!.tags);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
    }
  });

  const handleUpdate = async (postId: string) => {
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
      console.log(formData);
      updatePostMutation.mutate({ postId, formData });
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.postingForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.titleBox}>
            <input
              className={styles.postTitle}
              placeholder="제목을 입력해 주세요"
              defaultValue={post?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.editorBox}>
            <Editor setEditorContent={setEditorContent} content={editorContent!} />
          </div>
          <ClientOpenGraph
            setClientOpenGraphData={setClientOpenGraphData}
            openGraphData={openGraphData}
          />
          <Tag setTagData={setTagData} tagData={tagData} />
          <div className={styles.postingBtnBox}>
            <Button
              text="수정하기"
              onClick={() => handleUpdate(id)}
              disabled={!title || !editorContent || !openGraphData}
            />
            <Button text="취소" />
          </div>
        </form>
      </div>
    </>
  );
}
