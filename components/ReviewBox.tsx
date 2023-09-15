import styled from 'styled-components';

import RatingComponent from './RatingComponent';
import LikeButton from './buttons/LikeButton';

type ReviewBoxTypes = {
  rating: number;
};

function ReviewBox({ rating }: ReviewBoxTypes) {
  return (
    <ReviewBoxBlock>
      <RatingComponentBlock rating={rating} />
      <p>
        영화에 대한 한줄평이 출력되는 공간입니다. 공백 포함 한글 기준 최대
        100자까지 출력됩니다. 야호 영화 너무 재밌어요 꺄올롤로 영화에 대한
        한줄평이 출력되는 공간입니다. 최대 100자까지 출력됩니다. 야호야호
      </p>
      <h3>- 영화 제목이 출력되는 공간입니다.</h3>
      <span>작성자 닉네임이 출력되는 공간입니다.</span>
      <LikeButtonBlock count={32} />
    </ReviewBoxBlock>
  );
}

export default ReviewBox;

const ReviewBoxBlock = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 28px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.brown8};
  background-color: ${({ theme }) => theme.colors.brown1};

  p {
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.brown8};
  }

  h3 {
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fontSize.headline5};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.headline5};
    color: ${({ theme }) => theme.colors.brown6};
  }

  span {
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSize.discription};
    color: ${({ theme }) => theme.colors.brown6};
  }
`;

const RatingComponentBlock = styled(RatingComponent)`
  margin-bottom: 10px;
`;

const LikeButtonBlock = styled(LikeButton)`
  margin-left: auto;
`;
