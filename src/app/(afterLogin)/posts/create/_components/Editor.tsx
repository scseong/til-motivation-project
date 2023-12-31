'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from '../postCreatePage.module.scss';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type Props = {
  setEditorContent: Dispatch<SetStateAction<string>>;
  content?: string;
};
export default function Editor({ setEditorContent, content }: Props) {
  const [value, setValue] = useState(content ? content : '');
  const handleChange = (content: string) => {
    setValue(content);
    setEditorContent(content);
  };
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff'
          ]
        }
      ]
    ]
  };
  const formats = [
    'header',
    'height',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'color',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'size'
  ];

  return (
    <ReactQuill
      className={styles.editBox}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
      placeholder="작성하신 TIL을 소개해 주세요!"
    />
  );
}
