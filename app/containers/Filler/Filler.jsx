import { connect } from "react-redux";

import Filler from '../../components/Filler/Filler.jsx';
import { updateList } from './actions';

let mapStateToProps = state => ({ 
	dispatch: state.dispatch 
});

let mapDispatchToProps = (dispatch, ownProps) => ({
	updateList: list => dispatch( updateList(list) )
});

export default connect(mapStateToProps, mapDispatchToProps)(Filler);