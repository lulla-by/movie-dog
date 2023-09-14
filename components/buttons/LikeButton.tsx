import styled from 'styled-components';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

type LikeButtonProps = {
  disabled?: boolean;
  count?: number;
};

export default function LikeButton({ disabled = false, count = 0 }: LikeButtonProps) {
  return (
    <Container>
      {disabled ? (
        <IconBox disabled>
          <FavoriteRoundedIcon />
        </IconBox>
      ) : (
        <IconBox>
          <FavoriteBorderRoundedIcon />
        </IconBox>
      )}
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
  border: 1px solid ${({theme}) => theme.colors.brown6};
  border-radius: 20px;
  padding: 12px;
`;
const IconBox = styled.div<LikeButtonProps>`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 100%;
  color: ${({theme}) => theme.colors.brown6};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
`;
const CountBox = styled.div`
  flex-grow: 1;
  font-size: ${({theme}) => theme.fontSize.discription};
  color: ${({theme}) => theme.colors.brown6};
`;
