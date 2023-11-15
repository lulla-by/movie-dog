import styled from 'styled-components';

type ModalTypes = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, isOpened, setIsOpened }: ModalTypes) {
  return (
    <>
      <ModalWrapper isOpened={isOpened}>
        <ModalBG onClick={() => setIsOpened(isOpened)}></ModalBG>
        <ModalBlock>{children}</ModalBlock>
      </ModalWrapper>
    </>
  );
}

export default Modal;

const ModalWrapper = styled.div<{ isOpened: boolean }>`
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 500;
`;

const ModalBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
`;

const ModalBlock = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  @media (min-width: 768px) {
    width: 60%;
  }
`;
