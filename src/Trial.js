import React,{useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);


class Trial extends React.Component{
  constructor(props){
    super(props);
    this.state={
      top_10_stocks:['AAPL','FB','MSFT','AMZN',"IBM","TSLA","GOOGL","XOM","BAC","PYPL"],
      temp_arr:[],
      stockChartXValues:[],
      stockChartYValues:[],
      disp_sym:''
    }
  }
  componentDidMount(){
  this.fetchData();
  this.fetchStock();
      }


async fetchData(){
    let temp_arr = [];
  const pointertothis=this;
   for(let i=0;i<this.state.top_10_stocks.length;i++){
     const API_token = `https://cloud.iexapis.com/stable/stock/${this.state.top_10_stocks[i]}/quote?token=pk_042790e0f6f844c1a08763c9a03dc892`;
     await fetch(API_token)
        .then(
          function(response){
            return response.json();
          }
        )
        .then(
          function(data){

             temp_arr.push({symbol:data['symbol'], comp_name:data['companyName'], price:data['latestPrice'], change_p:data['changePercent']});

        }

       )

  }
console.log("Temp Arr"+temp_arr);

pointertothis.setState({temp_arr: temp_arr});

}
fetchStock(StockSymbol1){
  const pointertothis=this;
//  console.log(pointertothis);
  const API_Key='G2GL470EQ5XS0OFJ';
let StockSymbol = StockSymbol1;
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
        //console.log(data);

        for(var key in data['Time Series (Daily)']){
          stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
      }
      //console.log(stockChartXValuesFunction);
      pointertothis.setState(
        {
          stockChartXValues:stockChartXValuesFunction,
          stockChartYValues:stockChartYValuesFunction,
          disp_sym:StockSymbol
        }
      );
    }
    )

}




  render(){

    let title1=this.state.disp_sym
    console.log(title1);
    return (
      <div>
      <head>
      <link rel="stylesheet" href="Trial.css"></link>
      </head>
      <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">TradeX</Navbar.Brand>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
    <Nav className="me-auto">
      <Nav.Link href="#home">Watchlist</Nav.Link>
      <Nav.Link href="#features">Orders</Nav.Link>
      <Nav.Link href="#pricing">Portfolio</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      <table class="stocklist">
      <thead>
      <tr>
      <th>Symbol</th>
      <th>Company Name</th>
      <th>Latest Price</th>
      <th>Change Percent</th>
      </tr>
      </thead>
      <tbody>

      {
        this.state.temp_arr.map((d) => <tr id="symbhover" onClick={() => this.fetchStock(d.symbol)}><td>{d.symbol}</td><td>{d.comp_name}</td><td>{d.price}</td><td>{d.change_p}</td></tr>)
      }

      </tbody>
      </table>
      <div class="pltstyle">
      <h1>{title1} Stock Chart</h1>
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
          layout={
            {width: 720, height: 440,plot_bgcolor:'#02717D'}
           }
        />
      </div>
      </div>


    )
  }
}

export default Trial
