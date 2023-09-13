import styled from 'styled-components';

interface ActiveProps {
  active?: boolean;
}
interface DefautProps extends ActiveProps {
  number: number;
}
export function PageNumberButton({ number, active }: DefautProps) {
  return <NumberBox active={active}>{number}</NumberBox>;
}

const NumberBox = styled.button<ActiveProps>`
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.colors.brown5};
  background-color: ${(props) =>
    props.active ? props.theme.colors.brown5 : props.theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.brown1 : props.theme.colors.brown5};
  font-size: ${(props) => props.theme.fontSize.discription};
  &:hover {
    background-color: ${(props) => props.theme.colors.brown5};
    color: ${(props) => props.theme.colors.white};
  }
  font-weight: 700;
`;
