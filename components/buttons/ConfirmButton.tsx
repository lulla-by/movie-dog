import styled from 'styled-components';
import Icons from '../../public/icon.png';

interface ButtonProps {
  disabled?: boolean;
  active?: boolean;
  icon?: string;
}

interface DefaultProps extends ButtonProps {
  width?: number;
  text?:string;
}

export default function ConfirmButton({
  disabled,
  active,
  icon,
  width=100,
  text = "확인"
}: DefaultProps) {
  return (
    <>
      <DefaultButton active={active} disabled={disabled} icon={icon} width={width}>
        {icon && <IconBox icon={icon} />}
        <TextBox>{text}</TextBox>
      </DefaultButton>
    </>
  );
}

const DefaultButton = styled.button<DefaultProps>`
  display: flex;
  justify-content: space-around;
  width: ${({width}) => width + '%'};
  margin: auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  border-radius: 4px;

  color: ${({active,theme}) =>
    active ? theme.colors.white : theme.colors.brown5};
  background-color: ${({active,theme}) =>
    active ? theme.colors.brown5 : theme.colors.white};

  &:hover {
    color: ${({icon,theme}) =>
      icon ? theme.colors.brown5 : theme.colors.white};
    background-color: ${({icon,theme}) =>
      icon ? theme.colors.white : theme.colors.brown5};
    cursor: pointer;
  }

  &:disabled {
    color: white;
    background-color: ${({ theme }) => theme.colors.gray1};
    border: 1px solid ${({ theme }) => theme.colors.gray1};
    cursor: not-allowed;
  }
`;

const TextBox = styled.div`
  flex-grow: 1;
  align-items: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.discription};
`;

const IconBox = styled.div<ButtonProps>`
  left: 10px;
  height: 20px;
  width: 20px;
  background: url(${Icons.src}) no-repeat
    ${({icon}) =>
      icon === 'Google'
        ? 'right 26% bottom 50%'
        : icon === 'Github'
        ? 'right 26% bottom 95%'
        : null};
`;
