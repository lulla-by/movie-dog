import styled from 'styled-components';
import ModeIcon from "../../public/mode.png"

type ModeProps = {
  mode: "light"|"dark";
};

export function ModeButton({ mode }: ModeProps) {
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
  border: none;
  background:  url(${ModeIcon.src}) no-repeat 
  ${(props) =>
      props.mode === 'dark'
        ? `50% 80%`
        : `50% 20%`} ;

`;
