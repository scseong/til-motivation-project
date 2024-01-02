'use client';
import { AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import styles from './Post.module.scss';
import AddComment from './AddComment';
import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '@/api/posts';
import Link from 'next/link';
import { Post } from '@/typing/Post';
import Loader from '@/app/_components/Loader';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

export default function PostDetail() {
  const { id }: { id: string } = useParams();
  const {
    isLoading,
    error,
    data: post
  } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => getPostDetail(id)
  });

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  const {
    title,
    content,
    tags,
    displayName,
    photoUrl,
    openGraph,
    comments,
    createdAt,
    likesUser,
    blogURL
  } = post!;

  console.log(title);
  const onClickShare = (post: string) => {
    copy(blogURL);
    toast.success('클립보드에 복사되었습니다.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.userInfo}>
          <Link href="/profile/1">
            <img src={photoUrl} alt="avatar" />
            <div>
              <p className={styles.nickname}>{displayName}</p>
              <p className={styles.createdAt}>
                {createdAt.toDate().toLocaleDateString('ko', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
          </Link>
          <button>팔로우</button>
        </div>
        <div className={styles.content}>
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className={styles.openGraphBox} onClick={() => window.open(openGraph?.url)}>
          <div className={styles.imageContainer}>
            <img src={openGraph?.image} alt="Link Preview" />
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.title}>{openGraph?.title}</p>
            <p className={styles.description}>{openGraph?.description}</p>
            <p className={styles.url}>{openGraph?.url}</p>
          </div>
        </div>
        <div className={styles.tags}>{tags.map((tag) => `#${tag} `)}</div>
        <div className={styles.buttons}>
          <div>
            <button>
              <AiOutlineLike />
              <span> 좋아요 {likesUser.length}</span>
            </button>
          </div>
          <button>
            <AiOutlineShareAlt size="20" onClick={() => onClickShare(blogURL)} />
          </button>
        </div>
      </div>
      <div className={styles.div}>
        <AddComment commentCount={comments.length} />
      </div>
    </div>
  );
}