import React from 'react';
import styled from 'styled-components';

type Genres = {
  id: number;
  name: string;
};

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

type PageProps<T, S> = {
    reviewArr: T[];
    likeArr: S[];
};

interface LikesType {
  genres: Genres[];
  id: number;
  movieTitle: string;
  poster_path: string;
  release_date: string;
}

function UserInfo({likeArr,reviewArr}: PageProps<ReviewType, LikesType>) {
  const userName = reviewArr[0].userNickName
  let reviewCount = reviewArr.length == 0 ? '00' : `${reviewArr.length}`;
  let likeMovieCount = likeArr.length == 0 ? '00' : `${likeArr.length}`;;
  let watchMovieCount = `00`;

  const noPosterUrl = new URL('../../public/nooposter.png', import.meta.url)
    .href;

  const genleList = [
    '공포',
    '액션',
    '로맨스',
    '코미디',
    '액션',
    '로맨스',
    '코미디',
    '액션',
    '로맨스',
    '코미디',
  ];
  return (
    <UserInfoWrapper>
      <UserInfoBox>
        <LayoutBox>
          <TitleBox>{userName}님의 페이지</TitleBox>
          <FigureBox>
            <UserProfileImage src={noPosterUrl} alt="유저의 프로필 사진" />
            <UserProfielCapion>OOO님의 프로필 사진</UserProfielCapion>
          </FigureBox>
          <ul>
            <li>내가 본 영화 : {watchMovieCount}개</li>
            <li>찜 해 둔 영화 : {parseInt(likeMovieCount) < 10 ? `0${likeMovieCount}`:likeMovieCount}개</li>
            <li>내가 쓴 한 줄 평 : {parseInt(reviewCount) < 10 ? `0${reviewCount}`:reviewCount}개</li>
          </ul>
        </LayoutBox>
      </UserInfoBox>
      <UserGenres>
        <TitleBox>나의 선호 장르</TitleBox>
        <GenresListBox>
          {genleList.map((item) => (
            <li>{item}</li>
          ))}
        </GenresListBox>
      </UserGenres>
    </UserInfoWrapper>
  );
}

export default UserInfo;

const UserInfoWrapper = styled.section`
  margin: auto;
  width: 83%;
  @media (max-width: 768px) {
    padding: 0px;
    flex-direction: row;
  }
  @media (min-width: 769px) {
    padding: 0px;
    flex-direction: row;
  }
  @media (min-width: 1200px) {
    margin: auto;
    margin-top: 50px;
    display: flex;
    gap: 20px;
    width: 83%;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const LayoutBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: auto;
  margin-top: 32px;
  padding-left: 164px;

  li {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.fontSize.discription};
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.brown9};
  }
`;
const UserInfoBox = styled.div`
  position: relative;
  min-width: 380px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.brown1};
  height: 189px;
  border-radius: 10px;
  @media (max-width: 768px) {
    margin: auto;
    width: 100%;
  }
  @media (min-width: 769px) {
    padding: 0px;
    width: 80%;
    margin: auto;
  }
  @media (min-width: 1200px) {
    width: 50%;
  }
`;
const UserGenres = styled.div`
  min-width: 380px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.brown1};
  height: 189px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
    margin: auto;
  }
  @media (min-width: 769px) {
    padding: 0px;
    width: 80%;
    margin: auto;
  }
  @media (min-width: 1200px) {
    width: 50%;
  }

  h2 {
    margin-top: 32px;
    margin-left: 32px;
  }
`;

const GenresListBox = styled.ul`
  margin-left: 32px;
  margin-top: 16px;
  width: calc(100% - 64px);
  display: flex;
  flex-wrap: wrap;
  gap: 16px 12px;
  overflow: auto;
  max-height: 100px;
  li {
    font-size: ${({ theme }) => theme.fontSize.discription};
    color: ${({ theme }) => theme.colors.brown5};
    display: inline-block;
    padding: 4px 12px;
    line-height: 150%;
    border-radius: 4px;
    border: 1px solid var(--brown-5, #c58555);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  }
`;

const FigureBox = styled.figure`
  position: absolute;
  left: 32px;
  top: 45px;
`;
const UserProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const UserProfielCapion = styled.figcaption`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;
const TitleBox = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
