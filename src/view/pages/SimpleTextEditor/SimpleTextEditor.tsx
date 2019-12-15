import React, {
  createRef,
  PureComponent,
  ReactFragment,
  ReactNode,
  RefObject
} from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';
import get from 'lodash/get';
import first from 'lodash/first';

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
    editorHtmlContent: '',
    isEditorActive: true,
    showSelectionPopover: false
  };

  contentRef: RefObject<HTMLElement> = createRef<HTMLElement>();

  handleContentChange = ({
    target: { value: editorHtmlContent }
  }: ContentEditableEvent): void =>
    this.setState({
      editorHtmlContent,
      showSelectionPopover: false
    });

  handleContentBlur = (): void =>
    this.setState(({ editorHtmlContent }: State) => ({
      editorHtmlContent: sanitizeHtml(editorHtmlContent, sanitizeConfig)
    }));

  handleEditorToggle = (): void =>
    this.setState(({ isEditorActive }: State) => ({
      isEditorActive: !isEditorActive
    }));

  getSelectedText = (): string => {
    const selection: Selection | null = window.getSelection();

    if (!selection) {
      return '';
    }

    return selection.toString();
  };

  handleTextSelect = debounce(async (): Promise<void> => {
    const selectedText: string = this.getSelectedText();

    if (!selectedText) {
      return;
    }

    const selectedWords = compact(selectedText.split(/\n/));

    // avoid displaying of popup if user select more then SELECTED_WORDS_LIMIT words
    const shouldPopoverBeShown = selectedWords.length <= SELECTED_WORDS_LIMIT;

    if (!shouldPopoverBeShown) {
      this.setState({
        showSelectionPopover: false
      });
      return;
    }

    const selectedWord = trim(first(selectedWords));

    if (!selectedWord) {
      return;
    }

    const { fetchSynonyms } = this.props;

    this.setState({
      showSelectionPopover: true
    });

    await fetchSynonyms(selectedWord);
  }, ...selectionEventsDebounceOptions);

  handleTextUnselect = debounce((): void => {
    const { showSelectionPopover } = this.state;
    const selectedText = this.getSelectedText();

    if (selectedText || !showSelectionPopover) {
      return;
    }

    this.setState({
      showSelectionPopover: false
    });
  }, ...selectionEventsDebounceOptions);

  renderEmptyListLabel = (): string => 'No synonyms for this word.';

  replaceSelectedText = (replacementText: string) => {
    const selection = window.getSelection();
    const selectionRangeCount = get(selection, 'rangeCount', null);

    if (!selection || !selectionRangeCount) {
      return;
    }

    const range = selection.getRangeAt(0);

    range.deleteContents();
    range.insertNode(document.createTextNode(replacementText));

    const editorHtmlContent = this.contentRef.current!.innerHTML;

    // update editor content to inform React about replacement
    this.setState({
      editorHtmlContent
    });
  };

  handleSynonymSelect = (synonym: string): void =>
    this.replaceSelectedText(synonym);

  renderSynonyms = (): ReactFragment => {
    const { synonymsList } = this.props;

    return (
      <>
        Replace with synonym:
        <SynonymsList
          data={synonymsList}
          className={styles.synonymsList}
          onSynonymSelect={this.handleSynonymSelect}
        />
      </>
    );
  };

  render(): ReactNode {
    const { synonymsList } = this.props;
    const {
      editorHtmlContent,
      isEditorActive,
      showSelectionPopover
    } = this.state;

    return (
      <>
        <header className={styles.header}>
          <Heading level={1} className={styles.heading}>
            Simple Text Editor
          </Heading>
        </header>
        <main>
          <ControlPanel
            formatters={formattersConfig}
            className={styles.controlPanel}
          >
            <button
              type="button"
              className={styles.toggleEditorButton}
              onClick={this.handleEditorToggle}
            >
              Toggle editor
            </button>
          </ControlPanel>

          <TextZone
            innerRef={this.contentRef}
            content={editorHtmlContent}
            disabled={!isEditorActive}
            containerClassName={styles.textZone}
            onContentChange={this.handleContentChange}
            onContentBlur={this.handleContentBlur}
          />

          <ControlPopover
            isOpen={showSelectionPopover}
            selectionRef={this.contentRef}
            onTextSelect={this.handleTextSelect}
            onTextUnselect={this.handleTextUnselect}
          >
            {isEmpty(synonymsList)
              ? this.renderEmptyListLabel()
              : this.renderSynonyms()}
          </ControlPopover>
        </main>
      </>
    );
  }
}

export default SimpleTextEditor;
