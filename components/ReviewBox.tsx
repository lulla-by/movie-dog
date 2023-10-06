import styled from 'styled-components';

import RatingComponent from './RatingComponent';
import LikeButton from './buttons/LikeButton';

type ReviewBoxTypes = {
  review: {
    rating: number;
    description: string;
    title: string;
    writer: string;
    like: number;
  };
};

function ReviewBox({ review }: ReviewBoxTypes) {
  const { rating, description, title, writer, like } = review;
  return (
    <ReviewBoxBlock>
      <RatingComponentBlock rating={rating} />
      <p>{description}</p>
      <h3>- {title}</h3>
      <span>{writer}</span>
      <LikeButtonBlock count={like} />
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
