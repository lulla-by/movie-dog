import React, { useState } from 'react';
import styled from 'styled-components';
import PageNavigatorButton from '../buttons/PageNavigatorButton';
import { LikeDataProps } from '@/utils/type/UserDataType';
import NoPosterIcon from '../../public/images/icons/icon_errorface.svg';
import Link from 'next/link';

function UserMovieList({ likeArr = [] }: LikeDataProps) {
  if (likeArr.length === 0) {
    return (
      <MovieListWrapper>
        <MovieListBox>
          <TabBar>
            <h2>찜한 영화</h2>
          </TabBar>
          <MovieList>찜 목록에 추가한 영화가 없습니다.</MovieList>
        </MovieListBox>
      </MovieListWrapper>
    );
  }

  // 초기 페이지 수
  const [currentPage, setCurrentPage] = useState(1);
  //첫번째 렌더 카드 idx
  const renderFirstCardIdx = currentPage * 8 - 8;
  // 마지막 렌더 카드 idx
  const renderLastCardIdx = currentPage * 8;

  //총 페이지 수
  const totalPage = Math.ceil(likeArr?.length / 8);

  // PageNumButton은 10개 단위로 끊어서 렌더링
  // direction이 next인 pageNavButton을 한번 클릭할때마다 10씩 증가, prev는 10씩 감소
  const [nextCount, setNextCount] = useState(10);

  // 한페이지당 8개의 데이터가 렌더링되어 1-10까지는 총 80개의 데이터 렌더링
  // 이렇게 만든 한 줄마다의 데이터가 likeArr의 개수보다 작을 경우 true반환
  const lineRenderData = 8 * nextCount < likeArr?.length;

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

  const renderData = likeArr?.slice(renderFirstCardIdx, renderLastCardIdx);

  return (
    <MovieListWrapper>
      <MovieListBox>
        <TabBar>
          <h2>찜한 영화</h2>
        </TabBar>
        <MovieList>
          {renderData?.map((movie) => (
            <li>
              <Link href={`/detail/${movie.movieTitle}/${movie.movieId}`}>
                {movie.poster_path && (
                  <img
                    src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.movieTitle + '포스터입니다'}
                  />
                )}
                {!movie.poster_path && (
                  <NoPosterBlock>
                    <DescriptionBlock>
                      <NoPosterIcon />
                      <span>포스터 준비중</span>
                    </DescriptionBlock>
                  </NoPosterBlock>
                )}
                <p>{movie.movieTitle}</p>
                <p>{movie.release_date}</p>
              </Link>
            </li>
          ))}
        </MovieList>
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

          {/* 리턴된 페이지갯수가 likeArr의 length보다 작을때만 next버튼 렌더링  */}
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
      </MovieListBox>
    </MovieListWrapper>
  );
}

export default UserMovieList;

const MovieListWrapper = styled.section`
  margin: auto;
  width: 83%;
`;

const MovieListBox = styled.div`
  margin: 20px;
  padding: 32px 34px 50px 32px;
  background-color: antiquewhite;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.brown1};
  ul {
    display: flex;
  }

  h2 {
    color: ${({ theme }) => theme.colors.brown9};
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
`;

const MovieList = styled.ul`
  padding: 32px 0px 50px 0px;
  flex-wrap: wrap;
  gap: 20px;
  li {
    width: calc(100% - 20px);
    img {
      width: 100%;
      height: auto;
    }
    p {
      &:first-of-type {
        margin-top: 8px;
        color: ${({ theme }) => theme.colors.black};
        font-size: ${({ theme }) => theme.fontSize.headline3};
        font-weight: 700;
      }

      &:last-of-type {
      }
    }
  }
  @media (min-width: 768px) {
    li {
      width: calc(50% - 20px);
    }
  }

  @media (min-width: 1200px) {
    li {
      width: calc(25% - 20px);
    }
  }
`;

const PageNavigation = styled.div`
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
const NoPosterBlock = styled.div`
  position: relative;
  padding-bottom: 150%;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.gray0};
`;
const DescriptionBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  svg {
    margin-bottom: 8px;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.black};
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.black};
  }
`;