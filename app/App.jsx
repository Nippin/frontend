import ReactDOM from 'react-dom';

// views
import Filler from './containers/Filler/Filler.jsx';
import RequesterList from './containers/RequesterList/RequesterList.jsx';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import rootReducer from './Root.reducer';

let loggerMiddleware = logger();

let createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
)(createStore);

let store = createStoreWithMiddleware(rootReducer, {});

class App extends React.Component {
	render(){
		return (
			<Provider store={store}>
				<div className="container">
					<h1 className="col-lg-12">Sprawdzarka</h1>
					<Filler />
					<RequesterList />
				</div>
			</Provider>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector('#container'));