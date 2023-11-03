import styled from 'styled-components';

interface ActiveProps {
  active?: boolean;
}
interface DefautProps extends ActiveProps {
  number: number;
}
export default function PageNumberButton({ number, active }: DefautProps) {
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
  border: 1px solid ${({theme}) => theme.colors.brown5};
  background-color: ${({theme,active}) =>
    active ? theme.colors.brown5 : theme.colors.white};
  color: ${({theme,active}) =>
    active ? theme.colors.brown1 : theme.colors.brown5};
  font-size: ${({theme}) => theme.fontSize.discription};
  &:hover {
    background-color: ${({theme}) => theme.colors.brown5};
    color: ${({theme}) => theme.colors.white};
  }
  font-weight: 700;
`;
