import styled from 'styled-components';
import { genreId } from '@/pages/api/data';
import Link from 'next/link';

type MovieTypes = {
  movie: {
    id: number;
    backdrop_path: string;
    genre_ids: number[];
    overview: string;
    title: string;
    original_title: string;
  };
};

function MainVisual({ movie }: MovieTypes) {
  return (
    <>
      <ImageBGBlock backdrop={movie.backdrop_path}>
        <OverlayBGBlock>
          <DescriptionBlock>
            <h3>{movie.title}</h3>
            <p>
              {genreId[movie.genre_ids[0]]}
              {true && '・' + genreId[movie.genre_ids[1]]}
            </p>
            <p>
              {movie.overview.split(' ', 40).length === 40
                ? movie.overview.split(' ', 40).join(' ') + '...'
                : movie.overview.split(' ', 40).join(' ')}
            </p>
            <Link href={`/detail/${movie.original_title}/${movie.id}`}>
              보러가기
            </Link>
          </DescriptionBlock>
        </OverlayBGBlock>
      </ImageBGBlock>
    </>
  );
}

export default MainVisual;

const ImageBGBlock = styled.div<{ backdrop: string }>`
  height: 600px;
  background-image: ${({ backdrop }) => {
    return `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop})`;
  }};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  @media (min-width: 1200px) {
    height: 500px;
  }
`;

const OverlayBGBlock = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const DescriptionBlock = styled.div`
  position: absolute;
  width: 80%;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: 320px) {
  }
  @media (min-width: 768px) {
    width: 40%;
    top: 50%;
    bottom: auto;
    left: 5%;
    transform: translateY(-50%);
    text-align: left;
  }
  @media (min-width: 1200px) {
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    word-break: keep-all;
    margin-bottom: 12px;
  }

  a {
    display: inline-block;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.brown6};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.discription};
    text-decoration: none;
    border: none;
    border-radius: 4px;
    transition: all 0.25s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.brown6};
    }
  }
`;
