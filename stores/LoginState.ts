import { atom } from 'recoil';

export const LoginToken = atom<string>({
  key: 'LoginToken',
  default: 'default',
});
export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
});
