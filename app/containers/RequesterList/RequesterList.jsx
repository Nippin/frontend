import { connect } from "react-redux";

import RequesterList from '../../components/RequesterList/RequesterList.jsx';

import { fetchStatus } from '../Requester/actions';

let mapStateToProps = state => ({ 
	dispatch: state.dispatch,
	arrayNIP: state.filler.arrayNIP
});

let mapDispatchToProps = (dispatch, ownProps) => ({
	fetchStatus: NIP => dispatch( fetchStatus(NIP) )
});

export default connect(mapStateToProps, mapDispatchToProps)(RequesterList);