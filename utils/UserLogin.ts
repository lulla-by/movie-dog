import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { authService, db } from '@/fbase';
import { doc, setDoc } from 'firebase/firestore';
type UidType = {
  uid: string;
  state: boolean;
};

// Firebase 로그인
export const firebaseLogin = async (
  id: string,
  password: string,
): Promise<UidType> => {
  let userData = {
    uid: '',
    state: false,
  };
  if (id.trim().length <= 0 || password.trim().length <= 0) {
    return userData;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      authService,
      id,
      password,
    );
    const uid = userCredential.user.uid;
    return { uid, state: true };
  } catch (error) {
    alert('이메일과 비밀번호를 확인해주세요');
    return userData;
  }
};

// Google 로그인
export const GoogleLogin = async (): Promise<UidType> => {
  // Google 로그인을 위한 인증 공급자를 생성
  const provider = new GoogleAuthProvider();

  try {
    // 팝업 창을 열어 Google 로그인을 수행
    const result = await signInWithPopup(authService, provider);
    // 로그인한 사용자 정보는 result.user에 저장
    const user = result.user;
    const uid = user.uid;

    if (user.email) {
      await setDoc(doc(db, 'users', user.email), {
        email: user.email,
        uid: user.uid,
        nickName: user.displayName || user.email.split('@')[0],
      });
    }
    return { uid, state: true };
  } catch (error) {
    console.log(error);
    return { uid: '', state: false };
  }
};

// Github로그인
export const GithubLogin = async () => {
  const provider = new GithubAuthProvider();

  try {
    // 팝업 창을 열어 Github 로그인을 수행
    const result = await signInWithPopup(authService, provider);
    const user = result.user;
    const uid = user.uid;

    if (user.email) {
      await setDoc(doc(db, 'users', user.email), {
        email: user.email,
        uid: user.uid,
        nickName: user.displayName || user.email.split('@')[0],
      });
    }
    return { uid, state: true };
  } catch (error) {
    alert("기존에 가입된 계정이 있습니다. 이메일-회원가입으로 로그인해주세요")
    return { uid: '', state: false };
  }
};
