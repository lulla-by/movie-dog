import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import GenreSideBar from '@/components/GenreSideBar';
import CardList from '@/container/CardList';

function CategoryList({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [genreId, setGenreId] = useState(params.params);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    // console.log('카테고리 페이지 리랜더링!');
    setGenreId(params.params[0]);
    setCurrentPage(1);
    setOffset(1);
    // console.log(currentPage);
  }, [params.params]);

  return (
    <WrapperBlock>
      <GenreSideBar genreId={genreId} setGenreId={setGenreId} />
      <CardList
        genreId={genreId}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        offset={offset}
        setOffset={setOffset}
      />
    </WrapperBlock>
  );
}

export default CategoryList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  return {
    props: { params },
  };
};

const WrapperBlock = styled.div`
  display: flex;
  flex-flow: row;
  gap: 20px;
  max-width: 1200px;
  padding: 50px 20px;
  margin: 0 auto;

  & aside {
    width: calc(100% / 6);
  }

  & section {
    width: calc(100% / 6 * 5);
  }

  @media (max-width: 1000px) {
    flex-flow: column;

    & aside,
    & section {
      width: 100%;
    }
  }
`;
