import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import PageNavigatorButton from '../buttons/PageNavigatorButton';
import YearItem from './YearItem';
import { useRouter } from 'next/router';
import { Movie } from '@/utils/type/MovieType';
import Meta from '@/utils/MetaTag';

type YearMainsProps = {
  year: string;
  data: Movie[];
  idx: string;
};


const YearList = ({ year, data, idx }: YearMainsProps) => {
  const router = useRouter();
  const idxPage = parseInt(idx);
  const [currentPage, setCurrentPage] = useState(idxPage);
  const totalPages = 50;

  const moveIndex = (i: number) => {
    setCurrentPage(i);
    router.push(`/list/year/${year}/${i}`);
  };
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageNumButton
          className={i === idxPage ? 'active' : ''}
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
    calculateMaxIndex(idxPage),
  );
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(
    calculateMinIndex(idxPage),
  );

  const currentItems = renderPagination().slice(
    indexOfFirstItem - 1,
    indexOfLastItem,
  );

  return (
    <WrapperBlock>
      <Meta
        title={`${year}년도 리스트`}
        description={`${year}년도 리스트 페이지입니다`}
        url={`https://main.drpe221ejddia.amplifyapp.com/list/${year}/${idx}`}
      />
      <CardListBlock>
        {data &&
          data.map((movie: Movie) => {
            return <YearItem movie={movie} key={movie.id} />;
          })}
      </CardListBlock>

      <PageButtonWrapper>
        {indexOfFirstItem >= 10 && (
          <PageNavigatorButton
            direction="prev"
            onClick={() => {
              setIndexOfFirstItem((prev) => prev - 10);
              setIndexOfLastItem((prev) => prev - 10);
            }}
          />
        )}
        {currentItems}
        {indexOfLastItem <= 40 && (
          <PageNavigatorButton
            direction="next"
            onClick={() => {
              setIndexOfFirstItem((prev) => prev + 10);
              setIndexOfLastItem((prev) => prev + 10);
            }}
          />
        )}
      </PageButtonWrapper>
    </WrapperBlock>
  );
};

export default YearList;

const WrapperBlock = styled.section``;

const CardListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 50px;

  & > a {
    display: block;
    width: calc(50% - 10px);
  }

  @media (min-width: 768px) {
    & > a {
      width: calc(25% - 15px);
    }
  }
`;

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
