import { ForwardedRef, MouseEventHandler } from 'react';
import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

type NavigatorProps = {
  direction: 'prev' | 'next';
  buttonRef?: ForwardedRef<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export default function PageNavigatorButton({
  buttonRef,
  direction,
  onClick,
  className,
}: NavigatorProps) {
  return (
    <>
      <NavigatorBox
        aria-label={`${direction} 10 page navigation button`}
        ref={buttonRef}
        onClick={onClick}
        className={`${className} ${direction}-button`}
      >
        {direction === 'prev' && <ArrowBackIosRoundedIcon />}
        {direction === 'next' && <ArrowForwardIosRoundedIcon />}
      </NavigatorBox>
    </>
  );
}

const NavigatorBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.brown8};
  border-radius: 100%;
  color: ${({ theme }) => theme.colors.brown8};
  background-color: ${({ theme }) => theme.colors.brown1};
  /* filter: drop-shadow(0px 0px 5px rgba(98, 66, 42, 0.15)); */
  cursor: pointer;
`;
