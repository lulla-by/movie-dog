import styled from 'styled-components';
import Input from '../components/input/Input';
import ConfirmButton from '../components/buttons/ConfirmButton';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { firebaseLogin } from '@/utils/UserLogin';
import { LoginState, LoginToken } from '@/stores/LoginState';
import { useSetRecoilState } from 'recoil';

export default function Login() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const loginState = useSetRecoilState(LoginState);
  const loginToken = useSetRecoilState(LoginToken);

  const getInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.placeholder) {
      case '이메일':
        setId(e.target.value);
        break;
      case '비밀번호':
        setPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  const login = async () => {
    if (id.trim().length <= 0 || password.trim().length <= 0) {
      console.log('올바른 형식이 아님');
      return;
    }
    const userData = await firebaseLogin(id, password);

    if (userData.state === false) {
      return;
    }

    loginState(userData.state);
    loginToken(userData.uid);
    router.push('/');
  };

  return (
    <Container>
      <LoginBox>
        <TitleBox>로그인</TitleBox>
        <Input onChange={getInputData} placeholder="이메일" />
        <ExtendsPasswordInput
          type="password"
          onChange={getInputData}
          placeholder="비밀번호"
        />
        <ExtendsConfirmButton onClick={login} text="로그인" />
        <ExtendsConfirmButton text="회원가입" />
        <TextBox>
          <p>OR</p>
        </TextBox>
        <ButtonContainer>
          <ExtendsConfirmButton width={48} icon="Github" text="깃허브 로그인" />
          <ExtendsConfirmButton width={48} icon="Google" text="구글 로그인" />
        </ButtonContainer>
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
  padding-bottom: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExtendsConfirmButton = styled(ConfirmButton)`
  margin: 20px 0px 0px 0px;
`;

const ExtendsPasswordInput = styled(Input)`
  margin-top: 20px;
`;

const LoginBox = styled.div`
  width: 386px;
  margin: auto;
`;

const TitleBox = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline1};
  font-weight: 700;
  margin: 100px 0px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.brown5};
  font-size: ${({ theme }) => theme.fontSize.discription};
  font-weight: 400;

  & p {
    margin: 0px 12px;
  }
  &::before,
  ::after {
    content: '';
    width: 170px;
    height: 1px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.brown5};
  }
`;
