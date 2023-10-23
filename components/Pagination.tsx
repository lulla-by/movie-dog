import styled from 'styled-components';

type PaginationTypes = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ currentPage, setCurrentPage }: PaginationTypes) {
  const pageCount: number = 10;

  const moveToIndex = (index: number) => {
    console.log(`move to ${index}!`);
    setCurrentPage(index);
  };

  return (
    <PageButtonWrapper>
      {Array(pageCount)
        .fill(1)
        .map((item, i) => (
          <PageNumButton
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => moveToIndex(i + 1)}
          >
            {item + i}
          </PageNumButton>
        ))}
    </PageButtonWrapper>
  );
}

export default Pagination;

const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PageNumButton = styled.button`
  width: 32px;
  height: 32px;
  margin: 0 2px;
  color: ${({ theme }) => theme.colors.brown5};
  font-size: ${({ theme }) => theme.fontSize.headline5};
  font-weight: 700;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  background: none;

  &.active {
    background-color: ${({ theme }) => theme.colors.brown5};
    color: ${({ theme }) => theme.colors.white};
  }
`;
