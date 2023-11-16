export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`,
  },
};

export const genreArr: { [key: number]: string }[] = [
  { 28: '액션' },
  { 12: '어드벤쳐' },
  { 16: '애니메이션' },
  { 35: '코미디' },
  { 80: '범죄' },
  { 99: '다큐멘터리' },
  { 18: '드라마' },
  { 10751: '가족' },
  { 14: '판타지' },
  { 36: '역사' },
  { 27: '호러' },
  { 10402: '음악' },
  { 9648: '미스터리' },
  { 10749: '로맨스' },
  { 878: 'SF' },
  { 10770: 'TV영화' },
  { 53: '스릴러' },
  { 10752: '전쟁' },
  { 37: '서부' },
];