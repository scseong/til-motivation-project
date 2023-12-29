import { OgObject } from 'open-graph-scraper/dist/lib/types';
import { ReactNode } from 'react';
import styles from './linkPreviewCard.module.scss';
import Link from 'next/link';
type Props = {
  opengraphData: OgObject | null | undefined;
};
export default function LinkPreviewCard({ opengraphData }: Props) {
  return (
    <a href={opengraphData?.ogUrl} target="_blank" className={styles.linkPreviewCard}>
      <div className={styles.imageContainer}>
        {/**dfaultimage */}
        <img src={opengraphData?.ogImage?.[0]?.url} alt="Link Preview" />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.title}>{opengraphData?.ogTitle}</p>
        <p className={styles.description}>{opengraphData?.ogDescription}</p>
        <p className={styles.url}>{opengraphData?.ogUrl}</p>
      </div>
    </a>
  );
}
