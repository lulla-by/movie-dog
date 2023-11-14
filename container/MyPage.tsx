import UserInfo from '@/components/mypage/UserInfo';
import UserMovieList from '@/components/mypage/UserMovieList';
import UserReviewList from '@/components/mypage/UserReviewList';
import styled from 'styled-components';
import { UserDataProps } from '@/utils/type/UserDataType';

function MyPageContainer({ likeArr, reviewArr }: UserDataProps) {
  return (
    <MyPageWrapper>
      <UserInfo likeArr={likeArr} reviewArr={reviewArr} />
      <UserMovieList likeArr={likeArr}/>
      <UserReviewList reviewArr={reviewArr} />
    </MyPageWrapper>
  );
}

export default MyPageContainer;
const MyPageWrapper = styled.main`
  background-color: lightblue;
  max-width: 1200px;
  margin: 0 auto;
`;
