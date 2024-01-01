import { Post } from '@/typing/Post';
import moment from 'moment';

export const getTimeAgo = (post: Post) => {
  const now = moment();
  const postDate = moment(post.createdAt.toDate());
  const diff = now.diff(postDate, 'minutes');
  if (diff < 60) {
    return `${diff}분 전`;
  } else if (diff < 1440) {
    return `${Math.floor(diff / 60)}시간 전`;
  } else if (diff < 10080) {
    return `${Math.floor(diff / 1440)}일 전`;
  } else {
    return postDate.format('YYYY년 MM월 DD일');
  }
};
