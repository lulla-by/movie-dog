import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { authService } from '@/fbase';
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

export const GoogleLogin = async (): Promise<UidType> => {
  // Google 로그인을 위한 인증 공급자를 생성
  const provider = new GoogleAuthProvider();

  try {
    // 팝업 창을 열어 Google 로그인을 수행
    const result = await signInWithPopup(authService, provider);
    //액세스 토큰은 credential.accessToken에 저장
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    // 로그인 성공시 then 블럭
    const token = await credential?.accessToken;
    // 로그인한 사용자 정보는 result.user에 저장
    const user = await result.user;

    const uid = await user.uid;

    const userData = {
      uid,
      state: true,
    };

    return userData;

    //  사용자의 이메일, 프로필 사진 URL, 사용자 이름 등과 같은 정보에 접근
    // IdP data available using getAdditionalUserInfo(result)
  } catch (error) {
    console.log(error);
    const userData = {
      uid: '',
      state: false,
    };

    return userData;
    // 로그인중발생한 오류처리
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.customData.email;
    // const credential = GoogleAuthProvider.credentialFromError(error);
  }
};
