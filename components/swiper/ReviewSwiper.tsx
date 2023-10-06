import { useRef } from 'react';

import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import PageNavigatorButton from '../buttons/PageNavigatorButton';
import ReviewBox from '../ReviewBox';

const reviews = [
  {
    rating: 2.5,
    description: '리뷰내용 블ㅏ블라',
    title: '영화 제목',
    writer: '사용자 닉네임',
    like: 20,
  },
  {
    rating: 4,
    description: '리뷰내용 블ㅏ블라',
    title: '영화 제목',
    writer: '사용자 닉네임',
    like: 24,
  },
  {
    rating: 5,
    description: '리뷰내용 블ㅏ블라',
    title: '영화 제목',
    writer: '사용자 닉네임',
    like: 12,
  },
  {
    rating: 3,
    description: '리뷰내용 블ㅏ블라',
    title: '영화 제목',
    writer: '사용자 닉네임',
    like: 5,
  },
];

type SwiperTypes = {
  className?: string;
};

function ReviewSwiper({ className }: SwiperTypes) {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

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
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
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

  return (
    <SwiperBlock {...swiperOptions} className={className}>
      {reviews &&
        reviews.map((review, i) => {
          return (
            <SwiperSlide key={i}>
              <ReviewBox review={review} />
            </SwiperSlide>
          );
        })}
      <NavigationButton buttonRef={prevButtonRef} direction="prev" />
      <NavigationButton buttonRef={nextButtonRef} direction="next" />
    </SwiperBlock>
  );
}

export default ReviewSwiper;

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
