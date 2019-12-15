import React, { FunctionComponent, memo } from 'react';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames';

import { Props } from './types';
import styles from './TextZone.module.scss';

export const TextZone: FunctionComponent<Props> = memo(
  ({
    innerRef,
    content,
    disabled,
    containerClassName,
    className,
    onContentChange,
    onContentBlur
  }: Props) => (
    <div className={classNames(styles.container, containerClassName)}>
      <ContentEditable
        tagName="pre"
        html={content}
        disabled={disabled}
        innerRef={innerRef}
        className={classNames(styles.text, className)}
        onChange={onContentChange}
        onBlur={onContentBlur}
      />
    </div>
  )
);

TextZone.displayName = 'TextZone';

export default TextZone;
