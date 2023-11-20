# MovieDog

React + Next.js를 이용한 영화정보 반응형 사이트

## 프로젝트 소개

영화정보 사이트인 [TMDB](https://www.themoviedb.org/?language=ko)의 API를 이용하여,
영화의 정보를 조회, 한줄평을 작성할 수 있는 사이트입니다.

## 개발 기간

23.09.05~23.11.15

## 멤버구성

- **조정현**([깃허브](https://github.com/hardy-is-cat)) : 와이어프레임, 피그마 시안, 메인페이지, 장르별 영화, 영화 정보 상세페이지, 검색기능
- **이예솔**([깃허브](https://github.com/lulla-by)) : 로그인, 회원가입, 년도별 영화, 마이페이지

## 사용 기술

- React.js
- Next.js
- TypeScript
- Recoil
- Styled-Components
- Firebase
- Swiper.js

## 주요 기능

### 메인페이지

![무비독 메인페이지](https://github.com/movie-dog/movie-dog/assets/76080643/81eb4caa-8fbd-4a59-9cc5-f473d3757ab9)

- Swiper.js를 이용해 영화 정보를 간략히 확인하고 해당 영화의 상세정보 페지로 이동할 수 있습니다.
- 한 줄 평에서는 유저들이 남긴 리뷰를 확인할 수 있습니다.
- 로그인시 마이페이지 메뉴가 나타납니다.

### 로그인

### 회원가입

### 영화 상세정보 페이지

![무비독 상세페이지](https://github.com/movie-dog/movie-dog/assets/76080643/14d8e138-a9fd-4a48-b6fa-8487635e6135)
<img src="https://github.com/movie-dog/movie-dog/assets/76080643/087497ed-64a1-4b48-a98a-5e4887a39f56" alt="무비독 찜기능" width="50%" style="float:left;">
<img src="https://github.com/movie-dog/movie-dog/assets/76080643/ac7b2071-3729-4b31-9e10-c650034809e9" alt="무비독 한줄평" width="50%" style="clear:both;">

- 상세페이지에서 해당 영화의 상세 정보와 유저들이 남긴 한 줄 평, 비슷한 영화를 확인할 수 있습니다.
- 한 줄 평과 찜영화 데이터는 Firestore Database로 관리합니다.
- 찜기능을 이용해 마이페이지에서 확인할 수 있습니다.
- 한 줄 평은 모달로 띄워지며, 추후 다른 모달이 생성됨에 대비해 Recoil로 상태를 관리합니다.
- 한 줄 평 작성 후 다시 버튼을 누르면 작성한 한 줄 평을 확인할 수 있으며, 수정이 가능합니다.

### 영화검색 페이지

![무비독 영화검색페이지](https://github.com/movie-dog/movie-dog/assets/76080643/c8d0984d-721a-4a52-8b6a-b2dbb11d2bb9)

- 영화의 제목을 입력 후 검색할 수 있습니다.
- 해당되는 영화 정보가 없을 경우 사용자에게 안내합니다.

### 영화 장르 카테고리 페이지

![무비독 장르카테고리 페이지](https://github.com/movie-dog/movie-dog/assets/76080643/7c7358ca-264a-4262-80cd-c1e2f7c762a6)

- 영화를 장르별로 확인 할 수 있는 페이지 입니다.
