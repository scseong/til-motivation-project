'use client';
import { getPosts } from '@/api/posts';
import Loader from '@/app/_components/Loader';
import { Post } from '@/typing/Post';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from '../home/_components/SideBar';
import styles from './page.module.scss';

export default function Page() {
  const keyword = useSearchParams().get('keyword');

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const { isLoading, data: posts } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  useEffect(() => {
    if (!keyword || !posts) return;
    const filteredPosts =
      posts?.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword.toLowerCase()) || post.tags.includes(keyword)
      ) ?? [];
    setAllPosts([...filteredPosts]?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
  }, [keyword, posts]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.searchTitle}>검색결과 : {keyword}</div>
        <div className={styles.searchSubTitle}>{allPosts.length}건의 TIL을 찾았습니다.</div>
        {allPosts.map((post, index) => (
          <div className={styles.board} key={index}>
            <div className={styles.imageBox}>
              <img className={styles.images} src={post.photoUrl} alt="아바타" />
              <div className={styles.contentBox}>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className={styles.tag}>{post.tags.map((tag) => `#${tag} `)}</div>
              </div>
            </div>
            <div className={styles.userBox}>
              <div className={styles.nickname}>{post.displayName}</div>
              <div className={styles.date}>
                {post.createdAt.toDate().toLocaleDateString('ko', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SideBar />
    </div>
  );
}
