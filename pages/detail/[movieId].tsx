import RatingComponent from '@/components/RatingComponent';
import ConfirmButton from '@/components/buttons/ConfirmButton';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function movieId() {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <h1>{router.query.title}</h1>
      <p>{router.query.overView}</p>
      <ContentBlock>
        <DetailBlock>
          <PosterBlock>영화 포스터</PosterBlock>
          <InfoBlock>
            <h1>영화 제목</h1>
            <p className="english-title">영화 영문제목</p>
            <RatingComponent />
            <p>평균 별점・나라・러닝타임・장르(3개까지)</p>
            <p>감독 : 000・출연 : 000, 000, 000, 000(8명까지)</p>
            <p>overview</p>
            <ConfirmButton text="찜" icon="favorite" />
            <ConfirmButton text="한 줄 평 작성" icon="write" />
          </InfoBlock>
        </DetailBlock>
      </ContentBlock>
    </>
  );
}

export default movieId;

const ContentBlock = styled.main`
  max-width: 1200px;
  background-color: pink;
  padding: 100px 0;
  margin: 0 auto;
`;

const DetailBlock = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const PosterBlock = styled.div`
  width: 33.33%;
  background-color: green;
`;

const InfoBlock = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.fontSize.headline2};
  }

  & > * {
    margin: 8px 0;
  }

  .english-title {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
