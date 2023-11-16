import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import useDebounce from '@/hooks/useDebounce';
import { postCheckNickNameAPI } from '@/services/signUp';
import NickName from '@/components/signUp/NickName';
import Button from '@/components/common/Button';
import { patchModifyUserInfoAPI } from '@/services/user';
import { ModifyUserInfoTypes } from '@/types/user';
import { ROUTE_PATHS } from '@/constants/config';
import { nameState } from '@/store/atom/signUpAtom';
import useStatus from '@/hooks/useStatus';
import styles from './styles.module.scss';

export default function ModifyUserInfo() {
  const navigate = useNavigate();
  const name = useRecoilValue(nameState);
  const setName = useSetRecoilState(nameState);
  const profileImage = useRecoilValue(userProfileImageState);
  const setProfileImage = useSetRecoilState(userProfileImageState);
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const debouncedInputText = useDebounce(name);
  useStatus('modifyUserInfo', '회원정보 수정');

  const checkNickName = async (value: string) => {
    const data = await postCheckNickNameAPI(value);
    if (!value || data.detail === 'Username already exists!') {
      setNickNameValidation(false);
    } else {
      setNickNameValidation(true);
    }
  };

  const nickNameHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(event.target.value);
  };

  const submitHandler = async () => {
    const obj: ModifyUserInfoTypes = {};
    if (name && nickNameValidation) {
      obj.user_name = name;
    }
    if (deleteImage && profileImage !== 'default') {
      obj.user_photo = 'default';
    }
    try {
      if (obj.user_name || obj.user_photo) {
        await patchModifyUserInfoAPI(obj);
      }
    } finally {
      setName(name);
      setProfileImage('default');
      navigate(ROUTE_PATHS.myPage);
    }
  };

  useEffect(() => {
    if (debouncedInputText) {
      checkNickName(debouncedInputText);
    }
  }, [debouncedInputText]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.content}>
        <div className={styles.profileWrapper}>
          {profileImage !== 'default' && deleteImage === false ? (
            <img src={profileImage} />
          ) : (
            <img src={gildong} />
          )}
          {profileImage === 'default' ? null : (
            <span
              className={styles.delete}
              onClick={() => setDeleteImage(!deleteImage)}
            >
              프로필 사진 삭제
            </span>
          )}
        </div>
        <div>
          <span>닉네임</span>
          <NickName
            value={name}
            onChange={nickNameHandler}
            validation={nickNameValidation}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <Button
            variant="lined"
            color="secondary"
            full={true}
            size="lg"
            onClick={() => navigate(ROUTE_PATHS.myPage)}
          >
            취소
          </Button>
          {(name && nickNameValidation) ||
          (deleteImage && profileImage !== 'default') ? (
            <Button
              type="submit"
              variant="primary"
              full={true}
              size="lg"
              onClick={submitHandler}
            >
              완료
            </Button>
          ) : (
            <Button variant="disabled" full={true} size="lg">
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
