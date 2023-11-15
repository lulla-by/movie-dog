import { atomFamily } from 'recoil';

type ModalType = {
  isOpened: boolean;
};

export const modalStateFamily = atomFamily<ModalType, string>({
  key: 'modalStateFamily',
  default: (id) => ({
    id,
    isOpened: false,
  }),
});
