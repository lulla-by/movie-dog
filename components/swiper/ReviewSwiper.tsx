import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/fbase';

import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import PageNavigatorButton from '../buttons/PageNavigatorButton';
import ReviewBox from '../ReviewBox';

type SwiperTypes = {
  movieId: number;
  className?: string;
};

type ReviewDataTypes = {
  movieTitle: string;
  movieId: string;
  userNickName: string;
  uid: number;
  content: string;
  rating: number;
};

function ReviewSwiper({ movieId, className }: SwiperTypes) {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [reviewData, setReviewData] = useState<ReviewDataTypes[]>([]);

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

  const loadExistReview = async () => {
    const q = query(collection(db, 'reviews'), where('movieId', '==', movieId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = {
        movieTitle: doc.data().movieTitle,
        movieId: doc.data().movieId,
        userNickName: doc.data().userNickName,
        uid: doc.data().uid,
        content: doc.data().content,
        rating: doc.data().rating,
      };
      setReviewData([data, ...reviewData]);
    });
  };

  useEffect(() => {
    loadExistReview();
  }, []);

  return (
    <SwiperBlock {...swiperOptions} className={className}>
      {reviewData &&
        reviewData.map((review, i) => {
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
