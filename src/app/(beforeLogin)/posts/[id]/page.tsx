import CommentList from './_components/CommentList';
import SideBar from '@/app/(beforeLogin)/home/_components/SideBar';
import styles from './page.module.css';
import PostDetail from './_components/PostDetail';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <PostDetail />
        <CommentList />
      </div>
      <SideBar />
    </div>
  );
}
