import theme from '@/styles/theme';
import styled from 'styled-components';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type CardTypes = {
  cardWidth?: number;
};

function Card({ cardWidth = 100 }: CardTypes) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [imageWidth, setImageWidth] = useState(windowWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const debounce = setTimeout(() => {
      setImageWidth((windowWidth / 100) * cardWidth);
    }, 200);

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return () => {
      clearTimeout(debounce);
      window.addEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, [windowWidth]);

  return (
    <>
      <CardBlock cardWidth={cardWidth}>
        <Image
          src="/images/barbie.jpeg"
          alt="바비"
          width={imageWidth}
          height={(imageWidth / 2) * 3}
        />
        <h3>영화제목</h3>
        <p>
          개봉년도・나라
          <br />
          누적 관객수 000,000명
        </p>
      </CardBlock>
    </>
  );
}

export default Card;

const CardBlock = styled.div<CardTypes>`
  position: relative;
  width: ${({ cardWidth }) => cardWidth + '%'};

  img {
    margin-bottom: 8px;
    object-fit: cover;
    top: 0;
    left: 0;
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
