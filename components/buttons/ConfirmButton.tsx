import styled from 'styled-components';
import Icons from '../../public/icon.png';

interface ButtonProps {
  disabled?: boolean;
  active?: boolean;
  icon?: string;
}

interface DefaultProps extends ButtonProps {
  width: string;
}

export default function ConfirmButton({
  disabled,
  active,
  width,
  icon,
}: DefaultProps) {
  return (
    <Container width={width}>
      <DefaultButton active={active} disabled={disabled} icon={icon}>
        {icon && <IconBox icon={icon} />}
        <TextBox>확인</TextBox>
      </DefaultButton>
    </Container>
  );
}

const Container = styled.div<DefaultProps>`
  width: ${(props) => props.width + 'px'};
`;

const DefaultButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin: auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  border-radius: 4px;

  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.brown5};
  background-color: ${(props) =>
    props.active ? props.theme.colors.brown5 : props.theme.colors.white};

  &:hover {
    color: ${(props) =>
      props.icon ? props.theme.colors.brown5 : props.theme.colors.white};
    background-color: ${(props) =>
      props.icon ? props.theme.colors.white : props.theme.colors.brown5};
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
    ${(props) =>
      props.icon === 'Google'
        ? 'right 26% bottom 50%'
        : props.icon === 'Github'
        ? 'right 26% bottom 95%'
        : null};
`;
