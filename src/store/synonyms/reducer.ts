import { SynonymActionType, SynonymsActions, SynonymsState } from './types';

export const initialState: SynonymsState = {
  list: []
};

export const reducer = (
  state: SynonymsState = initialState,
  { type: actionType, payload: actionPayload }: SynonymsActions
) => {
  switch (actionType) {
    case SynonymActionType.UpdateSynonyms:
      const { list } = actionPayload;

      return {
        ...state,
        list
      };
    default:
      return state;
  }
};
