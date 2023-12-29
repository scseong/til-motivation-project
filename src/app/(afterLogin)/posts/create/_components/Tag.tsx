'use client';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styles from './tag.module.scss';
function Tag() {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');

  const removeTag = (i: number): void => {
    const clonetags = tags.slice();
    clonetags.splice(i, 1);
    setTags(clonetags);
  };

  const addTag = (e: ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = (): void => {
    setTags([...tags, tag]);
    setTag('');
  };

  return (
    <>
      <div className={styles.tagContainer}>
        <p className={styles.tagTitle}>Tag</p>
        <ol className={styles.tagBox}>
          {tags.map((tag, i) => (
            <li className={styles.tag} key={i}>
              <p className={styles.tagName}># {tag}</p>
              <button className={styles.removeTagBtn} onClick={() => removeTag(i)}>
                x
              </button>
            </li>
          ))}
        </ol>
        <input
          className={styles.addTag}
          placeholder="태그 입력 후 Enter를 누르세요."
          onChange={(e) => addTag(e)}
          onKeyPress={(e) => handleKeyPress(e)}
          value={tag}
        />
      </div>
    </>
  );
}

export default Tag;
//에디터박스에 맞춰라
/**
 * 저거 태그 적당ㅎ,ㅣ길어지다가 스크롤써라=>한줄 더?
 * 1400짜리 컨테이너 어디갔노 만들었으면 써야지 보이게해라
 *
 */
