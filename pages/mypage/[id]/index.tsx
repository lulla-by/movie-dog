import React, { useEffect } from 'react';
import MyPageContainer from '@/container/MyPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/fbase';

type Params = {
  params: {
    id: string;
  };
}

function UserPage(props: GetStaticProps) {
  console.log(props);

  return <MyPageContainer />;
}

export default UserPage;



export const getStaticPaths: GetStaticPaths = async () => {

  const q = query(collection(db, 'users'));
  const usersSnapshot = await getDocs(q);
  const paths: Params[] = [];
  usersSnapshot.forEach((userDoc) => {
    const id = userDoc.data().uid;

    // 각 사용자의 uid를 사용하여 동적 경로 생성
    paths.push({ params: { id } });
  });

  return { paths, fallback: false };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  // async여야 함
  return {
    props: {
      params,
    },
  };
};
