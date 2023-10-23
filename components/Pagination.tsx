import styled from 'styled-components';
import PageNavigatorButton from './buttons/PageNavigatorButton';
import { useEffect, useState } from 'react';

type PaginationTypes = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({
  currentPage,
  setCurrentPage,
  offset,
  setOffset,
}: PaginationTypes) {
  // const [offset, setOffset] = useState(1);
  const PAGE_COUNT: number = 10;

  const moveToIndex = (index: number) => {
    // console.log(`move to ${index}`);
    setCurrentPage(index);
  };

  const calcPageIndex = (pageNum: number, direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      pageNum = Math.floor((pageNum - 10) / 10) * 10 + 1;
      setCurrentPage(pageNum);
      setOffset(pageNum);
    }

    if (direction === 'next') {
      pageNum = Math.floor((pageNum + 10) / 10) * 10 + 1;
      setCurrentPage(pageNum);
      setOffset(pageNum);
    }
  };

  useEffect(() => {
    console.log('pagination 리랜더링!');
    // setOffset(1);
    // setCurrentPage(1);
  }, []);

  return (
    <PageButtonWrapper>
      {currentPage >= 11 && (
        <PageNavigatorButton
          direction="prev"
          onClick={() => {
            calcPageIndex(currentPage, 'prev');
          }}
        />
      )}
      {Array(PAGE_COUNT)
        .fill(1)
        .map((_, i) => (
          <PageNumButton
            key={i}
            className={
              currentPage === i + Math.floor((currentPage - 1) / 10) * 10 + 1
                ? 'active'
                : ''
            }
            onClick={() => moveToIndex(offset + i)}
          >
            {offset + i}
          </PageNumButton>
        ))}
      <PageNavigatorButton
        direction="next"
        onClick={() => {
          calcPageIndex(currentPage, 'next');
        }}
      />
    </PageButtonWrapper>
  );
}

export default Pagination;

const PageButtonWrapper = styled.div`
  display: flex;
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
