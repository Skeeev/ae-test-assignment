import { Synonym } from 'types/entities';

export enum SynonymActionType {
  UpdateSynonyms = 'synonyms/updateSynonyms'
}

export interface SynonymsState {
  list: Synonym[];
}

export type SynonymActionPayload = SynonymsState;

export interface UpdateSynonyms {
  type: SynonymActionType.UpdateSynonyms;
  payload: SynonymActionPayload;
}

export type SynonymsActions = UpdateSynonyms;
