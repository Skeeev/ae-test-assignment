import React, { memo, MouseEvent, FunctionComponent } from 'react';
import classNames from 'classnames';

import { Props } from './types';
import { EditorFormatter } from 'view/pages/SimpleTextEditor/types';
import styles from './ControlPanel.module.scss';

const toggleFormatter = (formatterName: string): void => {
  document.execCommand(formatterName, false);
};

const handleFormatterToggle = (
  event: MouseEvent,
  formatterName: string
): void => {
  event.preventDefault();

  toggleFormatter(formatterName);
};

export const ControlPanel: FunctionComponent<Props> = memo(
  ({ formatters, className, children }: Props) => (
    <div className={classNames(styles.controlPanel, className)}>
      <div>
        {formatters.map(({ name, label }: EditorFormatter) => (
          <button
            key={name}
            type="button"
            className={styles.controlButton}
            onMouseDown={(event: MouseEvent) =>
              handleFormatterToggle(event, name)
            }
          >
            {label}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
);

ControlPanel.displayName = 'ControlPanel';

export default ControlPanel;
