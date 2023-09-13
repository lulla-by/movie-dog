import theme from '@/styles/theme';
import styled from 'styled-components';

function Tag() {
  return <TagBlock>공포</TagBlock>;
}

export default Tag;

const TagBlock = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSize.discription};
  color: ${({ theme }) => theme.colors.brown5};
  box-shadow: 0px 0px 3px 0px ${({ theme }) => theme.colors.brown5};
`;
