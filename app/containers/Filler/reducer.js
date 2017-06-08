import { constants } from './constants';

export default function filler(state = { arrayNIP: [] }, action){
	switch (action.type) {
		case constants.UPDATE_LIST:
			return Object.assign({}, state, { arrayNIP: action.arrayNIP });
		default:
			return state;
	}
};