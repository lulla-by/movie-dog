import React from 'react';
import UserInfo from '@/components/mypage/UserInfo';
import UserMovieList from '@/components/mypage/UserMovieList';
import UserReviewList from '@/components/mypage/UserReviewList';
import styled from 'styled-components';

function MyPageContainer() {
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
