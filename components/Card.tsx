import styled from 'styled-components';
import Image from 'next/image';
import RatingComponent from './RatingComponent';

import { genreId } from '@/pages/api/data';

type MovieTypes = {
  movie?: {
    title: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    genre_ids: number[];
  };
};

function Card({ movie }: MovieTypes) {
  return (
    <>
      {movie && (
        <CardBlock>
          <ImageBlock>
            <Image
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 10vw,(max-width: 1200px) 30vw"
              loading="eager"
            />
          </ImageBlock>
          <h3>{movie.title}</h3>
          <p>
            {movie.release_date.slice(0, 4)}・{genreId[movie.genre_ids[0]]}
          </p>
          <RatingBlock>
            <RatingComponent
              rating={Math.floor((movie.vote_average / 2) * 10) / 10}
            />
            <span>
              {Math.floor((movie.vote_average / 2) * 10) / 10 + '점'}(
              {movie.vote_count.toLocaleString() + '명'})
            </span>
          </RatingBlock>
        </CardBlock>
      )}
    </>
  );
}

export default Card;

const ImageBlock = styled.div`
  position: relative;
  height: 300px;
  margin-bottom: 8px;

  @media (min-width: 320px) {
    height: 480px;
  }
  @media (min-width: 480px) {
    height: 400px;
  }
  @media (min-width: 1200px) {
    height: 320px;
  }
`;

const CardBlock = styled.div`
  img {
    object-fit: cover;
  }

  h3 {
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
  }

  p {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;

const RatingBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
