'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import { fetchOpengraphData } from './serverOpenGraph';
import LinkPreviewCard from './LinkPreviewCard';
import styles from './clientOpenGraph.module.scss';
import Button from './Button';
import { openGraph } from '@/typing/Post';
type Props = {
  setClientOpenGraphData: Dispatch<SetStateAction<openGraph | undefined>>;
  openGraphData?: openGraph;
};

export default function ClientOpenGraph({ setClientOpenGraphData, openGraphData }: Props) {
  console.log(openGraphData);
  const [url, setUrl] = useState(openGraphData?.url ? openGraphData.url : '');
  // const [blogChecker, setBlogChecker] = useState(false);
  //로그인된 유저의 정보를 가지고 firebase에 접근
  //접근 후 유저의 email과 제출 url의 email일치여부 확인하여
  //btn disable해제
  const [linkPreview, setLinkPreview] = useState(openGraphData ? true : false);
  const [opengraphData, setOpengraphData] = useState<openGraph>({
    title: openGraphData?.title ? openGraphData.title : '',
    description: openGraphData?.description ? openGraphData.description : '',
    url: openGraphData?.url ? openGraphData.url : '',
    image: openGraphData?.image ? openGraphData.image : ''
  });

  const handleButtonClick = async () => {
    const data = await fetchOpengraphData(url);
    if (data) {
      const openGraphData: openGraph = {
        title: data.ogTitle || '',
        description: data.ogDescription || '',
        url: data.ogUrl || '',
        image: data.ogImage?.[0]?.url || ''
      };
      setClientOpenGraphData(openGraphData);
      setOpengraphData(openGraphData);
      setLinkPreview(true);
      setUrl('');
    }
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
