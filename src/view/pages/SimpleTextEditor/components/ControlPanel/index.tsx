import React, { PureComponent, MouseEvent, ReactNode } from 'react';

import { Props } from './types';
import { EditorFormatter } from 'view/pages/SimpleTextEditor/types';
import styles from './ControlPanel.module.scss';

export class ControlPanel extends PureComponent<Props, {}> {
  toggleFormatter = (formatterName: string): void => {
    document.execCommand(formatterName, false);
  };

  handleFormatterToggle = (event: MouseEvent, formatterName: string): void => {
    event.preventDefault();

    this.toggleFormatter(formatterName);
  };

  render(): ReactNode {
    const { formatters, children } = this.props;

    return (
      <div className={styles.controlPanel}>
        <div>
          {formatters.map(({ name, label }: EditorFormatter) => (
            <button
              key={name}
              type="button"
              onMouseDown={(event: MouseEvent) =>
                this.handleFormatterToggle(event, name)
              }
            >
              {label}
            </button>
          ))}
        </div>
        {children}
      </div>
    );
  }
}
