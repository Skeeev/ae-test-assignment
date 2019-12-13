import React, { FunctionComponent, memo } from 'react';
import ContentEditable from 'react-contenteditable';

import { Props } from './types';
import styles from './TextZone.module.scss';

export const TextZone: FunctionComponent<Props> = memo(
  ({ innerRef, content, disabled, onContentChange, onContentBlur }: Props) => (
    <div className={styles.textZone}>
      <ContentEditable
        innerRef={innerRef}
        tagName="pre"
        html={content}
        disabled={disabled}
        className={styles.text}
        onChange={onContentChange}
        onBlur={onContentBlur}
      />
    </div>
  )
);

TextZone.displayName = 'TextZone';
