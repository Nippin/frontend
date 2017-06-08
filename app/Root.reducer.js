import { combineReducers } from 'redux';

import filler from './containers/Filler/reducer';
import requester from './containers/Requester/reducer';

const rootReducer = combineReducers({
	filler,
	requester
});

export default rootReducer