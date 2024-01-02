'use client';
import { addPostLikeUser, getPosts, removePostLikeUser } from '@/api/posts';
import Loader from '@/app/_components/Loader';
import { Post } from '@/typing/Post';
import { UserName } from '@/typing/User';
import {
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import Link from 'next/link';
import { AiOutlineLike, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { LiaCommentDots } from 'react-icons/lia';
import styles from '@/app/(beforeLogin)/home/_components/list.module.scss';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import { getTimeAgo } from '@/app/(beforeLogin)/home/_components/getTimeAgo';
type Props = {
  postsData: Post[] | undefined;
  isLoading: boolean;
};
export default function ProfilePosts({ postsData, isLoading }: Props) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: ({ psid, displayName }: { psid: string; displayName: UserName }) =>
      addPostLikeUser(psid, displayName),
    onMutate({ psid, displayName }: { psid: string; displayName: UserName }) {
      updateLikeClient(psid, displayName);
    },
    onError(error, { psid, displayName }: { psid: string; displayName: UserName }) {
      updateUnLikeClient(psid, displayName);
    },
    onSettled() {
      console.log('settled');
    }
  });

  const unLikeMutation = useMutation({
    mutationFn: ({ psid, displayName }: { psid: string; displayName: UserName }) =>
      removePostLikeUser(psid, displayName),
    onMutate({ psid, displayName }: { psid: string; displayName: UserName }) {
      updateUnLikeClient(psid, displayName);
    },
    onError(error, { psid, displayName }: { psid: string; displayName: UserName }) {
      updateLikeClient(psid, displayName);
    },
    onSettled() {
      console.log('settled');
    }
  });

  const updateLikeClient = (psid: string, displayName: UserName) => {
    const posts: Post[] | undefined = queryClient.getQueryData(['posts']);
    if (Array.isArray(posts)) {
      const index = posts.findIndex((post) => post.psid === psid);
      if (index > -1) {
        const copiedPosts = [...posts];
        copiedPosts[index].likesUser = [...copiedPosts[index].likesUser, displayName];
        queryClient.setQueryData(['posts'], copiedPosts);
      }
    }
  };

  const updateUnLikeClient = (psid: string, displayName: UserName) => {
    const posts: Post[] | undefined = queryClient.getQueryData(['posts']);
    if (Array.isArray(posts)) {
      const index = posts.findIndex((post) => post.psid === psid);
      if (index > -1) {
        const copiedPosts = [...posts];
        copiedPosts[index].likesUser = copiedPosts[index].likesUser.filter(
          (likeUser) => likeUser !== displayName
        );
        queryClient.setQueryData(['posts'], copiedPosts);
      }
    }
  };

  // 로그인 구현시 '내닉네임' 부분 displayName으로 변경 예정
  const onClickLike = (e: any, post: Post) => {
    e.stopPropagation();
    const { psid } = post;
    if (post.likesUser.includes('내닉네임' as unknown as UserName)) {
      unLikeMutation.mutate({ psid, displayName: '내닉네임' as unknown as UserName });
    } else {
      likeMutation.mutate({ psid, displayName: '내닉네임' as unknown as UserName });
    }
  };

  const onClickShare = (post: Post) => {
    copy(post.blogURL);
    toast.success('클립보드에 복사되었습니다.');
  };
  //   //이거 orderby로
  //   useEffect(() => {
  //     if (posts) {
  //       setPostsData([...posts]?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
  //     }
  //   }, [posts]);

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
                    {/** */}
                    <div className={styles.postDate}>{getTimeAgo(post)}</div>
                  </div>
                </div>
                <button className={styles.postFollow}>팔로우</button>
              </div>
              <div className={styles.postTitle}>{post.title}</div>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <p className={styles.more}>... 더 보기</p>
              <div className={styles.openGraphBox}>
                <div className={styles.imageContainer}>
                  {/**dfaultimage */}
                  <img src={post.openGraph?.image} alt="Link Preview" />
                </div>
                <div className={styles.infoContainer}>
                  <p className={styles.title}>{post.openGraph?.title}</p>
                  <p className={styles.description}>{post.openGraph?.description}</p>
                  <p className={styles.url}>{post.openGraph?.url}</p>
                </div>
              </div>
              <div className={styles.tag}>{post.tags.map((tag) => `#${tag} `)}</div>
            </Link>
            <div className={styles.postFooter}>
              <div>
                {/* // 로그인 구현시 '내닉네임' 부분 displayName으로 변경 예정 */}
                <div className={styles.postLike} onClick={(e: any) => onClickLike(e, post)}>
                  {post.likesUser.includes('내닉네임' as unknown as UserName) ? (
                    <AiFillLike size={18} color="#4279e9" />
                  ) : (
                    <AiOutlineLike size={18} />
                  )}
                  <span>좋아요 </span>
                  <div className={styles.postLikeCount}>{post.likesUser.length}</div>
                </div>
                <Link href={`/posts/${post.psid}`}>
                  <div className={styles.postComment}>
                    <LiaCommentDots size={18} />
                    <span>댓글</span>
                    <div className={styles.postLikeCount}>{post.comments.length}</div>
                  </div>
                </Link>
              </div>
              <div className={styles.postShare}>
                <AiOutlineShareAlt size={18} onClick={() => onClickShare(post)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
