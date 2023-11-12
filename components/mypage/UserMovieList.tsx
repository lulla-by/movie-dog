import React from 'react';
import styled from 'styled-components';

function UserMovieList() {
  const noPosterUrl = new URL('../../public/nooposter.png', import.meta.url)
    .href;
  const mockupData = Array.from({ length: 10 }, (_, index) => ({
    movieTitle: `영화 ${index + 1}`,
    release_date: getRandomDate(),
    poster_path: noPosterUrl,
  }));
  function getRandomDate() {
    const year = Math.floor(Math.random() * (2023 - 2000 + 1)) + 2000; // 2000년부터 2023년까지의 랜덤한 년도
    const month = Math.floor(Math.random() * 12) + 1; // 1월부터 12월까지의 랜덤한 월
    const day = Math.floor(Math.random() * 28) + 1; // 1일부터 28일까지의 랜덤한 일

    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <MovieListWrapper>
      <h2>나의 영화</h2>
      <ul>
        <li>찜목록</li>
        <li>내가 본</li>
      </ul>
      <ul>
        {mockupData.map((item) => (
          <li>
            <img src={item.poster_path} alt={item.movieTitle+"포스터입니다"} width={100} />
            <p>{item.movieTitle}</p>
            <p>{item.release_date}</p>
          </li>
        ))}
      </ul>
      <p>prev</p>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
      <p>next</p>
    </MovieListWrapper>
  );
}

export default UserMovieList;

const MovieListWrapper = styled.section`
  background-color: lightcyan;
`;
