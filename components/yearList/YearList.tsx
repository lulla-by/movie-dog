import React from 'react';
import styled from 'styled-components';
type YearMainsProps = {
  year: string;
  data: any;
  idx: string;
};

const YearList = ({ year, data, idx }: YearMainsProps) => {
  console.log(data);
  
  return (
    <WrapperBlock>
     년도별 데이터
    </WrapperBlock>
  );
};

export default YearList;

const WrapperBlock = styled.section``;