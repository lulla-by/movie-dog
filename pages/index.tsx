import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useEffect } from 'react';
import SwiperEl from '@/components/SwiperEl';

export default function Home() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`,
    },
  };

  const getMovieDB = () => {
    fetch('https://api.themoviedb.org/3/movie/32142?language=ko-KR', options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovieDB();
  });

  return (
    <>
      <h1>Movie Dog Main Page</h1>
      <SwiperEl slidesNumber={[1, 4, 5]} />
    </>
  );
}
