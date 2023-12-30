'use client';
import styles from './linkPreviewCard.module.scss';
import { openGraph } from './ClientOpenGraph';
type Props = {
  opengraphData: openGraph | null | undefined;
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
