import { modalStateFamily } from '@/stores/atoms';
import { useRecoilState } from 'recoil';

export default function useModal(id: string) {
  const [modal, setModal] = useRecoilState(modalStateFamily(id));

  const toggleModal = (isOpened: boolean) => {
    setModal({ isOpened: !isOpened });
  };

  return { modal, toggleModal };
}
