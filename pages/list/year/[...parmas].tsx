import Category from '@/components/yearList/Category';
import YearList from '@/components/yearList/YearList';
import { Movie } from '@/utils/type/MovieType';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import styled from 'styled-components';

interface YearMainProps {
  data: Movie[];
  year: string;
  idx: string;
}

function YearMain({ data, year, idx }: YearMainProps) {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const params: ParsedUrlQuery | undefined = context.params;

  //params가 undefined인지 확인하고, 해당 경우 기본값인 year와 idx를 설정
  let year = '2020';
  let idx = '1';

  if (params && params.parmas) {
    // params.parmas가 존재하고 배열인지 여부를 확인하고, 값에 접근하여 year와 idx 변수를 설정
    const paramArray = Array.isArray(params.parmas)
      ? params.parmas
      : [params.parmas];
    year = paramArray[0] as string;
    idx = paramArray[1] ? (paramArray[1] as string) : '1';
  }

  const response = await fetch(
    `https://movie-dog.vercel.app/api/movie/${year}/${idx}`,
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
