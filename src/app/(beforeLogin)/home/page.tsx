import List from './_components/List';
import SideBar from './_components/SideBar';
import Write from './_components/WriteBar';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Write />
        <List />
      </div>
      <SideBar />
    </div>
  );
}
