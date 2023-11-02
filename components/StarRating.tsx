import { useEffect, useState } from 'react';

import styled from 'styled-components';

import StarRoundedIcon from '@mui/icons-material/StarRounded';

type StarRating = {
  rating: number;
  starSize?: number;
  readonly?: boolean;
};

function StarRating({ rating, starSize = 24, readonly = true }: StarRating) {
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
            starSize={starSize}
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

const StarWrapper = styled.div<{ ratedStar: number; starSize: number }>`
  position: relative;
  width: ${({ starSize }) => starSize / 2 + 'px'};
  height: ${({ starSize }) => starSize + 'px'};
  overflow: hidden;

  svg {
    fill: none;
    font-size: ${({ starSize }) => starSize + 'px'};
  }

  svg path {
    stroke: ${({ theme }) => theme.colors.brown8};
    stroke-width: 2px;
  }

  &:nth-child(2n) svg {
    left: ${({ starSize }) => -(starSize / 2) + 'px'};
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
