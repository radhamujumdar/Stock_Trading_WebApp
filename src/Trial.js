import {db, auth} from './firebase'
import React,{useState, useEffect} from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
//import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
import { useHistory, Link } from 'react-router-dom';

const Plot = createPlotlyComponent(Plotly);


class Trial extends React.Component{
  constructor(props){
    super(props);
    this.state={
      top_10_stocks:['AAPL','FB','MSFT','AMZN',"IBM","TSLA","GOOGL","XOM","BAC","PYPL","TWTR","NFLX","PINS","CRM","DIS"],
      temp_arr:[],
      param_arr:[],
      stockChartXValues:[],
      stockChartYValues:[],
      disp_sym:'',
    }
  }


  componentDidMount(){
    this.fetchData();
    this.fetchStock();
    this.fetchParam();
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

          temp_arr.push({symbol:data['symbol'], comp_name:data['companyName'], price:data['latestPrice'], change_p:data['changePercent'],marketCap:data['marketCap']});

        }

      )

    }
    console.log("Temp Arr"+temp_arr);

    pointertothis.setState(
      {
        temp_arr: temp_arr

      }
    );
  }
  fetchStock(StockSymbol1='AAPL'){

    const pointertothis=this;
    //  console.log(pointertothis);
    const API_Key='G2GL470EQ5XS0OFJ';
    let StockSymbol = StockSymbol1;
    this.fetchParam(StockSymbol);
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

  async fetchParam(paramsy){
    let param_arr = [];
    const pointertothis=this;
    let param_sym=paramsy;
      const API_token = `https://cloud.iexapis.com/stable/stock/${param_sym}/quote?token=pk_042790e0f6f844c1a08763c9a03dc892`;
      await fetch(API_token)
      .then(
        function(response){
          return response.json();
        }
      )
      .then(
        function(data){

          param_arr.push({
            open:data['open'], 
            high:data['high'], 
            low:data['low'], 
            marketCap:data['marketCap'],
            peRatio:data['peRatio'],
            week52High:data['week52High'],
            week52Low:data['week52Low'],
            previousClose:data['previousClose'],
            change:data['change']
          });

        }

      )


     console.log("Param Arr Arr"+param_arr);

    pointertothis.setState(
      {
        param_arr:param_arr,
      }
    );
  }

  addToWatchlist = (symbol1) => {
    db.collection('Watchlist')
    .add({
      symbol: symbol1.symbol
    })
    console.log(symbol1);
  }

  goToWatchlist = () => {
    this.props.history.push('/Watchlist')
  }

  render(){
    let title1=this.state.disp_sym;
    console.log(title1);
    return (
      <div>
      <head>
      <link rel="stylesheet" href="Trial.css"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/Trial" class="font-style1">TradeX</Navbar.Brand>
        <Nav className="ml-auto">
        <Nav.Link >
          <Link class="font-style2" to="/Watchlist">Watchlist</Link>
        </Nav.Link>
        <Nav.Link>
          <Link class="font-style2" to="/">Logout</Link>
        </Nav.Link>
        {/* <Nav.Link href="#orders" class="font-style">Orders</Nav.Link>
        <Nav.Link href="#portfolio" class="font-style">Portfolio</Nav.Link> */}
        </Nav>
      </Container>
      </Navbar>

      <div class="main_div">
        <div class="watchlist_div">
          {/* <div class="search-container">
            <form class="form-inline" action="/action_page.php">
              <input type="text" placeholder="  Search by Company Name" name="search" class="input-style"></input>
            </form>
          </div> */}
        <table class="stocklist scrl">
        <thead>
          <tr class="font-style">
        <th style={{width:"90px"}}>Symbol</th>
        <th style={{width:"240px"}}>Company Name</th>
        <th style={{width:"135px"}}>Latest Price</th>
        <th style={{width:"145px"}}>Change %</th>
        <th style={{width:"90px"}}>Watchlist</th>

        </tr>
        </thead>
        <tbody  class="font-style">

        {
          this.state.temp_arr.map((d) => 
            <tr>
              <td style={{width:"90px"}}>
                <label  id="symbhover" onClick={() => this.fetchStock(d.symbol)}>{d.symbol}</label>
              </td>
              
              <td style={{width:"240px"}}>
                {d.comp_name}
              </td>
              
              <td style={{width:"145px"}} className="align1">
                {d.price}
              </td>
              
              {
                d.change_p < 0 ? (
                  <td class="red" style={{width:"135px"}}>{d.change_p}</td>
                ): <td class="green" style={{width:"135px"}}>{d.change_p}</td>
              }
              
              <td style={{width:"90px"}}>
                <button class="btn2 leftal" onClick={() => this.addToWatchlist(d)}>
                  <i class="fa fa-plus"></i>
                </button>
              </td>
            </tr>
          )
        }


        </tbody>
        </table>
        </div>
        <div class="right-column">
          <div class="chart_div">
            <div class="pltstyle">
              <h3 class="font-style-chart-title">{title1} Stock Chart</h3>
              <Plot
              data={[
                {
                  x: this.state.stockChartXValues,
                  y: this.state.stockChartYValues,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: '#06183A'},

                }
              ]}
              layout={
                {width: 720, height: 340,margin: {
                  l: 60,
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
          </div>
        </div>
        <div>
            {
              this.state.param_arr.map((p)=>
                <div>
                  <div class="params">
                    <div>
                      <div class="alignment1">
                        <p class="font1">Market Cap</p>
                        <p class="font2">${p.marketCap.toLocaleString()}</p>
                      </div>
                      <div class="alignment2">
                        <p class="font1">Change</p>
                        <p class="font2">{p.change}</p>
                      </div>
                    </div>
                    <div>
                      <div class="alignment1">
                        <p class="font1">P/E Ratio</p>
                        <p class="font2">{p.peRatio}</p>
                      </div>
                      <div class="alignment2">
                        <p class="font1">52-week Low</p>
                        <p class="font2">${p.week52Low.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <div class="alignment1">
                        <p class="font1">Previous Close</p>
                        <p class="font2">${p.previousClose.toLocaleString()}</p>
                      </div>
                      <div class="alignment2">
                        <p class="font1">52-week High</p>
                        <p class="font2">${p.week52High.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Trial
