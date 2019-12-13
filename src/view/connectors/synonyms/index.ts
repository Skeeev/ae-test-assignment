import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from 'store/types';
import { getSynonymsList, fetchSynonyms } from 'store/synonyms';

const mapStateToProps = (state: RootState) => ({
  synonymsList: getSynonymsList(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchSynonyms
    },
    dispatch
  );

export type SynonymsConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
