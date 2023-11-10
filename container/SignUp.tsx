import styled from 'styled-components';
import Input from '../components/input/Input';
import ConfirmButton from '../components/buttons/ConfirmButton';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { authService, db } from '@/fbase';
import { useRouter } from 'next/router';
import { validation } from '@/utils/Validation';

interface HelperText {
  id: string;
  nickName: string;
  password: string;
  passWordConfirm: string;
  [key: string]: string;
}

export default function SignUp() {
  const router = useRouter();
  // 회원가입
  const signup = async () => {
    try {
      // 회원가입
      const data = await createUserWithEmailAndPassword(
        authService,
        id,
        password,
      );

      // collection 유저정보 추가
      await setDoc(doc(db, 'users', id), {
        email: id,
        uid: data.user.uid,
        nickName,
      });
    } catch (error) {
      // console.log(error);
    }
    router.push('/login');
  };

  const defautlHelperText: HelperText = {
    id: '아이디는 이메일 형식이어야 합니다.',
    nickName:
      '닉네임은 2자 이상 8자 이하의 한글, 영문, 숫자로 이루어져야 합니다.',
    password:
      '비밀번호는 8자리 이상이어야 하며, 영문과 숫자를 포함해야 합니다.',
    passWordConfirm: '비밀번호를 한번 더 입력해주세요.',
  };

  const validatedHelperText: HelperText = {
    id: '사용가능한 아이디입니다. 중복검사를 진행해주세요',
    nickName: '사용가능한 닉네임 입니다.',
    password: '사용가능한 비밀번호 입니다.',
    passWordConfirm: '비밀번호가 일치합니다.',
  };

  // 이메일 중복확인
  const [emailDuplication, setEmailDuplication] = useState(false);

  // input값 관리
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');

  const [passWordConfirm, setPasswordConfirm] = useState('');


  const gmailRegex = /@gmail\.com$/;

  const idValidation = validation('id', id) && !gmailRegex.test(id);
  const nickNameValidation = validation('nickName', nickName);
  const passwordValidation = validation('password', password);
  const passwordConfirmValidation =
    passwordValidation && password === passWordConfirm;

  const validationConfirm = !(
    emailDuplication === true &&
    nickNameValidation === true &&
    passwordValidation === true &&
    passwordConfirmValidation === true
  );

  // 중복값 체크
  const checkEmailDuplication = async (id: string) => {
    if (!idValidation) {
      // 아이디가 이메일 형식이 아니면 중복 확인을 수행하지 않음
      return;
    }

    let isDuplicate = true;

    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        isDuplicate = false;
        alert('존재하는 이메일입니다.');
        setId('');
      }
    });

    setEmailDuplication(isDuplicate);
  };

  //input 값 관리
  const getInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.placeholder) {
      case '닉네임':
        setNickName(e.target.value);
        break;
      case '비밀번호':
        setPassword(e.target.value);
        break;
      case '비밀번호 확인':
        setPasswordConfirm(e.target.value);
        break;
      default:
        setEmailDuplication(false);
        setId(e.target.value);
        break;
    }
  };

  let idText;

  // idvalidation이 false일 때
  if (!idValidation) {
    if (gmailRegex.test(id)) {
      idText = '로그인 페이지의 구글로그인을 사용해주세요.';
    } else {
      idText = `아이디는 이메일형식 이어야 합니다.`;
    }
  }
  // idvalidation이 true이고 emailduplication이 true일 때
  else if (idValidation && emailDuplication) {
    idText = '사용 가능한 아이디입니다';
  }
  // 그 외의 경우 (idvalidation이 true이고 emailduplication이 false일 때)
  else {
    idText = '중복 검사를 진행해주세요';
  }

  return (
    <Container>
      <LoginBox>
        <TitleBlock>회원가입</TitleBlock>
        <fieldset>
          <LegendBlock>회원가입 폼</LegendBlock>
          <IdCheckBox>
            <InputBlock
              onChange={getInputData}
              state="default"
              placeholder="아이디(이메일 주소)"
              helperText={idText}
            />
            <ConfirmButton
              onClick={() => {
                checkEmailDuplication(id);
              }}
              text="중복확인"
            />
          </IdCheckBox>
          <InputBlock
            onChange={getInputData}
            state="default"
            placeholder="닉네임"
            helperText={
              nickNameValidation
                ? validatedHelperText.nickName
                : defautlHelperText.nickName
            }
          />
          <InputBlock
            type="password"
            onChange={getInputData}
            state="default"
            placeholder="비밀번호"
            helperText={
              passwordValidation
                ? validatedHelperText.password
                : defautlHelperText.password
            }
          />
          <InputBlock
            type="password"
            onChange={getInputData}
            state="default"
            placeholder="비밀번호 확인"
            helperText={
              passwordConfirmValidation
                ? validatedHelperText.passWordConfirm
                : defautlHelperText.passWordConfirm
            }
          />
          <ConfirmButton
            onClick={signup}
            text="회원가입"
            disabled={validationConfirm}
          />
        </fieldset>
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1280px;
  padding: 100px 20px;
  margin: 0 auto;
  text-align: center;
`;

const LoginBox = styled.div`
  max-width: 386px;
  margin: 0 auto;

  @media (max-width: 426px) {
    max-width: 100%;
  }
`;

const TitleBlock = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline1};
  font-weight: 700;
  margin-bottom: 100px;
`;

const LegendBlock = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`;

const IdCheckBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  div {
    flex-grow: 1;
  }

  button {
    width: 92px;
    height: 40px;
  }
`;

const InputBlock = styled(Input)`
  margin-bottom: 12px;
`;
