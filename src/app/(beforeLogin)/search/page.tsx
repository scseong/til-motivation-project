'use client';
import { getPosts } from '@/api/posts';
import Loader from '@/app/_components/Loader';
import { Post } from '@/typing/Post';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from '../home/_components/SideBar';
import styles from './page.module.scss';
import mockAvatar from '/public/images/logo.png';

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
      posts?.filter((post) => post.title.includes(keyword) || post.tags.includes(keyword)) ?? [];
    setAllPosts(filteredPosts);
  }, [keyword, posts]);

  console.log(allPosts);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.searchTitle}>검색결과 : react</div>
        <div className={styles.searchSubTitle}>6건의 TIL을 찾았습니다.</div>
        <div className={styles.board}>
          <div className={styles.imageBox}>
            <Image className={styles.images} src={mockAvatar} alt="avatar" />
            <div className={styles.contentBox}>
              <div className={styles.title}>정들어버렸어 서취.. 너...☆</div>
              <div className={styles.content}>
                내용정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취..
                너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취..
                너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취..
                너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취..
                너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취..
                너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취..
                너...☆정들어버렸어 서취.. 너...☆정들어버렸어 서취.. 너...☆
              </div>
              <div className={styles.tag}>
                #react #next.js #til #next #에스파 #에스파는 나야 누구도 될 수 없어
              </div>
            </div>
          </div>
          <div className={styles.userBox}>
            <div className={styles.nickname}>서치짱짱맨</div>
            <div className={styles.date}>2023년 12월 25일</div>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
