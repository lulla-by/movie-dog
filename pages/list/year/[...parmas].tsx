import Category from '@/components/yearList/Category';
import React from 'react';
import styled from 'styled-components';


function YearMain() {
  return (
    <WrapperBlock>
      <Category />
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
