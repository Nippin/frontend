import { constants } from './constants';

export const statusEnum = {
	"pending": 0,
	"fail": 1,
	"success": 2
}

export default function requester(state = {}, action){
	switch (action.type) {
		case constants.REQUEST_STATUS:
			return Object.assign({}, state, { [action.NIP]: statusEnum['pending'] } );

		case constants.RECEIVE_STATUS_SUCCESS:
			return Object.assign({}, state, { [action.NIP]: statusEnum['success'] });

		case constants.RECEIVE_STATUS_FAILURE:
			return Object.assign({}, state, { [action.NIP]: statusEnum['fail'] });
			
		default:
			return state;
	}
};