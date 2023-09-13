import styled from 'styled-components';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

type LikeButtonProps = {
  disabled?: boolean;
  count?: number;
};

export function LikeButton({ disabled=false, count=0 }: LikeButtonProps) {
  return (
    <Container>
      {disabled ?
      <IconBox disabled>
        <FavoriteRoundedIcon/>
      </IconBox>
      :
      <IconBox>
      <FavoriteBorderRoundedIcon/>
    </IconBox>
      }
      <CountBox>{count}</CountBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  width: 75px;
  height: 32px;
  border: 1px solid ${props => props.theme.colors.brown6};
  border-radius: 20px;
  padding: 12px;
  `;
const IconBox = styled.div<LikeButtonProps>`
width: 24px;
height: 24px;
border: none;
border-radius: 100%;
color: ${props => props.theme.colors.brown6};
/* cursor: pointer; */
/* &:disabled{
  cursor: not-allowed;;
} */
`;
const CountBox = styled.div`
flex-grow: 1;
font-size:${props =>props.theme.fontSize.discription};
color: ${props => props.theme.colors.brown6};
`;
