import { useEffect, useState } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

import styled from 'styled-components';

import RatingComponent from '@/components/RatingComponent';
import ConfirmButton from '@/components/buttons/ConfirmButton';
import ReviewSwiper from '@/components/swiper/ReviewSwiper';
import MovieSwiper from '@/components/swiper/MovieSwiper';

import { options } from '../api/data';

type MovieDataTypes = {
  id: number;
  title: string;
  original_title: string;
  genres: [{ name: string }];
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
};

type CreditDataTypes = {
  cast: [{ name: string }];
  director: { name: string };
};

function Detail({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [, movieId] = params.params;

  const [movieData, setMovieData] = useState<MovieDataTypes | null>(null);
  const [creditData, setCreditData] = useState<CreditDataTypes | null>(null);

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
      backdrop_path,
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
      backdrop_path,
      poster_path,
      release_date,
      runtime,
      vote_average,
    });
  };

  const getCreditList = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
      options,
    );
    const json = await response.json();
    const actorList = json.cast.slice(0, 8);
    const directorObject = json.crew.find((item: any) => {
      return Object.keys(item).find((key) => item[key] === 'Director');
    });
    const { name: directorName } = directorObject;
    setCreditData({ cast: actorList, director: directorName });
  };

  useEffect(() => {
    getMovieDB();
    getCreditList();
  }, []);

  return (
    <>
      {movieData && (
        <ContentBlock>
          <DetailBlock>
            <PosterBlock>
              <Image
                src={`http://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={`${movieData.title}의 포스터`}
                fill
                className="pc-tablet-img"
              />
              <Image
                src={`http://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
                alt={`${movieData.title}의 스틸컷`}
                fill
                className="mobile-img"
              />
            </PosterBlock>
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
              <p>{'감독 : ' + creditData?.director}</p>
              <p>
                {`출연 : ${creditData?.cast.map((item) => ' ' + item.name)}`}
              </p>
              <p>{movieData.overview}</p>
              <div className="buttons">
                <ConfirmButton text="찜" icon="favorite" />
                <ConfirmButton text="한 줄 평 작성" icon="write" />
              </div>
            </InfoBlock>
          </DetailBlock>
          <section>
            <h2>유저 한 줄 평</h2>
            <ReviewSwiper />
          </section>
          <section>
            <h2>비슷한 영화</h2>
            <MovieSwiper
              movieId={movieData.id}
              urlKey="similar"
              ranking={false}
            />
          </section>
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
  padding-bottom: 100px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.black};

  @media (min-width: 600px) {
    padding: 100px 0;
  }

  section {
    margin-bottom: 50px;
  }

  section:last-child {
    margin-bottom: 0;
  }

  section h1 {
    font-weight: 700;
  }

  section h2 {
    margin-bottom: 20px;
    font-size: ${({ theme }) => theme.fontSize.headline2};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brown9};
    text-align: center;
  }
`;

const DetailBlock = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;

  @media (min-width: 600px) {
    flex-flow: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0 20px;
  }
`;

const PosterBlock = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%; // 스틸컷 가로:세로 2:1비율

  .pc-tablet-img {
    display: none;
  }
  .mobile-img {
    display: block;
  }

  @media (min-width: 600px) {
    width: 33.33%;
    padding-bottom: 50%; // 포스터 가로:세로 2:3비율

    .pc-tablet-img {
      display: block;
    }

    .mobile-img {
      display: none;
    }
  }
`;

const InfoBlock = styled.div`
  padding: 0 20px;

  @media (min-width: 600px) {
    width: 66.66%;
    padding: 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.headline2};
  }

  & > * {
    margin: 8px 0;
  }

  .english-title {
    color: ${({ theme }) => theme.colors.gray1};
  }

  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
`;
