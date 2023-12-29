'use client';
import { useState, FormEvent } from 'react';
import { OgObject } from 'open-graph-scraper/dist/lib/types';
import { fetchOpengraphData } from './serverOpenGraph';
import LinkPreviewCard from './LinkPreviewCard';
import styles from './clientOpenGraph.module.scss';
import Button from './Button';

export default function ClientOpenGraph() {
  const [url, setUrl] = useState('');
  // const [blogChecker, setBlogChecker] = useState(false);
  //로그인된 유저의 정보를 가지고 firebase에 접근
  //접근 후 유저의 email과 제출 url의 email일치여부 확인하여
  //btn disable해제
  const [linkPreview, setLinkPreview] = useState(false);
  const [opengraphData, setOpengraphData] = useState<OgObject | null>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = await fetchOpengraphData(url);
    console.log(data);
    setOpengraphData(data); // 서버로부터 받은 데이터 처리
    setLinkPreview(true);
    setUrl('');
  };

  return (
    <>
      <form className={styles.urlForm} onSubmit={handleSubmit}>
        <input
          className={styles.urlInput}
          placeholder="작성하신 TIL의 주소를 입력해 주세요!"
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button btntype={'submit'} disabled={!url} text={'제출'} />
      </form>

      {linkPreview ? <LinkPreviewCard opengraphData={opengraphData} /> : ''}
    </>
  );
}
