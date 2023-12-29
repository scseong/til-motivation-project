'use client';
import { useState, FormEvent } from 'react';
import { OgObject } from 'open-graph-scraper/dist/lib/types';
import { fetchOpengraphData } from './serverOpenGraph';
import LinkPreviewCard from './LinkPreviewCard';

export default function ClientOpenGraph() {
  const [url, setUrl] = useState('');
  const [linkPreview, setLinkPreview] = useState(false);
  const [opengraphData, setOpengraphData] = useState<OgObject | null>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    //로그인된 유저의 정보를 가지고 firebase에 접근
    //접근 후 유저의 email과 제출 url의 email일치여부 확인
    //이후 오픈그래프실행
    const data = await fetchOpengraphData(url);
    console.log(data);
    setOpengraphData(data); // 서버로부터 받은 데이터 처리
    setLinkPreview(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">제출</button>
      </form>
      {/* <p>{opengraphData?.ogTitle}</p>
      <p>{opengraphData?.ogDescription}</p>
      <p>{opengraphData?.ogUrl}</p>
      <p>{opengraphData?.ogImage?.[0].url}</p> */}
      {linkPreview ? <LinkPreviewCard opengraphData={opengraphData} /> : ''}
    </>
  );
}
