export type Genres = {
    id: number;
    name: string;
  };
  
  export  type LikeType = {
    genres: Genres[];
    movieId: number;
    movieTitle: string;
    poster_path: string;
    release_date: string;
  }
  
  
  export type ReviewType = {
    content: string;
    genres: Genres[];
    movieId: number;
    movieTitle: string;
    poster_path: string;
    rating: number;
    uid: string;
    userNickName: string;
  };
  export type UserDataProps = {
      reviewArr: ReviewType[];
      likeArr: LikeType[];
  };

  export type LikeDataProps = Pick<UserDataProps, 'likeArr'>;

  export type ReviewDataProps = Pick<UserDataProps,"reviewArr">;