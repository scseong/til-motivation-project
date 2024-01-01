'use client';
import { openGraph } from '@/typing/Post';
import styles from './linkPreviewCard.module.scss';
type Props = {
  opengraphData: openGraph;
};

export default function LinkPreviewCard({ opengraphData }: Props) {
  return (
    <a href={opengraphData?.url} target="_blank" className={styles.linkPreviewCard}>
      <div className={styles.imageContainer}>
        {/**dfaultimage */}
        <img src={opengraphData?.image} alt="Link Preview" />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.title}>{opengraphData?.title}</p>
        <p className={styles.description}>{opengraphData?.description}</p>
        <p className={styles.url}>{opengraphData?.url}</p>
      </div>
    </a>
  );
}
