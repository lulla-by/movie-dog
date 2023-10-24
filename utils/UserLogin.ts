import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '@/fbase';

type UidType = {
  uid: string;
  state: boolean;
};

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
    return {
      uid: 'no',
      state: false,
    };
  }
};
