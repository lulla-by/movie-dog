import Link from 'next/link';
import styled from 'styled-components';

import { genreArr } from '@/pages/api/data';

type GenreSideBarTypes = {
  genreId: string;
  setGenreId: React.Dispatch<React.SetStateAction<number>>;
};

function GenreSideBar({ genreId }: GenreSideBarTypes) {
  return (
    <SidebarBlock>
      <h2>장르별 영화</h2>
      <ul>
        {genreArr.map((genre) => {
          const genreNum = Object.keys(genre)[0];
          const genreName = Object.values(genre)[0];
          return (
            <li className={genreId === genreNum ? 'active' : ''} key={genreNum}>
              <Link href={`/list/genre/${genreNum}`}>{genreName}</Link>
            </li>
          );
        })}
      </ul>
    </SidebarBlock>
  );
}

export default GenreSideBar;

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
