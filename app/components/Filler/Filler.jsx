export default class Filler extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			insertedText: '',
			checked: false
		}
	}

	checkList(){
		//TODO validate input

		let arrayNIP = this.state.insertedText
			.split('\n')
			.map( e => e.replace(' ','') )
			.map( value => +value )
			.filter( number => number && !isNaN(number) )
		
		this.props.updateList( arrayNIP );
	}

	render(){
		return (
			<div className="col-lg-6">
				<h3>Wprowadzanie danych</h3>

				<div className="form-group">
					<textarea 
						type="text"
						className="form-control" 
						placeholder="Tutaj wklej listę numerów NIP"
						rows={20}
						onChange={ e => this.setState({ insertedText: e.target.value, checked: false }) }/>
				</div>

				<div className="form-group">
					<button 
						className="btn btn-block btn-primary" 
						onClick={() => this.checkList()}>Waliduj wprowadzone dane</button>
				</div>
				
			</div>
		)
	}
}