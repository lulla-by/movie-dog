import styled from 'styled-components';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

type ModeProps = {
  mode: 'light' | 'dark';
};

export default function ModeButton({ mode }: ModeProps) {
  return (
    <ModeBox mode={mode}>
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
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.colors.brown5};
  color: ${(props) =>
    props.mode === 'light'
      ? props.theme.colors.brown1
      : props.theme.colors.brown5};
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.brown1
      : props.theme.colors.brown5};
`;
