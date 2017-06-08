import { constants } from './constants';
import moment from 'moment';

import { url } from '../../../srv.config';

export const requestStatus = NIP => ({ type: constants.REQUEST_STATUS, NIP});
export const receiveStatusSucc = NIP => ({ type: constants.RECEIVE_STATUS_SUCCESS, NIP});
export const receiveStatusFail = NIP => ({ type: constants.RECEIVE_STATUS_FAILURE, NIP});

export const fetchStatus = NIP => dispatch => {

	dispatch(requestStatus(NIP));

	return new Promise( (resolve, reject) => {
		
		var xhr = new XMLHttpRequest();
		var solved = false;

		xhr.open('GET', `${url}/${NIP}`, true);
		xhr.responseType = 'arraybuffer';

		// setting max request time
		setTimeout(() => {
			// if we solved out request then just don't do anything
			if(!solved){
				xhr.abort();
				dispatch( receiveStatusFail(NIP) );
		  		return resolve();
			}
		}, 60000); // 1 minute waiting then cancel the request

		xhr.onload = function(e) {
		  if (this.status == 200) {
		  	// to make sure if timeout is still counting to prevent aborting
		    solved = true;

		    // casting to proper download data type
		    var uInt8Array = new Uint8Array(this.response);
		    var i = uInt8Array.length;
		    var binaryString = new Array(i);
		    while (i--)
		    {
		      binaryString[i] = String.fromCharCode(uInt8Array[i]);
		    }
		    var data = binaryString.join('');
		    var base64 = window.btoa(data);

		    // create link to perform downloading in proper moment
		    var a = document.createElement("a");

		    // set title of file
			a.download = xhr.getResponseHeader('AttachmentFileName');
		    
		    // here is out content
		    a.href="data:image/png;base64,"+base64;

		    // extortion downloading
		    a.click();

		    // odpalam jako sukces
		    dispatch( receiveStatusSucc(NIP) );

		 	return resolve(NIP);
		  }else{
		  	dispatch( receiveStatusFail(NIP) );
		  	return resolve();
		  }
		};

		xhr.send();
	})
}
