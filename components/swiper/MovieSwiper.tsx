import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import PageNavigatorButton from '../buttons/PageNavigatorButton';
import Card from '../Card';

const movieListUrl: { [key: string]: string } = {
  popular: 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
  topRated:
    'https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1',
};

type SwiperTypes = {
  urlKey: 'popular' | 'topRated' | 'upcoming';
  ranking: boolean;
  className?: string;
};

function MovieSwiper({ urlKey, ranking, className }: SwiperTypes) {
  const [movieData, setMovieData] = useState([]);

  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`,
    },
  };

  const getMovieDB = async () => {
    if (urlKey) {
      const response = await fetch(movieListUrl[urlKey], options);
      const json = await response.json();
      setMovieData(json.results);
    }
  };

  const swiperOptions = {
    modules: [Navigation],
    navigation: {
      prevEl: prevButtonRef.current,
      nextEl: nextButtonRef.current,
    },
    spaceBetween: 50,
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
    onBeforeInit: (swiper: SwiperCore) => {
      if (typeof swiper.params.navigation !== 'boolean') {
        if (swiper.params.navigation) {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
        }
      }
      swiper.navigation.update();
    },
  };

  useEffect(() => {
    getMovieDB();
  }, []);

  return (
    <SwiperBlock {...swiperOptions} className={className}>
      {movieData &&
        movieData.map((movie, i) => {
          return (
            <SwiperSlide key={i}>
              <Card movie={movie} ranking={ranking && i} />
            </SwiperSlide>
          );
        })}
      <NavigationButton buttonRef={prevButtonRef} direction="prev" />
      <NavigationButton buttonRef={nextButtonRef} direction="next" />
    </SwiperBlock>
  );
}

export default MovieSwiper;

const SwiperBlock = styled(Swiper)`
  padding: 0 20px;

  .prev-button {
    left: 0px;
  }

  .next-button {
    right: 0px;
  }

  .swiper-button-disabled {
    visibility: hidden;
  }
`;

const NavigationButton = styled(PageNavigatorButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  outline: none;
`;
