'use client';
import styles from './UpdateModal.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/_components/AuthSession';
import { UserProfile } from '@/typing/User';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { checkDisplayNameExists } from '@/shared/auth';
import { BLOG_REGEX } from '@/utils/regex';
import Image from 'next/image';
import { updateUserProfile } from '@/api/users';
export interface FormData {
  photoImg: string;
  nickname: string;
  editComment: string;
  email: string;
  uid: string;
}

export default function UpdateModal() {
  const { user } = useAuth();
  const userProfile = user as UserProfile;
  const { photoURL, displayName, comment, blogURL, uid } = userProfile;
  const router = useRouter();

  const { handleSubmit, control, setValue, getValues } = useForm<FormData>();
  const [checkNickname, setCheckNickname] = useState(false);
  useEffect(() => {
    setValue('nickname', displayName);
    setValue('editComment', comment);
    setValue('email', blogURL);
    setValue('uid', uid);
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await updateUserProfile(data);
    router.replace(`https://til-motivation-project.vercel.app/profile/${uid}`);
  };
  const handleNicknameChange = async (nickname: string) => {
    if (displayName === nickname) {
      return;
    }
    const res = await checkDisplayNameExists(nickname);
    setCheckNickname(res);
  };

  const onHandleCloseBtn = () => {
    router.replace(`https://til-motivation-project.vercel.app/profile/${uid}`);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onHandleCloseBtn}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>프로필 수정</div>
        </div>

        <form className={styles.eidtBoxWrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.editBox}>
            <div className={styles.profileImage}>
              <Image src={photoURL} alt="" fill={true} />
            </div>

            <div className={styles.inputBox}>
              <label>닉네임</label>
              <Controller
                name="nickname"
                control={control}
                defaultValue={displayName}
                render={({ field }) => (
                  <div>
                    <input {...field} onBlur={(e) => handleNicknameChange(e.target.value)} />
                    {checkNickname && (
                      <span style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className={styles.inputBox}>
              <label>소개</label>
              <Controller
                name="editComment"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} />}
              />
            </div>

            <div className={styles.inputBox}>
              <label>블로그 주소</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'TIL 블로그를 입력해주세요.',
                  pattern: {
                    value: BLOG_REGEX,
                    message: '사용가능한 블로그 주소 (tistory, medium, github, velog, notion).'
                  }
                }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} id="blog-url" placeholder="TIL 블로그 주소" />
                    {fieldState.error && (
                      <span style={{ color: 'red' }}>{fieldState.error.message}</span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className={styles.editBtnWrapper}>
            <button className={styles.editBtn} type="submit">
              수정완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
