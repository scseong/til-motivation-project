import { OgObject } from 'open-graph-scraper/dist/lib/types';
import { ReactNode } from 'react';
import styles from './linkPreviewCard.module.scss';
type Props = {
  opengraphData: OgObject | null | undefined;
};
export default function LinkPreviewCard({ opengraphData }: Props) {
  return (
    <div className={styles.link_preview_card}>
      <div className={styles.image_container}>
        {/**dfaultimage */}
        <img src={opengraphData?.ogImage?.[0]?.url} alt="Link Preview" />
      </div>
      <div className={styles.info_container}>
        <p className={styles.title}>{opengraphData?.ogTitle}</p>
        <p className={styles.description}>{opengraphData?.ogDescription}</p>
        <p className={styles.url}>{opengraphData?.ogUrl}</p>
      </div>
    </div>
  );
}
