import Requester from '../../containers/Requester/Requester.jsx';

export default class RequesterList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			index: 0,
			step: 5,		// how many request is executed in one time
			processing: []
		}
	}

	performQueueDownload(){

		// warunek wyjscia 
		if(this.state.index > this.props.arrayNIP.length){
			return;
		}
		
		//dokladam y fetch'a
		this.props.fetchStatus( this.props.arrayNIP[ this.state.index ] )
			.then( NIP => {
				this.setState({ processing: this.state.processing.filter( num => num != NIP ) });
				this.checkDownloadAvailability();
			})

		this.setState({ 
			index: this.state.index + 1, 
			processing: [ this.props.arrayNIP[this.state.index], ...this.state.processing ] 
		}, () => this.checkDownloadAvailability() );
	}

	checkDownloadAvailability(){
		if(this.state.processing.length < this.state.step && this.state.index < this.props.arrayNIP.length ){
			this.performQueueDownload();
		}
	}

	render(){
		return (
			<div className="col-lg-6">
				<h3>
					Sprawdzanie danych 
				</h3>

				{
					this.props.arrayNIP.length == 0 ? null : (
						<button className="btn btn-primary btn-sm" onClick={() => this.performQueueDownload()}>Rozpocznij sprawdzanie i pobieranie</button>
					)	
				}				
				
				{
					this.props.arrayNIP.map( NIP => <Requester NIP={NIP} key={UUID.create()}/>)
				}
			</div>
		)
	}
}