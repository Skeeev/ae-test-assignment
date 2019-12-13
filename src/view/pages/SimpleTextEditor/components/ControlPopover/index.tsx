import React, { FunctionComponent } from 'react';
import Popover from 'react-text-selection-popover';

import { Props } from './types';
import { formattersConfig } from 'view/pages/SimpleTextEditor/config';
import { ControlPanel } from 'view/pages/SimpleTextEditor/components';
import styles from './ControlPopover.module.scss';

export const ControlPopover: FunctionComponent<Props> = ({
  children,
  ...popoverProps
}: Props) => {
  return (
    <Popover {...popoverProps}>
      <div className={styles.container}>
        <ControlPanel formatters={formattersConfig} />
        <div className={styles.content}>{children}</div>
      </div>
    </Popover>
  );
};

ControlPopover.displayName = 'ControlPopover';
