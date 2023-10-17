import styled from 'styled-components';
import Input from '../components/input/Input';
import ConfirmButton from '../components/buttons/ConfirmButton';
import { useState } from 'react';

interface HelperText {
  id: string;
  nickName: string;
  password: string;
  passWordConfirm: string;
  [key: string]: string;
}

export default function SignUp() {
  const defautlHelperText: HelperText = {
    id: '아이디는 이메일 형식이어야 합니다.',
    nickName:
      '닉네임은 2자 이상 8자 이하의 한글, 영문, 숫자로 이루어져야 합니다.',
    password:
      '비밀번호는 8자리 이상이어야 하며, 영문과 숫자를 포함해야 합니다.',
    passWordConfirm: '비밀번호를 한번 더 입력해주세요.',
  };

  const [helperText, setHelperrText] = useState({
    id: defautlHelperText.id,
    nickName: defautlHelperText.nickName,
    password: defautlHelperText.password,
    passWordConfirm: defautlHelperText.passWordConfirm,
  });

  // 이메일 중복확인
  const [emailDuplication, setEmailDuplication] = useState(false);

  // input값 관리
  const [id, setId] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passWordConfirm, setPasswordConfirm] = useState<string>('');

  // validation
  const idPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const idValidation = idPattern.test(id);

  const nickNamePattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,8}$/;
  const nickNameValidation = nickNamePattern.test(nickName);

  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const passwordValidation = passwordPattern.test(password);
  

  const passwordConfirmValidation = password === passWordConfirm;

  const validationConfirm = !(
    emailDuplication == true &&
    nickNameValidation == true &&
    passwordValidation == true &&
    passwordConfirmValidation == true
  );

  // 중복값 체크
  const checkEmailDuplication = () => {
    if (idValidation) {
      setEmailDuplication(true);
      return;
    } else {
      console.log('이메일을 확인해주세요');
    }
  };

  const check = (property: string, validation: boolean) => {
    validation
      ? setHelperrText({ ...helperText, [property]: `사용가능합니다.` })
      : setHelperrText({
          ...helperText,
          [property]: defautlHelperText[property],
        });
  };

  //input 값 관리
  const getInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.placeholder) {
      case '닉네임':
        setNickName(e.target.value);
        check('nickName', nickNameValidation);
        break;
      case '비밀번호':
        setPassword(e.target.value);
        check('password', passwordValidation);
        break;
      case '비밀번호 확인':
        setPasswordConfirm(e.target.value);
        check("passwordConfirm",passwordConfirmValidation)
        break;
      default:
        setEmailDuplication(false);
        setId(e.target.value);
        check('id', idValidation);
        break;
    }
  };

  // 회원가입
  const signUp = () => {
    console.log('회원가입 신청');
  };

  return (
    <Container>
      <LoginBox>
        <Title>회원가입</Title>
        <IdCheckBox>
          <ExtendsEmailInput
            onChange={getInputData}
            state="default"
            placeholder="아이디(이메일 주소)"
            helperText={helperText.id}
          />
          <ExtendsConfirmButton
            onClick={checkEmailDuplication}
            width={23}
            text="중복확인"
          />
        </IdCheckBox>
        <ExtendsDefaultInput
          onChange={getInputData}
          state="default"
          placeholder="닉네임"
          helperText={helperText.nickName}
        />
        <ExtendsDefaultInput
          type="password"
          onChange={getInputData}
          state="default"
          placeholder="비밀번호"
          helperText={helperText.password}
        />
        <ExtendsDefaultInput
          type="password"
          onChange={getInputData}
          state="default"
          placeholder="비밀번호 확인"
          helperText={helperText.passWordConfirm}
        />
        <ConfirmButton
          onClick={signUp}
          text="회원가입"
          disabled={validationConfirm}
        />
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin: auto;
  text-align: center;
  padding-bottom: 207px;
`;

const LoginBox = styled.div`
  width: 386px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline1};
  font-weight: 700;
  margin: 100px 0px;
`;

const IdCheckBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExtendsEmailInput = styled(Input)`
  width: 300px;
  margin-bottom: 10px;
`;

const ExtendsDefaultInput = styled(Input)`
  margin-bottom: 10px;
`;

const ExtendsConfirmButton = styled(ConfirmButton)`
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 8px;
`;
