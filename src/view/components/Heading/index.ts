import { createElement, FunctionComponent } from 'react';

import { Props } from './types';
import { DEFAULT_HEADING_LEVEL } from './constants';

export const Heading: FunctionComponent<Props> = ({
  level = DEFAULT_HEADING_LEVEL,
  children,
  ...props
}: Props) => createElement(`h${level}`, props, children);

Heading.displayName = 'Heading';

export default Heading;
