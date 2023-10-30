import styled from 'styled-components';

type ReviewModalTypes = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewModal({ setIsOpened }: ReviewModalTypes) {
  return <button onClick={() => setIsOpened(false)}>닫기</button>;
}

export default ReviewModal;
