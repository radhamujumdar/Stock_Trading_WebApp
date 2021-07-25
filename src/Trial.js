import React,{useState, useEffect} from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      disp_sym:'',
      disp_marketCap:'',


    }
  }
  componentDidMount(){
  this.fetchData();
  this.fetchStock();
      }


async fetchData(marketCap){
    let temp_arr = [];
    let marketCap_l=marketCap
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

             temp_arr.push({symbol:data['symbol'], comp_name:data['companyName'], price:data['latestPrice'], change_p:data['changePercent'],marketCap:data['marketCap']});

        }

       )

  }
console.log("Temp Arr"+temp_arr);

pointertothis.setState(
  {
    temp_arr: temp_arr,
    disp_marketCap:marketCap

  }
  );

}
fetchStock(StockSymbol1='AAPL'){
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
    let title1=this.state.disp_sym;
    let marketCap1=this.state.disp_marketCap;
    console.log(title1);
    console.log(marketCap1);
    return (
      <div>
      <head>
      <link rel="stylesheet" href="Trial.css"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">TradeX</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#watchlist">Watchlist</Nav.Link>
      <Nav.Link href="#orders">Orders</Nav.Link>
      <Nav.Link href="#portfolio">Portfolio</Nav.Link>
    </Nav>
    </Container>
  </Navbar>

  <div class="main_div">
  <div class="watchlist_div">
  <div class="search-container">
    <form class="form-inline" action="/action_page.php">
      <input type="text" placeholder="Search.." name="search"></input>
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>
  <table class="stocklist scrl">
  <thead>

  <tr>

  <th style={{width:"82px"}}>Symbol</th>
  <th style={{width:"155px"}}>Company Name</th>
  <th style={{width:"135px"}}>Latest Price</th>
  <th style={{width:"145px"}}>Change Percent</th>
  <th style={{width:"100px"}}>Remove</th>

  </tr>
  </thead>
  <tbody >

  {
    this.state.temp_arr.map((d) => <tr id="symbhover" onClick={() => this.fetchStock(d.symbol)}><td style={{width:"70px"}}>{d.symbol}</td><td style={{width:"150px"}}>{d.comp_name}</td><td style={{width:"150px"}}>{d.price}</td><td style={{width:"150px"}} >{d.change_p}</td><td style={{width:"100px"}}><button class="btn2"><i class="fa fa-plus"></i></button></td></tr>)
  }
  {
    this.state.temp_arr.map((d) => <tr id="symbhover" onClick={() => this.fetchData(d.marketCap)}></tr>)
  }

  </tbody>
  </table>
  </div>
  <div class="chart_div">
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
        {width: 720, height: 440,plot_bgcolor:'#02717D',margin: {
l: 50,
r: 50,
b: 50,
t: 50,
pad: 4
},font: {
size: 16,
color: '#000'
},}
       }
    />
    <h3>{marketCap1}</h3>
  </div>
  </div>
  </div>


      </div>



    )
  }
}

export default Trial
