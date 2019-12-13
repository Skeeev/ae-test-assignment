import { ReactNode } from 'react';
import { EditorFormatter } from 'view/pages/SimpleTextEditor/types';

export type Props = {
  formatters: EditorFormatter[];
  children?: ReactNode[] | ReactNode;
};
