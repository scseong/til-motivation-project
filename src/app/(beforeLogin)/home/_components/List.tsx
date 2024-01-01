'use client';
import styles from './list.module.scss';
import { AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { LiaCommentDots } from 'react-icons/lia';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/posts';
import { Post } from '@/typing/Post';
import Loader from '@/app/_components/Loader';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function List() {
  const { isLoading, data: posts } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts
  });
  const [postsData, setPostsData] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      setPostsData([...posts]?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
    }
  }, [posts]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className={styles.postBox}>
        {postsData?.map((post, index) => (
          <div className={styles.post} key={index}>
            <Link href={`/posts/${post.psid}`}>
              <div className={styles.postHeader}>
                <div className={styles.userBox}>
                  <div className={styles.avatar}>
                    <img src={post.photoUrl} alt="아바타" />
                  </div>
                  <div>
                    <div className={styles.postName}>{post.displayName}</div>
                    <div className={styles.postDate}>
                      {post.createdAt.toDate().toLocaleDateString('ko', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <button className={styles.postFollow}>팔로우</button>
              </div>
              <div className={styles.postTitle}>{post.title}</div>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <p>... 더 보기</p>
              <div className={styles.openGraphBox}>오픈그래프자리</div>
              <div className={styles.tag}>{post.tags.map((tag) => `#${tag} `)}</div>
            </Link>
            <div className={styles.postFooter}>
              <div>
                <div className={styles.postLike}>
                  <AiOutlineLike size={18} />
                  <span>좋아요 </span>
                  <div className={styles.postLikeCount}>{post.likesUser.length}</div>
                </div>
                <div className={styles.postComment}>
                  <LiaCommentDots size={18} />
                  {/* 댓글 구현시 댓글 수 표시 예정 */}
                  <span>댓글 </span>
                  <div className={styles.postLikeCount}>2</div>
                </div>
              </div>
              <div className={styles.postShare}>
                <AiOutlineShareAlt size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
