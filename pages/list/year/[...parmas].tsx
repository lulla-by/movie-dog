import Category from '@/components/yearList/Category';
import YearList from '@/components/yearList/YearList';
import { Movie } from '@/utils/type/MovieType';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import styled from 'styled-components';

interface YearMainProps {
  data: Movie[];
  year: string;
  idx: string;
}

function YearMain({ data, year, idx}: YearMainProps) {
  return (
    <WrapperBlock>
      <Category />
      <YearList year={year} data={data} idx={idx} />
    </WrapperBlock>
  );
}

export default YearMain;

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

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  let year;
  let idx;
  if (params === undefined) {
    year = '2020';
    idx = '1';
  } else if (params.parmas[1] == undefined) {
    year = params.parmas[0];
    idx = '1';
  } else {
    year = params.parmas[0];
    idx = params.parmas[1];
  }

  const response = await fetch(
    `http://localhost:3000/api/movie/${year}/${idx}`,
  );
  const { results } = await response.json();
  return {
    props: {
      data: results,
      year: year,
      idx: idx,
    },
  };
};
