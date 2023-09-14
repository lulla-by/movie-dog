import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <List>
        <ListItem>MOVIE DOG</ListItem>
        <ListItem>Github - hardy-is-cat, lulla-by</ListItem>
        <ListItem>영화DB제공 - TMDB</ListItem>
      </List>
    </Container>
  );
}

const Container = styled.footer`
  background-color: ${({ theme }) => theme.colors.brown8};
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
  height: 88px;
  margin: auto;
  `;
const ListItem = styled.li`
color: ${({ theme }) => theme.colors.brown1};
font-size:${({theme})=> theme.fontSize.discription};
font-weight: 400;
&:first-child {
    font-size: ${({theme})=> theme.fontSize.headline2};
    font-weight: 800;
  }
`;
