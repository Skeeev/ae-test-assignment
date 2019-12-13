import { ContentEditableEvent } from 'react-contenteditable';
import { RefObject } from 'react';

export type Props = {
  content: string;
  innerRef?: RefObject<HTMLElement>;
  disabled?: boolean;
  onContentChange: (event: ContentEditableEvent) => void;
  onContentBlur: () => void;
};
