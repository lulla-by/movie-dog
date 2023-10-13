import styled from 'styled-components';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

type ModeProps = {
  mode: 'light' | 'dark';
  className?: string;
};

export default function ModeButton({
  mode,
  className = 'ModeButton',
}: ModeProps) {
  return (
    <ModeBox mode={mode} className={className}>
      {mode === 'light' && <DarkModeRoundedIcon />}
      {mode === 'dark' && <WbSunnyRoundedIcon />}
    </ModeBox>
  );
}

const ModeBox = styled.div<ModeProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  color: ${({ mode, theme }) =>
    mode === 'light' ? theme.colors.brown1 : theme.colors.brown5};
  background-color: ${({ mode, theme }) =>
    mode === 'dark' ? theme.colors.brown1 : theme.colors.brown5};
`;
