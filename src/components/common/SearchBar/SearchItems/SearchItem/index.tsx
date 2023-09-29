import { BiSearch } from 'react-icons/bi';
import { SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import { residenceState } from '@/store/atom/signUpAtom';
import { residenceType } from '@/types/signUp';
import styles from './styles.module.scss';

interface SearchItemProps {
  residence: residenceType;
  setInputText: React.Dispatch<SetStateAction<string>>;
}
export default function SearchItem({
  residence,
  setInputText,
}: SearchItemProps) {
  const setResidence = useSetRecoilState(residenceState);

  const searchItemHandler = () => {
    setInputText('');
    setResidence(residence);
  };
  return (
    <li className={styles.container} onClick={searchItemHandler}>
      <div className={styles.icon}>
        <BiSearch />
      </div>
      {residence.word}
    </li>
  );
}
