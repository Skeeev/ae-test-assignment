import React, { FunctionComponent, memo } from 'react';
import classNames from 'classnames';

import { Synonym } from 'types/entities';
import { Props } from './types';
import styles from './SynonymsList.module.scss';

export const SynonymsList: FunctionComponent<Props> = memo(
  ({ data, className }: Props) => (
    <ul className={classNames(styles.list, className)}>
      {data.map(({ word }: Synonym) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  )
);

SynonymsList.displayName = 'SynonymsList';
