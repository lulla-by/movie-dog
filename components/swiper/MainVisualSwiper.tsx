import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import PageNavigatorButton from '../buttons/PageNavigatorButton';
import MainVisual from '../MainVisual';

type SwiperTypes = {
  className?: string;
};

type MainVisualInfoTypes = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  title: string;
};

function MainVisualSwiper({ className }: SwiperTypes) {
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
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1',
      options,
    );
    const json = await response.json();
    const fileredResult = json.results.filter(
      (item: MainVisualInfoTypes) => item.overview !== '',
    );
    setMovieData(fileredResult.slice(0, 6));
  };

  const swiperOptions = {
    modules: [Navigation, Pagination],
    navigation: {
      prevEl: prevButtonRef.current,
      nextEl: nextButtonRef.current,
    },
    pagination: true,
    spaceBetween: 50,
    loop: true,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 1,
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
              <MainVisual movie={movie} />
            </SwiperSlide>
          );
        })}
      <NavigationButton buttonRef={prevButtonRef} direction="prev" />
      <NavigationButton buttonRef={nextButtonRef} direction="next" />
    </SwiperBlock>
  );
}

export default MainVisualSwiper;

const SwiperBlock = styled(Swiper)`
  padding: 0 20px;
  margin-top: 20px;

  .prev-button {
    left: 0px;
  }

  .next-button {
    right: 0px;
  }

  .swiper-button-disabled {
    visibility: hidden;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.brown5};
  }
`;

const NavigationButton = styled(PageNavigatorButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  outline: none;
`;
