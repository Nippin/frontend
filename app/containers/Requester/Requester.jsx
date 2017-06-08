import { connect } from "react-redux";

import Requester from '../../components/Requester/Requester.jsx';

import { fetchStatus } from './actions';
import { statusEnum } from './reducer';

let mapStateToProps = state => ({
	dispatch: state.dispatch,
	statuses: state.requester
});

let mapDispatchToProps = (dispatch, ownProps) => ({
	fetchStatus: NIP => dispatch( fetchStatus(NIP) )
});

let mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, dispatchProps, {
		status: stateProps.statuses[ownProps.NIP]
	});
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Requester);