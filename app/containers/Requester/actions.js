import { constants } from './constants';
import moment from 'moment';

export const requestStatus = NIP => ({ type: constants.REQUEST_STATUS, NIP});
export const receiveStatusSucc = NIP => ({ type: constants.RECEIVE_STATUS_SUCCESS, NIP});
export const receiveStatusFail = NIP => ({ type: constants.RECEIVE_STATUS_FAILURE, NIP});

export const fetchStatus = NIP => dispatch => {
	//zmieniam stan na zlozenie zapytania
	dispatch(requestStatus(NIP));

	//zwraacm uchwyt do requestu
	return new Promise( (resolve, reject) => {
		
		var xhr = new XMLHttpRequest();
		var solved = false;

		xhr.open('GET', `http://nippin.cloudapp.net/api/screenshot/${NIP}`, true);
		xhr.responseType = 'arraybuffer';

		// ustalam czas po ktorym odpowiedz sie nie zamyka i status jest 0
		setTimeout(() => {
			xhr.abort();
			if(!solved){
				dispatch( receiveStatusFail(NIP) );
		  		return reject();
			}
		}, 60000); // 1 minuta oczekiwania na odpowiedz :P

		xhr.onload = function(e) {
		  if (this.status == 200) {

		    var uInt8Array = new Uint8Array(this.response);
		    var i = uInt8Array.length;
		    var binaryString = new Array(i);
		    while (i--)
		    {
		      binaryString[i] = String.fromCharCode(uInt8Array[i]);
		    }
		    var data = binaryString.join('');

		    var base64 = window.btoa(data);

		    // dowod ze nie ma naglowka Content-Disposition
		    //console.log(xhr.getAllResponseHeaders());

		    // utworz link ktory automatycznie zapisze pliczek
		    var a = document.createElement("a");
		    // ustalam tytuł - chyba ze bedzie customowy naglowek
		    a.download = `${ NIP } ${ moment().format("YYYY-MM-DD") }.png`;
		    // content pliku
		    a.href="data:image/png;base64,"+base64;
		    // wymuszam zapisanie przez klikniecie
		    a.click();

		    // odpalam jako sukces
		    dispatch( receiveStatusSucc(NIP) );
		    solved = true;

		 	return resolve(NIP);
		  }

		  // jak by cos poszlo nie tak
		  dispatch( receiveStatusFail(NIP) );
		  return reject();

		};

		xhr.send();
	})
}
