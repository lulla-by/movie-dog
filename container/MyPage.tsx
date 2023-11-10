import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/mypage/UserInfo';
import UserMovieList from '@/components/mypage/UserMovieList';
import UserReviewList from '@/components/mypage/UserReviewList';
import styled from 'styled-components';
import { useRouter } from 'next/router';

function MyPageContainer() {
  const router = useRouter();
  const [userData, setUserData] = useState({ uid: '', state: false });
  const { uid, state } = userData;
  
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
      <UserInfo />
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
