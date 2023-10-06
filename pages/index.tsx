import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import SwiperEl from '@/components/swiper/SwiperEl';
import styled from 'styled-components';
import Card from '@/components/Card';
import ReviewBox from '@/components/ReviewBox';
import MovieSwiper from '@/components/swiper/MovieSwiper';

export default function Home() {
  return (
    <>
      <WapperBlock>
        <SwiperBlock slidesNumber={[1, 1, 1]}>
          <Card />
        </SwiperBlock>
        <TitleBlock>박스오피스</TitleBlock>
        <MovieSwiper slidesNumber={[2, 4, 5]} urlKey="popular" />
        <TitleBlock>최고평점</TitleBlock>
        <MovieSwiper slidesNumber={[2, 4, 5]} urlKey="topRated" />
      </WapperBlock>
    </>
  );
}

const WapperBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleBlock = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.brown9};
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: 700;
  text-align: center;
`;

const SwiperBlock = styled(SwiperEl)`
  margin-bottom: 50px;
`;
