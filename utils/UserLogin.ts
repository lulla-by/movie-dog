import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { authService, db } from '@/fbase';
import { doc, setDoc } from 'firebase/firestore';
type UidType = {
  uid: string;
  state: boolean;
};

// 파이어베이스 로그인 함수
export const firebaseLogin = async (
  id: string,
  password: string,
): Promise<UidType> => {
  if (id.trim().length <= 0 || password.trim().length <= 0) {
    return {
      uid: '',
      state: false,
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      authService,
      id,
      password,
    );
    const uid = userCredential.user.uid;
    return {
      uid,
      state: true,
    };
  } catch (error) {
    alert('이메일과 비밀번호를 확인해주세요');
    return {
      uid: '',
      state: false,
    };
  }
};


// 구글 로그인 함수
export const GoogleLogin = async (): Promise<UidType> => {
  // Google 로그인을 위한 인증 공급자를 생성
  const provider = new GoogleAuthProvider();

  try {
    // 팝업 창을 열어 Google 로그인을 수행
    const result = await signInWithPopup(authService, provider);
    //액세스 토큰은 credential.accessToken에 저장
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    const token = await credential?.accessToken;
    // 로그인한 사용자 정보는 result.user에 저장
    const user = await result.user;

    const uid = await user.uid;

    let userData = {
      uid,
      state: true,
    };

    if (user.email) {
      await setDoc(doc(db, 'users', user.email), {
        email: user.email,
        uid: user.uid,
        nickName: user.displayName,
      });
    }

    return userData;
  } catch (error) {
    console.log(error);
    const userData = {
      uid: '',
      state: false,
    };
    return userData;
  }
};
