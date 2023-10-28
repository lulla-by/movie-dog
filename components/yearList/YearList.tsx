import React from 'react';
import styled from 'styled-components';
import YearItem from './YearItem';
type YearMainsProps = {
  year: string;
  data: any;
  idx: string;
};

type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
const YearList = ({ year, data, idx }: YearMainsProps) => {
 
  return (
    <WrapperBlock>
      <CardListBlock>
        {data &&
          data.map((movie: Movie) => {
            return <YearItem movie={movie} />;
          })}
      </CardListBlock>
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

  @media (min-width: 1200px) {
    & > a {
      width: calc(20% - 16px);
    }
  }
`;
