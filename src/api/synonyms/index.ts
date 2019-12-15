import { httpService } from 'services/httpService';
import { HttpService } from 'types/httpService';

export const getSynonyms = (targetWord: string): HttpService =>
  httpService({
    url: 'words',
    params: {
      rel_syn: targetWord
    }
  });
