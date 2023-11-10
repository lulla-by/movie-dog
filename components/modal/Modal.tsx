import styled from 'styled-components';

type ModalTypes = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, isOpened, setIsOpened }: ModalTypes) {
  return (
    <>
      <ModalBG isOpened={isOpened} onClick={() => setIsOpened(false)}></ModalBG>
      <ModalBlock isOpened={isOpened}>{children}</ModalBlock>
    </>
  );
}

export default Modal;

const ModalBG = styled.div<{ isOpened: boolean }>`
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
  z-index: 500;
`;

const ModalBlock = styled.div<{ isOpened: boolean }>`
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  z-index: 501;

  @media (min-width: 768px) {
    width: 60%;
  }
`;
