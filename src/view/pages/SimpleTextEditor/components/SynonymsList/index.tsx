import React, { FunctionComponent, memo } from 'react';
import classNames from 'classnames';

import { Synonym } from 'types/entities';
import { Props } from './types';
import styles from './SynonymsList.module.scss';

export const SynonymsList: FunctionComponent<Props> = memo(
  ({ data, className, onSynonymSelect }: Props) => (
    <ul className={classNames(styles.list, className)}>
      {data.map(({ word }: Synonym) => (
        <li
          key={word}
          className={styles.listItem}
          onMouseDown={onSynonymSelect && (() => onSynonymSelect(word))}
        >
          {word}
        </li>
      ))}
    </ul>
  )
);

SynonymsList.displayName = 'SynonymsList';

export default SynonymsList;
