import { BsSearchHeart } from 'react-icons/bs';

export default function Page() {
  return (
    <div>
      <div className="">
        <BsSearchHeart size={20} />
        <input type="text" placeholder="검색어를 입력하세요." />
      </div>
    </div>
  );
}
