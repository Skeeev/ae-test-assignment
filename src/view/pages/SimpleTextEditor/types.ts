import { ReactNode } from 'react';
import { SynonymsConnectedProps } from 'view/connectors/synonyms';

export type Props = SynonymsConnectedProps;

export type State = {
  editorHtmlContent: string;
  isEditorActive: boolean;
  showSelectionPopover: boolean;
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
