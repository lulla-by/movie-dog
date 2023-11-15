import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

const Category = () => {
  const yearArr = [
    { '2020': '2020' },
    { '2010': '2010' },
    { '2000': '2000' },
    { '1990': '1990' },
    { '1980': '1980' },
    { '1970': '1970' },
    { '1960': '1960' },
    { '1950': '1950' },
    { '1940': '1940' },
    { '1930': '1930' },
  ];
  const currentYear = new Date().getFullYear().toString();
  let [yearId, setYearId] = useState(currentYear);
  return (
      <SidebarBlock>
      <h2>년도별 영화</h2>
      <ul>
        {yearArr.map((year) => {
          const yearNum = Object.keys(year)[0];
          const yearName = Object.values(year)[0];
          const [opentState, setOpenState] = useState(false);
          const changeState = () => {
            setOpenState(!opentState);
          };

          const li = Array.from({ length: 10 }, (_, i) => {
            const futureYear = parseInt(yearName) + i;
            if (futureYear > parseInt(currentYear)) return null;
            return (
              <li key={i}>
                <Link href={`/list/year/${futureYear}`}>
                  {futureYear}년
                </Link>
              </li>
            );
          });
          return (
            <li className={yearId == yearNum ? 'active' : ''} key={yearNum}>
              <div
                onClick={() => {
                  setYearId(yearNum);
                }}
              >
                <div onClick={changeState}>{yearName}년대</div>
                {opentState && <ul>{li}</ul>}
              </div>
            </li>
          );
        })}
      </ul>
    </SidebarBlock>
  );
};

export default Category;

const SidebarBlock = styled.aside`
  h2 {
    padding: 12px 20px;
    background-color: ${({ theme }) => theme.colors.brown5};
    border-radius: 4px 4px 0 0;
    color: ${({ theme }) => theme.colors.brown1};
    font-size: ${({ theme }) => theme.fontSize.headline4};
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    gap: 20px 30px;
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray1};
    border-top: none;
    border-radius: 0 0 4px 4px;

    @media (min-width: 1000px) {
      flex-flow: column;
      gap: 0px;
    }
  }

  li {
    color: ${({ theme }) => theme.colors.gray1};

    &.active {
      color: ${({ theme }) => theme.colors.brown9};
      font-weight: 700;
    }

    a {
      color: inherit;
    }

    @media (min-width: 1000px) {
      margin-bottom: 12px;
    }
  }

  li:last-child {
    margin-bottom: 0;
  }
`;
