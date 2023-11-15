import { ReviewDataProps } from '@/utils/type/UserDataType';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewBox from '../ReviewBox';
import PageNavigatorButton from '../buttons/PageNavigatorButton';
import Link from 'next/link';

function UserReviewList({ reviewArr }: ReviewDataProps) {
  if (reviewArr.length === 0) {
    return (
      <ReviewListwrapper>
      <ReviewListBox>
        <h2>나의 한 줄 평</h2>
        작성한 리뷰가 없습니다.
      </ReviewListBox>
    </ReviewListwrapper>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const renderFirstCardIdx = currentPage * 4 - 4;
  const renderLastCardIdx = currentPage * 4;
  const totalPage = Math.ceil(reviewArr.length / 4);
  const [nextCount, setNextCount] = useState(10);
  const lineRenderData = 4 * nextCount < reviewArr.length;

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <PageNumButton
        className={i === currentPage ? 'active' : ''}
          key={i}
          onClick={() => {
            moveIndex(i);
          }}

        >
          {i}
        </PageNumButton>,
      );
    }
    return pageNumbers;
  };

  const moveIndex = (i: number) => {
    setCurrentPage(i);
  };

  function calculateMinIndex(currentValue: number) {
    const lowerBound = Math.floor((currentValue - 1) / 10) * 10 + 1;
    return lowerBound;
  }

  function calculateMaxIndex(currentValue: number) {
    const lowerBound = calculateMinIndex(currentValue);
    const upperBound = lowerBound + 9;
    return upperBound;
  }
  const [indexOfLastItem, setIndexOfLastItem] = useState(
    calculateMaxIndex(currentPage),
  );
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(
    calculateMinIndex(currentPage),
  );

  const currentItems = renderPagination().slice(
    indexOfFirstItem - 1,
    indexOfLastItem,
  );

  const renderData = reviewArr.slice(renderFirstCardIdx, renderLastCardIdx);

  return (
    <ReviewListwrapper>
      <ReviewListBox>
        <h2>나의 한 줄 평</h2>
        <ul>
          {renderData.map((review) => (
            <li key={review.movieId}>
              <Link href={`/detail/${review.movieTitle}/${review.movieId}`}>
              <ReviewBox review={review} />
              </Link>
            </li>
          ))}
        </ul>{' '}
        <PageNavigation>
          {indexOfFirstItem > 10 && (
            <PageNavigatorButton
              direction="prev"
              onClick={() => {
                setIndexOfFirstItem((prev) => prev - 10);
                setIndexOfLastItem((prev) => prev - 10);
                setNextCount((prev) => prev - 10);
              }}
            />
          )}
          {currentItems}
          {lineRenderData && (
            <PageNavigatorButton
              direction="next"
              onClick={() => {
                setIndexOfFirstItem((prev) => prev + 10);
                setIndexOfLastItem((prev) => prev + 10);
                setNextCount((prev) => prev + 10);
              }}
            />
          )}
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
  margin-bottom: 50px;
  padding: 32px 32px 50px 32px;
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