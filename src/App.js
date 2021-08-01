import {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import Trial from './Trial';
import Watchlist from './Watchlist'
import './login.css';
import './Trial.css';



function App() {
return (
	<Router>
		<div className="App">
			<Switch>
				<Route exact path='/'><Login /></Route>
				<Route path='/Trial'><Trial /></Route>
				<Route path='/Watchlist'><Watchlist /></Route>
			</Switch>
		</div>
	</Router>
	);
}

export default App;
