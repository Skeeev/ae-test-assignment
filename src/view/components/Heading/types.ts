import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
  level?: number;
  [key: string]: any;
};
