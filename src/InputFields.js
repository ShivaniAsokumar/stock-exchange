import React, { Component } from 'react';
import axios from 'axios';
import StockTable from './StockTable';
import './InputFields.css';

class InputFields extends Component {
	state = {
		min: 0,
		sec: 0,
		symbol: '',
		data: [],
		timerID: 0
	};

	timer = (e) => {
		e.preventDefault();
		const timerID = setInterval(this.onSearchSubmit.bind(this), this.state.sec * 1000 + this.state.min * 60 * 1000);
		this.setState({ timerID });
	};

	// Stops timer
	stopTimer = (e) => {
		clearInterval(this.state.timerID);
	};

	onSearchSubmit = async (e) => {
		const apiKey = 'brfa1rfrh5rah2kpg96g';

		await axios
			.get(`https://finnhub.io/api/v1/quote?symbol=${this.state.symbol}&token=${apiKey}`)
			.then((response) => {
				let today = new Date(response.data.t * 1000);
				today = today.toGMTString();

				const data = [ ...this.state.data ];
				const obj = {
					openPrice: response.data.o,
					highPrice: response.data.h,
					lowPrice: response.data.l,
					currentPrice: response.data.c,
					time: today
				};

				data.push(obj);
				this.setState({ data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div>
				<h1>Financial Advising</h1>
				<h2>Please Enter Data Below</h2>

				<form onSubmit={this.timer}>
					<div className="flex-container">
						<input
							onChange={(e) => this.setState({ min: e.target.value })}
							className="flex-item"
							type="text"
							placeholder="Minutes"
							id="min"
						/>
						<input
							onChange={(e) => this.setState({ sec: e.target.value })}
							className="flex-item"
							type="text"
							placeholder="Seconds"
							id="sec"
						/>
						<input
							className="flex-item"
							onChange={(e) => this.setState({ symbol: e.target.value.toUpperCase() })}
							type="text"
							placeholder="Symbol"
							id="symbol"
						/>
						<button type="submit">Submit</button>
					</div>
				</form>
				<div className="stop">
					<button onClick={this.stopTimer} className="stop-button">
						Stop
					</button>
					<button onClick={this.onSearchSubmit} className="refresh-button">
						Refresh
					</button>
					<button onClick={(e) => this.setState({ data: [] })} className="clear-button">
						Clear
					</button>
				</div>

				<StockTable
					min={this.state.min}
					sec={this.state.sec}
					symbol={this.state.symbol}
					data={this.state.data}
				/>
			</div>
		);
	}
}

export default InputFields;
