import theme from '@/styles/theme';
import styled from 'styled-components';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

type SelectBarTypes = {
  width?: number;
};

function SelectBar({ width = 100 }: SelectBarTypes) {
  return (
    <Wrapper width={width}>
      <SelectBlock defaultValue="" required>
        <option value="" disabled>
          옵션을 선택해주세요.
        </option>
        <option value="option 1">option 1</option>
        <option value="option 2">option 2</option>
        <option value="option 3">option 3</option>
      </SelectBlock>
      <IconBlock>
        <ArrowDropDownRoundedIcon />
      </IconBlock>
    </Wrapper>
  );
}

export default SelectBar;

const Wrapper = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width + '%'};
`;

const SelectBlock = styled.select`
  width: 100%;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.discription};
  border: 1px solid ${theme.colors.gray1};
  border-radius: 4px;
  appearance: none;
  transition: all 0.15s;

  :focus {
    border: 1px solid ${theme.colors.brown5};
    outline: none;
    box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.colors.brown5};
  }

  option {
    color: ${({ theme }) => theme.colors.black};
  }

  option[value=''][disabled] {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;

const IconBlock = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray1};
`;
