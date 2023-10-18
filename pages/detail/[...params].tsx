import { useEffect, useState } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import styled from 'styled-components';

import RatingComponent from '@/components/RatingComponent';
import ConfirmButton from '@/components/buttons/ConfirmButton';

import { options } from '../api/data';

type MovieDataTypes = {
  id: number;
  title: string;
  original_title: string;
  genres: [{ name: string }];
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
};

function Detail({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [, movieId] = params.params;

  const [movieData, setMovieData] = useState<MovieDataTypes | null>(null);

  const getMovieDB = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      options,
    );
    const json = await response.json();
    const {
      id,
      title,
      original_title,
      genres,
      overview,
      poster_path,
      release_date,
      runtime,
      vote_average,
    } = json;
    setMovieData({
      id,
      title,
      original_title,
      genres,
      overview,
      poster_path,
      release_date,
      runtime,
      vote_average,
    });
  };

  useEffect(() => {
    getMovieDB();
  }, []);

  return (
    <>
      {movieData && (
        <ContentBlock>
          <DetailBlock>
            <PosterBlock>영화 포스터</PosterBlock>
            <InfoBlock>
              <h1>{movieData.title}</h1>
              <p className="english-title">{movieData.original_title}</p>
              <RatingComponent rating={movieData.vote_average} />
              <p>
                {movieData.release_date + ' 개봉'}・{movieData.runtime + '분'}・
                {movieData.genres.map(
                  (genre, i) =>
                    genre.name +
                    (i !== movieData.genres.length - 1 ? ', ' : ''),
                )}
              </p>
              <p>감독 : 000・출연 : 000, 000, 000, 000(8명까지)</p>
              <p>{movieData.overview}</p>
              <ConfirmButton text="찜" icon="favorite" />
              <ConfirmButton text="한 줄 평 작성" icon="write" />
            </InfoBlock>
          </DetailBlock>
        </ContentBlock>
      )}
    </>
  );
}

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  return {
    props: { params },
  };
};

const ContentBlock = styled.main`
  max-width: 1200px;
  background-color: pink;
  padding: 100px 0;
  margin: 0 auto;
`;

const DetailBlock = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const PosterBlock = styled.div`
  width: 33.33%;
  background-color: green;
`;

const InfoBlock = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.fontSize.headline2};
  }

  & > * {
    margin: 8px 0;
  }

  .english-title {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
