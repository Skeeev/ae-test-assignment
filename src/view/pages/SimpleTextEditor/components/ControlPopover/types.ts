import { ReactNode, RefObject } from 'react';

export type Props = {
  selectionRef: RefObject<HTMLElement>;
  isOpen: boolean;
  children: ReactNode[] | ReactNode;
  onTextSelect: () => void;
  onTextUnselect: () => void;
};
