import RadioButtonGroup from '@components/common/RadioButtonGroup';
import { useState } from 'react';
import { AGE_LIST, SEX_LIST } from '@constants/signup';
import InputTemplate from '../InputTemplate';
import styles from './styles.module.scss';

export default function SignUpFirst() {
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  return (
    <>
      <InputTemplate htmlFor="name" name="닉네임">
        <input id="name" className={styles.name} />
      </InputTemplate>
      <InputTemplate id="sex" name="성별">
        <RadioButtonGroup
          setRadioButtonItem={setSex}
          radioButtonlist={SEX_LIST}
          label="sex"
        />
      </InputTemplate>
      <InputTemplate id="age" name="나이">
        <RadioButtonGroup
          setRadioButtonItem={setAge}
          radioButtonlist={AGE_LIST}
          label="age"
        />
      </InputTemplate>
    </>
  );
}
