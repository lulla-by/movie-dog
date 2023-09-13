import styled from 'styled-components';
import LightModeIcon from '../../public/light-mode.png';
import DarkModeIcon from '../../public/dark-mode.png';

type ModeProps = {
  mode: string;
};

export function ModeButton({ mode }: ModeProps) {
  console.log(LightModeIcon);
  return <ModeContainer mode={mode} />;
}

const ModeContainer = styled.button<ModeProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.colors.brown5};
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.brown5
      : props.theme.colors.brown1};
  background-position: ${(props) => props.theme.colors.brown5};
  background: ${(props) =>
      props.mode === 'dark'
        ? `url(${LightModeIcon.src})`
        : ` url(${DarkModeIcon.src})`}
    no-repeat center;
`;
