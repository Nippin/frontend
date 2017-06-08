require("./Requester.css");

import { statusEnum } from '../../containers/Requester/reducer';

export default class Requester extends React.Component {

	constructor(props){
	 	super(props);
	}

	retryDownload(){
		this.props.fetchStatus(this.props.NIP)
			.then( () => {
				//success
			})
			.catch( () => {
				//error
			})
	}

	calcStatus(){
		switch(this.props.status){
			case statusEnum['pending']:
				return "W trakcie...";
			case statusEnum['success']:
				return "Pobrano";
			case statusEnum['fail']:
				return "Błąd";
			default:
				return "Czekanie...";
		}
	}

	calcIcon(){
		switch(this.props.status){
			case statusEnum['pending']:
				return "fa-spinner";
			case statusEnum['success']:
				return "fa-check";
			case statusEnum['fail']:
				return "fa-exclamation-triangle";
			default:
				return "fa-clock-o";
		}
	}

	render(){
		return (
			<div className="requester-row">
				<i className={`fa ${this.calcIcon()}`}></i>
				<span>{ this.calcStatus() } </span>
				<span>NIP: { this.props.NIP }</span>

				{
					this.props.status === statusEnum['fail'] ? <button onClick={() => this.retryDownload()}>Ponów</button> : null
				}
			</div>
		)
	}
}