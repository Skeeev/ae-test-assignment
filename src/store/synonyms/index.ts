import { RootState } from 'store/types';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { HttpResponse } from 'types/httpService';
import { getSynonyms } from 'api/synonyms';
import { Synonym } from 'types/entities';
import { SynonymActionType, SynonymsState, UpdateSynonyms } from './types';

// selectors

export const getState = (state: RootState) => state.synonyms;
export const getSynonymsList = createSelector(
  getState,
  ({ list }: SynonymsState) => list
);

export const updateSynonyms = (synonyms: Synonym[]): UpdateSynonyms => ({
  type: SynonymActionType.UpdateSynonyms,
  payload: {
    list: synonyms
  }
});

// actions

export const fetchSynonyms = (targetWord: string) => async (
  dispatch: Dispatch
) => {
  try {
    const { data: synonyms }: HttpResponse = await getSynonyms(targetWord);

    dispatch(updateSynonyms(synonyms));
  } catch {
    // TODO: error handling
    dispatch(updateSynonyms([]));
  }
};
