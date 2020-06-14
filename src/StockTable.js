import React, { Component } from 'react';
import './StockTable.css';
import './semantic/out/components/table.css';

class StockTable extends Component {
	render() {
		return (
			<table className="ui inverted table">
				<thead>
					<tr>
						<th>Open Price</th>
						<th>High Price</th>
						<th>Low Price</th>
						<th>Current Price</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{this.props.data.map((stock) => {
						return (
							<tr key={stock.id}>
								<td>$ {stock.openPrice}</td>
								<td>$ {stock.highPrice}</td>
								<td>$ {stock.lowPrice}</td>
								<td>$ {stock.currentPrice}</td>
								<td> {stock.time}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default StockTable;
