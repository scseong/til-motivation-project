'use client';
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../postCreatePage.module.scss';

export default function Editor() {
  const [value, setValue] = useState('');
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
  console.log(value);

  return (
    <ReactQuill
      className={styles.editBox}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
    />
  );
}
