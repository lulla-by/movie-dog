import { ReviewDataProps } from '@/utils/type/UserDataType';
import React from 'react';
import styled from 'styled-components';
import ReviewBox from '../ReviewBox';
import PageNavigatorButton from '../buttons/PageNavigatorButton';

function UserReviewList() {

  function generateReviewsArray(count:number) {
    const reviewsArray = [];
    
    for (let i = 1; i <= count; i++) {
      const review = {
        movieTitle: `Movie ${i}`,
        userNickName: `User ${i}`,
        content: `This is review ${i}`,
        rating: Math.floor(Math.random() * 5) + 1, // 랜덤한 평점 생성 (1 ~ 5)
      };
      
      reviewsArray.push(review);
    }
    
    return reviewsArray;
  }
  const reviewsArray = generateReviewsArray(20);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 10; i++) {
      pageNumbers.push(
        <PageNumButton
          key={i}
        >
          {i}
        </PageNumButton>,
      );
    }
    return pageNumbers;
  };
  const currentItems = renderPagination()
  return (
    <ReviewListwrapper>
      <ReviewListBox>
        <h2>나의 한 줄 평</h2>
        <ul>
          {reviewsArray.map((review) => (
            <li>
              <ReviewBox review={review} />
            </li>
          ))}
        </ul>{' '}
        <PageNavigation>
            <PageNavigatorButton
              direction="prev"
            />
          {currentItems}
            <PageNavigatorButton
              direction="next"
            />
        </PageNavigation>
      </ReviewListBox>
    </ReviewListwrapper>
  );
}

export default UserReviewList;

const ReviewListwrapper = styled.section`
  margin: auto;
  width: 83%;
`;
const ReviewListBox = styled.div`
  margin: 20px;
  padding: 32px 34px 50px 32px;
  background-color: antiquewhite;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.brown1};
  border-radius: 10px;
  h2 {
    color: ${({ theme }) => theme.colors.brown9};
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 32px;
  }
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    li {
      display: inline-block;
      height: 280px;
      width: calc(50% - 20px);

      article {
        height: 287px;
        justify-content: flex-start;
      }
    }
    @media (max-width: 768px) {
      li {
        width: calc(100% - 20px);
      }
    }
  }
`;
const PageNavigation = styled.div`
  border-color: red;
  margin-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageNumButton = styled.button`
  width: 32px;
  height: 32px;
  margin: 0 2px;
  color: ${({ theme }) => theme.colors.brown5};
  font-size: ${({ theme }) => theme.fontSize.headline5};
  font-weight: 700;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  background: none;

  &.active {
    background-color: ${({ theme }) => theme.colors.brown5};
    color: ${({ theme }) => theme.colors.white};
  }
`;