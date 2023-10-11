import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styled from 'styled-components';
import MovieSwiper from '@/components/swiper/MovieSwiper';
import ReviewSwiper from '@/components/swiper/ReviewSwiper';
import MainVisualSwiper from '@/components/swiper/MainVisualSwiper';

export default function Home() {
  return (
    <>
      <WapperBlock>
        <section>
          <MainVisualSwiper />
        </section>
        <section>
          <TitleBlock>박스오피스</TitleBlock>
          <MovieSwiper urlKey="popular" />
        </section>
        <section>
          <TitleBlock>최고평점</TitleBlock>
          <MovieSwiper urlKey="topRated" />
        </section>
        <section>
          <TitleBlock>유저 한 줄 평</TitleBlock>
          <ReviewSwiper />
        </section>
      </WapperBlock>
    </>
  );
}

const WapperBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  section {
    margin-bottom: 50px;
  }
`;

const TitleBlock = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.brown9};
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: 700;
  text-align: center;
`;
