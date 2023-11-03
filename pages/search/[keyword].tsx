import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import styled from 'styled-components';

import Card from '@/components/Card';
import MovieDogError from '../../public/images/moviedog-error.png';
import { options } from '../api/data';

function SearchPage({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { keyword } = params;
  const [movieData, setMovieData] = useState([]);

  const getMovieDB = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`,
      options,
    );
    const json = await response.json();
    setMovieData(json.results);
  };

  useEffect(() => {
    getMovieDB();
  }, [keyword]);

  return (
    <>
      <KeywordWrapper>
        <h1>"{keyword}"의 검색결과</h1>
      </KeywordWrapper>
      <ResultCardsBlock>
        {movieData[0] ? (
          movieData.map((movie, i) => {
            return <Card key={i} movie={movie} ranking={false} />;
          })
        ) : (
          <ErrorBlock>
            <Image
              src={MovieDogError.src}
              alt="검색 결과가 없습니다."
              width={242}
              height={110}
            />
            <p>검색 결과가 없습니다.</p>
          </ErrorBlock>
        )}
      </ResultCardsBlock>
    </>
  );
}

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  return {
    props: { params },
  };
};

const KeywordWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.gray0};

  h1 {
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
  }
`;

const ResultCardsBlock = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  padding: 100px 20px;
  margin: 0 auto;

  & > a {
    // width 계산 -> 100% / (한 줄  당 카드 갯수) - gap * (한 줄 당 카드 갯수 - 1) / 한 줄 당 카드 갯수
    display: block;
    width: calc(50% - 10px);
  }

  @media (min-width: 768px) {
    & > a {
      width: calc(25% - 15px);
    }
  }

  @media (min-width: 1200px) {
    & > a {
      width: calc(20% - 16px);
    }
  }
`;

const ErrorBlock = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.headline2};
  text-align: center;

  p {
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.black};
  }
`;
