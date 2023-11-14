import { genreArr } from '@/pages/api/data';

export default function findGenre(genreNum: number[]) {
  const correctGenreArr: string[] = [];
  for (let i = 0; i < genreNum.length; i++) {
    genreArr.map((item) => {
      if (+Object.keys(item)[0] === genreNum[i]) {
        correctGenreArr.push(Object.values(item)[0]);
      }
    });
  }
  return correctGenreArr;
}
