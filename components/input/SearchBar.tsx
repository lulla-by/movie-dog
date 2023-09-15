import theme from '@/styles/theme';
import styled from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';

type SearchBarTypes = {
  width?: number;
  className?:string;
};

function SearchBar({ width = 100,className="SearchBar" }: SearchBarTypes) {
  const [isFocused, setIsFocused] = useState(false);

  const focusInput = () => {
    setIsFocused(true);
  };

  const blurInput = () => {
    setIsFocused(false);
  };

  return (
    <SearchBox width={width} className={className}>
      <InputBlock
        placeholder="검색어를 입력해주세요."
        onFocus={focusInput}
        onBlur={blurInput}
      />
      <ButtonBlock type="button" isFocused={isFocused}>
        <span className="a11y-hidden">검색하기</span>
        <SearchRoundedIcon />
      </ButtonBlock>
    </SearchBox>
  );
}

export default SearchBar;

const SearchBox = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width + '%'};
`;

const InputBlock = styled.input`
  width: 100%;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.discription};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${theme.colors.gray1};
  border-radius: 4px;
  transition: all 0.15s;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray1};
  }

  :focus {
    outline: none;
    border: 1px solid ${theme.colors.brown5};
  }
`;

const ButtonBlock = styled.button<{ isFocused: boolean }>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.gray1};

  svg {
    font-size: ${({ theme }) => theme.fontSize.headline2};
    color: ${({ theme, isFocused }) => {
      if (isFocused === true) return theme.colors.brown5;
    }};
    transition: all 0.15s;
  }
`;
