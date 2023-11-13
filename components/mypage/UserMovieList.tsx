import React, { useState } from 'react';
import styled from 'styled-components';
import PageNavigatorButton from '../buttons/PageNavigatorButton';
import { LikeDataProps } from '@/utils/type/UserDataType';

function UserMovieList({likeArr}:LikeDataProps) {
  
  // 초기 페이지 수
  const [currentPage, setCurrentPage] = useState(1);
  // 데이터 개수에 따른 총 페이지 수
  const totalPage = Math.ceil(likeArr.length / 8);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <PageNumButton className={i === currentPage ? 'active' : ''} key={i}>
          {i}
        </PageNumButton>,
      );
    }
    return pageNumbers;
  };
  const pageNumbers = renderPagination();

  return (
    <MovieListWrapper>
      <MovieListBox>
        <TabBar>
          <h2>나의 영화</h2>
          <ul>
            <li>
              <p>찜목록</p>
            </li>
            <li>
              <p>내가 본</p>
            </li>
          </ul>
        </TabBar>
        <MovieList>
          {likeArr.map((movie) => (
            <li>
              <img
                src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.movieTitle + '포스터입니다'}
              />
              <p>{movie.movieTitle}</p>
              <p>{movie.release_date}</p>
            </li>
          ))}
        </MovieList>
        <PageNavigation>
          <PageNavigatorButton direction="prev" />
          {pageNumbers}
          <PageNavigatorButton direction="next" />
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
  ul {
    margin-left: 16px;
    display: flex;
    gap: 8px;
    li {
      width: 73px;
      height: 28px;
      border-radius: 4px;
      background: ${({ theme }) => theme.colors.brown5};
      color: ${({ theme }) => theme.colors.brown1};
      text-align: center;
      align-items: center;
      font-size: ${({ theme }) => theme.fontSize.discription};
      font-weight: 700;
      p {
        line-height: 28px;
      }
    }
  }
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
