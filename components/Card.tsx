import styled from 'styled-components';
import Image from 'next/image';

function Card() {
  return (
    <>
      <CardBlock>
        <ImageBlock>
          <Image src="/images/barbie.jpeg" alt="바비" fill />
        </ImageBlock>
        <h3>영화제목</h3>
        <p>
          개봉년도・나라
          <br />
          누적 관객수 000,000명
        </p>
      </CardBlock>
    </>
  );
}

export default Card;

const ImageBlock = styled.div`
  position: relative;
  height: 280px;
  margin-bottom: 8px;
`;

const CardBlock = styled.div`
  img {
    object-fit: cover;
  }

  h3 {
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
  }

  p {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
