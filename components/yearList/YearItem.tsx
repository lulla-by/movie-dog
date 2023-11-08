import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

type Movie = {
  movie: {
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
};

const YearItem = ({ movie }: Movie) => {
  const noPosterUrl = new URL('../../public/nooposter.png', import.meta.url)
    .href;
  return (
    <Link href={`/detail/${movie.title}/${movie.id}`}>
      <CardBlock>
        <ImageBlock>
          {movie.poster_path && (
            <Image
              src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw,(max-width: 1200px) 70vw"
              loading="eager"
              priority
            />
          )}
          {!movie.poster_path && (
            <Image
              src={noPosterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw,(max-width: 1200px) 70vw"
              loading="eager"
              priority
            />
          )}
        </ImageBlock>
        <Title>{movie.title}</Title>
        <p>
          {movie.release_date}
        </p>
      </CardBlock>
    </Link>
  );
};

export default YearItem;

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

const Title = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 1.2em;
`;
