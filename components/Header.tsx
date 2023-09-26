import styled from 'styled-components';
import ConfirmButton from './buttons/ConfirmButton';
import SearchBar from './input/SearchBar';
import ModeButton from './buttons/ModeButton';
import Logo from '../public/MovieDogLogo.png';

type Width = {
  width: number;
};

export function Header() {
  return (
    <Container>
      <FlextContainer width={367}>
        <LogoIMG src={Logo.src} alt="로고" />
        <nav>
          <List>
            <ListItem>장르별</ListItem>
            <ListItem>년도별</ListItem>
          </List>
        </nav>
      </FlextContainer>
      <FlextContainer width={450}>
        <SearchBar width={66} />
        <ConfirmButton text="로그인" width={20} />
        <ModeButton mode="light" />
      </FlextContainer>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  height: 120px;
  border-bottom:1px solid ${({ theme }) => theme.colors.brown5};
  min-width:1280px;
  `;
const LogoIMG = styled.img`
  margin-right: 47px;
  `;
const List = styled.ul`
  display: flex;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.headline3};
  color: ${({ theme }) => theme.colors.brown9};
  `;
const ListItem = styled.li`
  margin-left: 40px;
  `;
const FlextContainer = styled.div<Width>`
margin: auto;
  display: flex;
  align-items: center;
  width: ${({ width }) => width + 'px'};
`;
