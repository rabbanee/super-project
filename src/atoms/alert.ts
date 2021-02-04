import { atom, RecoilState } from 'recoil';

export interface AlertState {
  isOpen: boolean;
  primary: string;
  secondary: string;
  type: string;
  timeout: number;
}

export const alertState: RecoilState<AlertState> = atom({
  key: 'alertState',
  default: {
    isOpen: false,
    primary: '',
    secondary: '',
    type: 'success',
    timeout: 5000,
  },
});