import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

type NavigatorProps = {
  direction: 'prev' | 'next';
};

export function PageNavigatorButton({ direction }: NavigatorProps) {
  return (
    <>
      <NavigatorBox direction={direction}>
        {direction === 'prev' && <ArrowBackIosRoundedIcon />}
        {direction === 'next' && <ArrowForwardIosRoundedIcon />}
      </NavigatorBox>
    </>
  );
}

const NavigatorBox = styled.div<NavigatorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  color: ${(props) => props.theme.colors.brown6};
  background-color: ${(props) => props.theme.colors.brown1};
  filter: drop-shadow(0px 0px 5px rgba(98, 66, 42, 0.15));
`;
