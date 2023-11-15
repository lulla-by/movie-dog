import styled from 'styled-components';
import Input from '../components/input/Input';
import ConfirmButton from '../components/buttons/ConfirmButton';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GithubLogin, GoogleLogin, firebaseLogin } from '@/utils/UserLogin';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { LoginsState } from '@/stores/LoginState';
import { validation } from '@/utils/Validation';

export default function Login() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 상태 전역관리
  const isLogin = useSetRecoilState(LoginsState);

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

  // 로그인
  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const targetName = target.innerText;
    let userData;

    // 파이어베이스 로그인
    if (targetName === '로그인') {
      userData = await firebaseLogin(id, password);

      // 구글 로그인
    } else if (targetName === '구글 로그인') {
      userData = await GoogleLogin();

      // 에러 발생
    } else if (targetName === '깃허브 로그인') {
      userData = await GithubLogin();
    } else {
      throw new Error('올바르지 않은 접근입니다');
    }

    if (userData.state === false) {
      return;
    }
    window.localStorage.setItem('userData', JSON.stringify(userData));
    isLogin(true);

    // 이전 페이지 path
    const prevPath = globalThis.sessionStorage.getItem('prevPath');

    if (prevPath === '/signup') {
      router.push('/');
    } else {
      router.push(prevPath || '/');
    }
  };

  return (
    <Container>
      <LoginBox>
        <TitleBlock>로그인</TitleBlock>
        <fieldset>
          <LegendContainer>로그인 폼</LegendContainer>
          <EmailLoginBlock>
            <Input type="text" onChange={getInputData} placeholder="이메일" />
            <Input
              type="password"
              onChange={getInputData}
              placeholder="비밀번호"
            />
            <ConfirmButton onClick={login} text="로그인" />
            <Link href="/signup">
              <ConfirmButton text="회원가입" />
            </Link>
          </EmailLoginBlock>
          <VerticalBlock>
            <span>OR</span>
          </VerticalBlock>
          <SocialLoginBlock>
            <ConfirmButton icon="github" text="깃허브 로그인" onClick={login} />
            <ConfirmButton icon="google" text="구글 로그인" onClick={login} />
          </SocialLoginBlock>
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

const LoginBox = styled.form`
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

const LegendContainer = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`;

const EmailLoginBlock = styled.div`
  input,
  button {
    margin-bottom: 12px;
  }
`;

const VerticalBlock = styled.div`
  display: flex;
  margin: 16px 0;
  gap: 12px;
  color: ${({ theme }) => theme.colors.brown5};
  font-size: ${({ theme }) => theme.fontSize.discription};
  font-weight: 400;
  align-items: center;

  &::before,
  ::after {
    content: '';
    width: 100%;
    height: 1px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.brown5};
  }
`;

const SocialLoginBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 426px) {
    flex-flow: column;
    justify-content: center;
  }
`;
