import React from 'react';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);


class Stock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stockChartXValues:[],
      stockChartYValues:[]
    }
  }

componentDidMount(){
  this.fetchStock();
}

fetchStock(){
  const pointertothis=this;
  console.log(pointertothis);
  const API_Key='G2GL470EQ5XS0OFJ';
let StockSymbol = 'AMZN';
let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey= ${API_Key}`;
let stockChartXValuesFunction=[];
let stockChartYValuesFunction=[];
  fetch(API_Call)
    .then(
      function(response){
        return response.json();
      }
    )
    .then(
      function(data){
        console.log(data);

        for(var key in data['Time Series (Daily)']){
          stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
      }
      //console.log(stockChartXValuesFunction);
      pointertothis.setState(
        {
          stockChartXValues:stockChartXValuesFunction,
          stockChartYValues:stockChartYValuesFunction
        }
      );
    }
    )

}

  render() {
  return(
    <div>
    <h1>Stock Market</h1>
    <Plot
        data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'white'},
          }
        ]}
        layout={ {width: 720, height: 440, title: 'Amazon Stock Chart',plot_bgcolor:'#02717D'} }
      />
    </div>


  )
  }
}


export default Stock
