'use client';
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../postCreatePage.module.scss';
//볼드 왜안됨?
//max-width!
//높이 고정=> 스크롤로 전환?

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
      // style={{ maxWidth: '600px', height: '200px' }}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
    />
  );
}

// export default function Editor() {
//   const [contents, setContents] = useState('');
//   const QuillRef = useRef<ReactQuill>();
//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: [
//           ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//           [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
//           [
//             { list: 'ordered' },
//             { list: 'bullet' },
//             { indent: '-1' },
//             { indent: '+1' },
//             { align: [] }
//           ],
//           ['image', 'video']
//         ]
//         // handlers: {
//         //   image: imageHandler
//         // }
//       }
//     }),
//     []
//   );

//   return (
//     <>
//       <ReactQuill
//         ref={(element) => {
//           if (element !== null) {
//             QuillRef.current = element;
//           }
//         }}
//         value={contents}
//         onChange={setContents}
//         modules={modules}
//         theme="snow"
//         placeholder="내용을 입력해dd주세요."
//       />
//     </>
//   );
// }

// class MyComponent extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         text: "",
//       }
//     }

//     modules = {
//       toolbar: [
//         [{ 'header': [1, 2, false] }],
//         ['bold', 'italic', 'underline','strike', 'blockquote'],
//         [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//         ['link', 'image'],
//         ['clean']
//       ],
//     },

//     formats = [
//       'header',
//       'bold', 'italic', 'underline', 'strike', 'blockquote',
//       'list', 'bullet', 'indent',
//       'link', 'image'
//     ],

//     render() {
//       return (
//         <div className="text-editor">
//           <ReactQuill theme="snow"
//                       modules={this.modules}
//                       formats={this.formats}>
//           </ReactQuill>
//         </div>
//       );
//     }
//   }

// export default MyComponent;
