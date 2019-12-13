import { ReactNode } from 'react';
import { SynonymsConnectedProps } from 'view/connectors/synonyms';

export type Props = SynonymsConnectedProps;

export type State = {
  htmlContent: string;
  isEditorActive: boolean;
  showPopover: boolean;
};

export enum FormatterType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline'
}

export type EditorFormatter = {
  label: ReactNode | string;
  name: string;
};
