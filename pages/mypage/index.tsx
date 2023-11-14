import MyPageContainer from '@/container/MyPage';
import { useState, useEffect } from 'react';
import { db } from '@/fbase';
import { ReviewType } from '@/utils/type/UserDataType';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function MyPage() {
  const router = useRouter();
  const [likeArr, setLikeArr] = useState([]);
  const [reviewArr, setReviewArr] = useState<ReviewType[]>([]);

  const getData = async (uid: string) => {
    const reviewQuery = query(collection(db, 'reviews'));
    const reviewSnapshot = await getDocs(reviewQuery);
    let allReviewArr: ReviewType[] = [];
    reviewSnapshot.forEach((review) => {
      allReviewArr.push(review.data() as ReviewType);
    });
    const reviewResult = allReviewArr.filter((item) => item.uid == uid);
    setReviewArr(reviewResult);

    const likesDocRef = doc(db, 'likes', uid);
    const likesSnap = await getDoc(likesDocRef);
    const likeResult = likesSnap.data()?.likedMovies;
    setLikeArr(likeResult);
  };

  useEffect(() => {
    const data = localStorage.getItem('userData') as string;
    if (data == null) {
      alert('로그인이 필요한 작업입니다');
      router.push('/login');
      return;
    }

    const { uid } = JSON.parse(data);
    getData(uid);
  }, []);

  return (
    <>
        <MyPageContainer likeArr={likeArr} reviewArr={reviewArr} />
    </>
  );
}
