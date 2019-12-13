import React from 'react';

import { Heading } from 'view/components/Heading';
import styles from './NotFound.module.scss';

export const NotFound = () => (
  <Heading level={2} className={styles.heading}>
    404 - Not found
  </Heading>
);
