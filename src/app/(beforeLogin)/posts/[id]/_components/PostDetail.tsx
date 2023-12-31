'use client';
import { AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import styles from './Post.module.scss';
import AddComment from './AddComment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPostDetail } from '@/api/posts';
import Link from 'next/link';
import { Post } from '@/typing/Post';
import Loader from '@/app/_components/Loader';
import { useAuth } from '@/app/_components/AuthSession';
import { useRouter } from 'next/navigation';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

export default function PostDetail() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: post
  } = useQuery<Post>({
    queryKey: ['posts', id],
    queryFn: () => getPostDetail(id)
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleDelete = (postId: string) => {
    Swal.fire({
      title: '게시물을 삭제하겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePostMutation.mutate(postId);
        router.push('/');
        Swal.fire({ icon: 'success', title: '게시물을 삭제했습니다' });
      }
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  const {
    uid,
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

  const onClickShare = (post: string) => {
    copy(blogURL);
    toast.success('클립보드에 복사되었습니다.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.userInfo}>
          <Link href={`/profile/${uid}`}>
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
          {user?.displayName === displayName ? (
            <div className={styles.btnWriter}>
              <Link href={`update/${id}`}>
                <FaPencilAlt size="16" />
              </Link>
              <button className={styles.btnDelete} onClick={() => handleDelete(id)}>
                <FaRegTrashAlt size="16" />
              </button>
              <button className={styles.btnShare}>
                <AiOutlineShareAlt size="20" onClick={() => onClickShare(blogURL)} />
              </button>
            </div>
          ) : (
            <button className={styles.btnShare}>
              <AiOutlineShareAlt size="20" onClick={() => onClickShare(blogURL)} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.div}>
        <AddComment commentCount={comments.length} />
      </div>
    </div>
  );
}
