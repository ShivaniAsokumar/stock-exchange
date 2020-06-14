import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputFields from './InputFields';

class App extends Component {
	render() {
		return (
			<div>
				<InputFields />
			</div>
		);
	}
}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
