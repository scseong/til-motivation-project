import { HashLoader } from 'react-spinners';
import styles from './loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <HashLoader color="#d2e0fb" size={80} />
    </div>
  );
}
