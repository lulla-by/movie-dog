import { signInWithEmailAndPassword } from 'firebase/auth';
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
    alert("이메일과 비밀번호를 확인해주세요")
    return {
      uid: '',
      state: false,
    };
  }
};
