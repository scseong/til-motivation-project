'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import { fetchOpengraphData } from './serverOpenGraph';
import LinkPreviewCard from './LinkPreviewCard';
import styles from './clientOpenGraph.module.scss';
import Button from './Button';
type Props = {
  setClientOpenGraphData: Dispatch<SetStateAction<openGraph | undefined>>;
};
export type openGraph = {
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  image: string | undefined;
};
export default function ClientOpenGraph({ setClientOpenGraphData }: Props) {
  const [url, setUrl] = useState('');
  // const [blogChecker, setBlogChecker] = useState(false);
  //로그인된 유저의 정보를 가지고 firebase에 접근
  //접근 후 유저의 email과 제출 url의 email일치여부 확인하여
  //btn disable해제
  const [linkPreview, setLinkPreview] = useState(false);
  const [opengraphData, setOpengraphData] = useState<openGraph>();

  const handleButtonClick = async () => {
    const data = await fetchOpengraphData(url);
    const openGraphData = {
      title: data!.ogTitle,
      description: data!.ogDescription,
      url: data!.ogUrl,
      image: data!.ogImage?.[0]?.url
    };
    setClientOpenGraphData(openGraphData);
    setOpengraphData(openGraphData);
    setLinkPreview(true);
    setUrl('');
  };

  return (
    <>
      <div className={styles.urlForm}>
        <input
          className={styles.urlInput}
          placeholder="작성하신 TIL의 주소를 입력해 주세요!"
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button btntype={'button'} onClick={handleButtonClick} disabled={!url} text={'제출'} />
      </div>

      {linkPreview ? <LinkPreviewCard opengraphData={opengraphData} /> : ''}
    </>
  );
}