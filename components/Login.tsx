import styled from 'styled-components';
import Input from './input/Input';
import ConfirmButton from './buttons/ConfirmButton';

export default function Login() {
  return (
    <Container>
      <LoginBox>
        <TitleBox>로그인</TitleBox>
        <Input placeholder="로그인" />
        <Input placeholder="비밀번호" />
        <ConfirmButton text="로그인" />
        <ConfirmButton text="회원가입" />
        <ButtonContainer>
          <SocialConfirmButton width={48} icon="Github" text="깃허브 로그인" />
          <SocialConfirmButton width={48} icon="Google" text="구글 로그인" />
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
  background-color: lightpink;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SocialConfirmButton = styled(ConfirmButton)`
  background-color: pink;
  
`;

const LoginBox = styled.div`
  background-color: lightblue;
  width: 386px;
  margin: auto;
`;

const TitleBox = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline1};
  font-weight: 700;
  margin: 100px;
`;
