import styled from 'styled-components';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
type RatingProps = {
  rating?: number;
};
export function RatingComponent({ rating = 0 }: RatingProps) {
  const totalRating = 5;
  const missingRating = totalRating - rating;

  const missingRatingBoxes = Array.from(
    { length: missingRating },
    (_, index) => (
      <MissingRatingBox key={index}>
        <StarBorderRoundedIcon />
      </MissingRatingBox>
    ),
  );
  const ratingBoxes = Array.from({ length: rating }, (_, index) => (
    <RatingBox key={index}>
      <StarRoundedIcon />
    </RatingBox>
  ));

  const text = `평균 별점은 ${rating}점 입니다.`;

  return (
    <Container>
      <AllyText>{text}</AllyText>
      {ratingBoxes}
      {missingRatingBoxes}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.brown8};
`;
const AllyText = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;
const RatingBox = styled.div`
  min-width: 24px;
  height: 24px;
  border: none;
`;
const MissingRatingBox = styled.div`
  min-width: 24px;
  height: 24px;
  border: none;
`;
