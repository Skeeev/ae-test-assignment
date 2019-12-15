import React, { FunctionComponent } from 'react';

import { Heading } from 'view/components/Heading';
import styles from './NotFound.module.scss';

export const NotFound: FunctionComponent = () => (
  <Heading level={2} className={styles.heading}>
    404 - Not found
  </Heading>
);

NotFound.displayName = 'NotFound';

export default NotFound;
