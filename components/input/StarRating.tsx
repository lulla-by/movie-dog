import { useEffect, useState } from 'react';

import styled from 'styled-components';

import StarRoundedIcon from '@mui/icons-material/StarRounded';

type StarRating = {
  rating: number;
  readonly: boolean;
};

function StarRating({ rating, readonly }: StarRating) {
  const [ratedStar, setRatedStar] = useState(rating);

  const onChange = (index: number) => {
    if (readonly) return;
    setRatedStar(index);
  };

  useEffect(() => {
    setRatedStar(rating);
  }, []);

  return (
    <StarsWrapper>
      {Array(10)
        .fill(1)
        .map((_, i) => (
          <StarWrapper
            key={i}
            onClick={() => onChange(i + 1)}
            ratedStar={ratedStar}
          >
            <FillStarBlock key={i} />
          </StarWrapper>
        ))}
      {readonly && (
        <p className="a11y-hidden">평균 별점은 ${ratedStar}점 입니다.</p>
      )}
    </StarsWrapper>
  );
}

export default StarRating;

const StarsWrapper = styled.div`
  display: flex;
`;

const StarWrapper = styled.div<{ ratedStar: number }>`
  position: relative;
  width: 12px;
  height: 24px;
  overflow: hidden;

  svg {
    fill: none;
  }

  svg path {
    transform-origin: center center;
    stroke: ${({ theme }) => theme.colors.brown8};
    stroke-width: 2px;
  }

  &:nth-child(2n) svg {
    left: -12px;
  }

  &:nth-child(-n + ${({ ratedStar }) => ratedStar}) {
    svg {
      fill: ${({ theme }) => theme.colors.brown8};
    }
  }
`;

const FillStarBlock = styled(StarRoundedIcon)`
  position: absolute;
`;
