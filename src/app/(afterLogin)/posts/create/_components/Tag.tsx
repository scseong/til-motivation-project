'use client';
import React, { useState, ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react';
import styles from './tag.module.scss';
type Props = {
  setTagData: Dispatch<SetStateAction<string[]>>;
  tagData?: string[];
};

function Tag({ setTagData, tagData }: Props) {
  const [tags, setTags] = useState<string[]>(tagData ? tagData : []);
  const [tag, setTag] = useState<string>('');

  const removeTag = (i: number): void => {
    const clonetags = tags.slice();
    clonetags.splice(i, 1);
    setTags(clonetags);
    setTagData(clonetags);
  };

  const addTag = (e: ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = (): void => {
    setTags([...tags, tag]);
    setTagData([...tags, tag]);
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
          onKeyDown={(e) => handleKeyPress(e)}
          value={tag}
        />
      </div>
    </>
  );
}

export default Tag;
