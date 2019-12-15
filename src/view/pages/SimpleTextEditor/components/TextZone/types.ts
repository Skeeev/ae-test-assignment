import { ContentEditableEvent } from 'react-contenteditable';
import { RefObject } from 'react';

export type Props = {
  content: string;
  containerClassName?: string;
  className?: string;
  innerRef?: RefObject<HTMLElement>;
  disabled?: boolean;
  onContentChange: (event: ContentEditableEvent) => void;
  onContentBlur: () => void;
};
