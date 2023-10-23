import { useEffect, useState } from 'react';

import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

import { options } from '@/pages/api/data';
import styled from 'styled-components';

type CardList = {
  genreId: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

function CardList({
  genreId,
  currentPage,
  setCurrentPage,
  offset,
  setOffset,
}: CardList) {
  const [movieData, setMovieData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  const getMovieDB = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=${currentPage}&sort_by=popularity.desc&with_genres=${genreId}`,
      options,
    );
    const json = await response.json();
    setMovieData(json.results);
  };

  useEffect(() => {
    getMovieDB();
    // setCurrentPage(1);
    console.log('카드 리스트 리랜더링!!!');
  }, [genreId, currentPage]);

  return (
    <WrapperBlock>
      <CardListBlock>
        {movieData &&
          movieData.map((movie, i) => {
            return <Card key={i} ranking={true} movie={movie} />;
          })}
      </CardListBlock>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        offset={offset}
        setOffset={setOffset}
      />
    </WrapperBlock>
  );
}

export default CardList;

const WrapperBlock = styled.section``;

const CardListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 50px;

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
