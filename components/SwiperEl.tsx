import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Navigation } from 'swiper/modules';

import Card from './Card';
import PageNavigatorButton from './buttons/PageNavigatorButton';
import styled from 'styled-components';

type swiperTypes = {
  slidesNumber: [mobile: number, tablet: number, pc: number];
};

function SwiperEl({ slidesNumber = [1, 4, 5] }: swiperTypes) {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileSlides, tabletSlides, pcSlides] = slidesNumber;

  const swiperOptions = {
    modules: [Navigation],
    navigation: {
      prevEl: prevButtonRef.current,
      nextEl: nextButtonRef.current,
    },
    spaceBetween: 50,
    breakpoints: {
      320: {
        slidesPerView: mobileSlides,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: tabletSlides,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: pcSlides,
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
    <>
      <SwiperBlock {...swiperOptions}>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>

        <NavigationButton buttonRef={prevButtonRef} direction="prev" />
        <NavigationButton buttonRef={nextButtonRef} direction="next" />
      </SwiperBlock>
    </>
  );
}

export default SwiperEl;

const SwiperBlock = styled(Swiper)`
  .prev-button {
    left: 0;
  }

  .next-button {
    right: 0;
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
