import CommentList from './_components/CommentList';
import Post from './_components/Post';
import SideBar from '@/app/(beforeLogin)/home/_components/SideBar';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Post />
        <CommentList />
      </div>
      <SideBar />
    </div>
  );
}
