import React from 'react';
import MyPageContainer from '@/container/MyPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '@/fbase';

type PathsType = {
  params: {
    id: string;
  };
};

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

type ParmasType = {
  params: {
    id: string;
  };
};

function UserPage(props: GetStaticProps) {
  return <MyPageContainer props={props} />;
}

export default UserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const q = query(collection(db, 'users'));
  const usersSnapshot = await getDocs(q);
  const paths: PathsType[] = [];
  usersSnapshot.forEach((userDoc) => {
    const id = userDoc.data().uid;

    // 각 사용자의 uid를 사용하여 동적 경로 생성
    paths.push({ params: { id } });
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: ParmasType) => {
  // review data get
  const reviewQuery = query(collection(db, 'reviews'));
  const reviewSnapshot = await getDocs(reviewQuery);
  let allReviewArr: ReviewType[] = [];
  reviewSnapshot.forEach((review) => {
    allReviewArr.push(review.data() as ReviewType);
  });
  const reviewArr = allReviewArr.filter((item) => item.uid == params.id);

  // like data get
  const likesDocRef = doc(db, 'likes', params.id);
  const likesSnap = await getDoc(likesDocRef);
  const likeArr = likesSnap.data()?.likedMovies;

  return {
    props: {
      reviewArr,
      likeArr,
    },
  };
};
