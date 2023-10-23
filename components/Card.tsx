import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import RatingComponent from './RatingComponent';

import { genreArr } from '@/pages/api/data';

type MovieTypes = {
  movie?: {
    id: number;
    title: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    genre_ids: number[];
  };
  ranking: boolean | number;
};

function Card({ movie, ranking }: MovieTypes) {
  const [displayRanking, setDisplayRanking] = useState(false);

  const isRankingLessThan10 = () => {
    if (typeof ranking === 'number' && ranking <= 10) {
      setDisplayRanking(true);
    }
  };

  const genreName = genreArr.filter((item) => {
    return +Object.keys(item)[0] === movie?.genre_ids[0];
  });

  useEffect(() => {
    isRankingLessThan10();
  }, []);

  return (
    <>
      {movie && (
        <Link href={`/detail/${movie.title}/${movie.id}`}>
          <CardBlock>
            {displayRanking && (
              <RankingTag>
                {typeof ranking === 'number' && ranking + 1}
              </RankingTag>
            )}
            <ImageBlock>
              <Image
                src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 50vw,(max-width: 1200px) 70vw"
                loading="eager"
                priority
              />
            </ImageBlock>
            <h3>{movie.title}</h3>
            <p>
              {movie.release_date.slice(0, 4)}・{Object.values(genreName[0])[0]}
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
        </Link>
      )}
    </>
  );
}

export default Card;

const RankingTag = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.headline4};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 100;
`;

const ImageBlock = styled.div`
  position: relative;
  padding-bottom: 150%;
  margin-bottom: 8px;
`;

const CardBlock = styled.div`
  position: relative;

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

  span {
    color: ${({ theme }) => theme.colors.black};
  }
`;
