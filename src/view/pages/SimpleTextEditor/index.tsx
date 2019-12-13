import React, { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { Props, State } from './types';
import {
  formattersConfig,
  sanitizeConfig,
  selectionEventsDebounceOptions
} from './config';
import { SELECTED_WORDS_LIMIT } from './constants';
import { Heading } from 'view/components/Heading';
import {
  ControlPanel,
  TextZone,
  ControlPopover,
  SynonymsList
} from './components';
import styles from './SimpleTextEditor.module.scss';

export class SimpleTextEditor extends PureComponent<Props, State> {
  state: State = {
    htmlContent: '',
    isEditorActive: true,
    showPopover: false
  };

  contentRef: RefObject<HTMLElement> = createRef<HTMLElement>();

  handleContentChange = ({
    target: { value: htmlContent }
  }: ContentEditableEvent): void =>
    this.setState({
      htmlContent
    });

  handleContentBlur = (): void =>
    this.setState(({ htmlContent }: State) => ({
      htmlContent: sanitizeHtml(htmlContent, sanitizeConfig)
    }));

  handleEditorToggle = (): void =>
    this.setState(({ isEditorActive }: State) => ({
      isEditorActive: !isEditorActive
    }));

  handleTextSelect = debounce(async (): Promise<void> => {
    const selection: Selection | null = window.getSelection();

    if (!selection) {
      return;
    }

    const selectedText = selection.toString();
    const selectedWords = compact(selectedText.split(/\n/));

    // avoid displaying of popup if user select more then SELECTED_WORDS_LIMIT words
    const shouldPopoverBeShown = selectedWords.length <= SELECTED_WORDS_LIMIT;

    if (!shouldPopoverBeShown) {
      this.setState({
        showPopover: false
      });
      return;
    }

    const { fetchSynonyms } = this.props;
    const [selectedWord] = selectedWords;

    this.setState({
      showPopover: true
    });

    await fetchSynonyms(selectedWord);
  }, ...selectionEventsDebounceOptions);

  handleTextUnselect = debounce((): void => {
    const { showPopover } = this.state;
    const selection: Selection | null = window.getSelection();
    const selectedText = selection ? selection.toString() : '';

    if (selectedText || !showPopover) {
      return;
    }

    this.setState({
      showPopover: false
    });
  }, ...selectionEventsDebounceOptions);

  renderEmptyListLabel = () => 'No synonyms for this word.';

  renderSynonymsList = () => {
    const { synonymsList } = this.props;

    return (
      <>
        Synonyms:
        <SynonymsList data={synonymsList} className={styles.synonymsList} />
      </>
    );
  };

  render(): ReactNode {
    const { synonymsList } = this.props;
    const { htmlContent, isEditorActive, showPopover } = this.state;

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Heading level={1} className={styles.heading}>
            Simple Text Editor
          </Heading>
        </header>
        <main className={styles.main}>
          <ControlPanel formatters={formattersConfig}>
            <button type="button" onClick={this.handleEditorToggle}>
              Toggle editor
            </button>
          </ControlPanel>

          <TextZone
            innerRef={this.contentRef}
            content={htmlContent}
            disabled={!isEditorActive}
            onContentChange={this.handleContentChange}
            onContentBlur={this.handleContentBlur}
          />

          <ControlPopover
            isOpen={showPopover}
            selectionRef={this.contentRef}
            onTextSelect={this.handleTextSelect}
            onTextUnselect={this.handleTextUnselect}
          >
            {isEmpty(synonymsList)
              ? this.renderEmptyListLabel()
              : this.renderSynonymsList()}
          </ControlPopover>
        </main>
      </div>
    );
  }
}
