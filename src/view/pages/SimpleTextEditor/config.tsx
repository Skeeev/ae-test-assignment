import React from 'react';
import { IOptions as SanitizeConfig } from 'sanitize-html';

import { EditorFormatter, FormatterType } from './types';
import { SELECTION_EVENTS_DEBOUNCE_MS } from './constants';

export const sanitizeConfig: SanitizeConfig = {
  allowedTags: ['br', 'b', 'i', 'em', 'strong', 'u', 'p', 'div']
};

export const formattersConfig: EditorFormatter[] = [
  {
    label: <strong>B</strong>,
    name: FormatterType.Bold
  },
  {
    label: <em>I</em>,
    name: FormatterType.Italic
  },
  {
    label: <u>U</u>,
    name: FormatterType.Underline
  }
];

export const selectionEventsDebounceOptions: [number, {}] = [
  SELECTION_EVENTS_DEBOUNCE_MS,
  { leading: true }
];
