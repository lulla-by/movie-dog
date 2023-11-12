import React, { createContext, useContext, useEffect, useState } from 'react';
import UserInfo from '@/components/mypage/UserInfo';
import UserMovieList from '@/components/mypage/UserMovieList';
import UserReviewList from '@/components/mypage/UserReviewList';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type PageProps<T, S> = {
    reviewArr: T[];
    likeArr: S[];
};

type Genres = {
  id: number;
  name: string;
};

interface LikesType {
  genres: Genres[];
  id: number;
  movieTitle: string;
  poster_path: string;
  release_date: string;
}

type ReviewType = {
  content: string;
  genres: Genres[];
  movieId: number;
  movieTitel: string;
  poster_path: string;
  rating: number;
  uid: string;
  userNickName: string;
};
function MyPageContainer({likeArr,reviewArr}: PageProps<ReviewType, LikesType>) {

console.log(likeArr,reviewArr);

  const router = useRouter();
  const [userData, setUserData] = useState({ uid: '', state: false });

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (!data) {
      alert('로그인이 필요한 작업입니다');
      router.push('/login');
      return;
    } else {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <MyPageWrapper>
      <UserInfo likeArr={likeArr} reviewArr={reviewArr}/>
      <UserMovieList />
      <UserReviewList />
    </MyPageWrapper>
  );
}

export default MyPageContainer;
const MyPageWrapper = styled.main`
  background-color: lightblue;
  max-width: 1200px;
  margin: 0 auto;
`;
