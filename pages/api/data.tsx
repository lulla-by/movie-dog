export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`,
  },
};

export const reviews = [
  {
    rating: 2.5,
    description:
      '영화에 대한 한줄평이 출력되는 공간입니다. 공백 포함 한글 기준 최대 100자까지 출력됩니다. 야호 영화 너무 재밌어요 꺄올롤로 영화에 대한 한줄평이 출력되는 공간입니다. 최대 100자까지 출력됩니다. 야호야호',
    title: '영화 제목이 출력됩니다.',
    writer: '하디맘',
    like: 20,
  },
  {
    rating: 4,
    description:
      '영화에 대한 한줄평이 출력되는 공간입니다. 공백 포함 한글 기준 최대 100자까지 출력됩니다. 야호 영화 너무 재밌어요 꺄올롤로',
    title: '영화 제목이 출력됩니다.',
    writer: '하디댇',
    like: 24,
  },
  {
    rating: 5,
    description:
      '공백 포함 한글 기준 최대 100자까지 출력됩니다. 야호 영화 너무 재밌어요 꺄올롤로 영화에 대한 한줄평이 출력되는 공간입니다.',
    title: '영화 제목이 출력됩니다.',
    writer: '하디',
    like: 12,
  },
  {
    rating: 3,
    description:
      '야호 영화 너무 재밌어요 꺄올롤로 영화에 대한 한줄평이 출력되는 공간입니다.',
    title: '영화 제목이 출력됩니다.',
    writer: 'hardy',
    like: 5,
  },
];

export const genreId: { [key: number]: string } = {
  28: '액션',
  12: '어드벤쳐',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '호러',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};
