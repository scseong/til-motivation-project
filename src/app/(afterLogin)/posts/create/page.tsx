'use client';
import { useState } from 'react';
import styles from './postCreatePage.module.scss';
import { addPosts } from '@/api/posts';
import { Timestamp } from 'firebase/firestore';
import { Post, openGraph } from '@/typing/Post';
import ClientOpenGraph from './_components/ClientOpenGraph';
import Editor from './_components/Editor';
import Tag from './_components/Tag';
import Button from './_components/Button';

export default function Create() {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [openGraphData, setClientOpenGraphData] = useState<openGraph | undefined>();
  const [tagData, setTagData] = useState<string[]>([]);
  const handleSubmit = async () => {
    const formData: Omit<Post, 'psid'> = {
      displayName: 'abc',
      photoUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAeFBMVEX///8EBAQAAAC7u7tcXFzh4OFaWVrl5eX5+fmNjY38/PxCQkPPz9BUVFTd3d1hYWJLS0zq6+tdW2AjIyNqamoNDQ3z8/MYGBhwcHC1tbYdHR2Dg4Stra17e3uVlZUxMTKfn586OjvGxscyLjYgHiI6Nj4oJSobFh+E0s+FAAAElUlEQVR4nO3daXeiMBQGYAguiIAw7IuATqfz///hsNTiaCPBYm6S3vdTjz323KchEUKCmobBYDAYDAaD+VGx4i6mCV3H92PaWbHx9nvP2RiGDV3N99Js8kQnQ5KkTktp2ycuB4U+pP+5zmLosp7KuR4h+gg6GdCFzY9V3Ek+PHkjW+PEhf61pWud1IUub1biXUSztBo93UIXOCNW9cDStY1ER5plnB5Zun6TSTNG2ytK5x81+zN0kYyJd1OWVrOS40CzjP2kpe02GXSdTPFpnzD/azwpRjR3w2Bpm0aG004rezgsj5oQulKGtN2fxdI2DXSlDHE9NoxOJBid7YQVU0CXOh2bZSzrMQ50qdOxGS06OUGXOhmzZMbsoWudTFyohGEcmaXAmI1CfWbGaCZ+y8zASHA+405cZY6YCrrU6fipQqczccV6oinBNIBlvLNdAjTQlbLEPahzcaZpJcvVGTlKcJRpbE1DEjkaRtOyYHqqqbSgq2RMPDU/Q8hKirmZPu7jKU1CPJnuA9jeAw0htSwdZojtUDWEODK1Sxfbib7kEJKv5GqXLu6uvtcQQvaNPH3/KlmYX91s/rjbnEp4f7aPXxZenZNLgpOzK6VsliGWbTRp2Cc9lrIv0dA0c7vus/WhK8FgxMqlb/Td4zPbS8ZX1jfxhTt/tqvQ8S5xnM1Hrl67e+XzN2kl0ihnnQ9JRJ5PlDjCLESz0+j6k352epAjxMRTXOnfgFyBUvgPIv+4AGXwgF/lbMOlLJ3GAO05LsPKkhkasgNcUeM7S1q6pVtwkzbMc+Tsmr0BpDGPS1u6+QGgUaBZru+PGv0IMkK79fKWVhNAnAxY6QsaptMcACaiyukJ5ecwScndYq1eY+lu3K55Y4yX9Jgek2e8h+eKdSXWfAwpeA9or8PohPvq+keL/b+LOfDuNIgRFVMohNky3exHDH/MmmmNPGIQszCGPDcR+MW74DHkVGbZ/LkaEoTh7bWEAJhulRLzAu3xbY59t9tOAMyuxRjzMautfdueiEHMBCZqw+iIhMfMaBrxMewWpTCRSphEHUz09lsZTPT254+uDub9XRmMfjlXVgLz+TbEIAYIs+F8u+mlGN6LuF+L4XzH+R5TtZjz7CkNgTH230UwnhCYWdczImMW7DOIQQxiEIMY4TBKnWj+QgxiEIMYxCAGMYhBjCAYghhBMXiYIYYDBg8zUTH8W+bucdkyt8yCGP8IjYlv9zQ/jVlbtw945Y7Rbr74g5Bub9VTmNtnuxH+m4Hizf9PLjp0BTyHMZvrXVIEYM+Z5qbjg4v0ZNjBR8PQl293GM3cJVcPoQgqiK3nRrgPutTe0R7+lxQMSYL8EUazskOdJ23y4HT5W9zjl13On/t3v8aQoCgbyk7IAdM2zrmp2jQZ9z2a1FAw3SIFypMDLhgBQ8EcXM1CDGgQA100LYiBLpoWxEAXTQtioIum5WdjiMBfDzQfE+2ga6YGMaIGMaIGMaLmZ2N0lTCRShilWkapPoMYTkGMqEGMqEGMqEGMqEGMqPkJmHCNGOBQMOmWitGlw1SmQpijrxCGz2H2DwDqc3qirflZAAAAAElFTkSuQmCC',
      title,
      content: editorContent,
      createdAt: Timestamp.now(),
      blogURL: openGraphData!.url,
      likesUser: [],
      comments: [],
      tags: tagData,
      openGraph: openGraphData || undefined
    };
    addPosts(formData);
  };
  return (
    <div className={styles.container}>
      <form className={styles.postingForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.titleBox}>
          <input
            className={styles.postTitle}
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.editorBox}>
          <Editor setEditorContent={setEditorContent} />
        </div>
        <ClientOpenGraph setClientOpenGraphData={setClientOpenGraphData} />
        <Tag setTagData={setTagData} />
        <div className={styles.postingBtnBox}>
          <Button text="게시하기" onClick={handleSubmit} />
          <Button text="취소" />
        </div>
      </form>
    </div>
  );
}
