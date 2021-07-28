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
const Plot = createPlotlyComponent(Plotly);


class Trial extends React.Component{
  constructor(props){
    super(props);
    this.state={
      top_10_stocks:['AAPL','FB','MSFT','AMZN',"IBM","TSLA","GOOGL","XOM","BAC","PYPL","TWTR","NFLX"],
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

          param_arr.push({open:data['open'], high:data['high'], low:data['low'], marketCap:data['marketCap'],peRatio:data['peRatio'],week52High:data['week52High'],week52Low:data['week52Low'],previousClose:data['previousClose']});

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
      symbol: symbol1
    })
  }

  // paramIsNull = (param1) => {
  //   if(param1)
  //     vkh
  //   else
  //     -
  // }

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
        <th style={{width:"90px"}}>Symbol</th>
        <th style={{width:"240px"}}>Company Name</th>
        <th style={{width:"135px"}}>Latest Price</th>
        <th style={{width:"145px"}}>Change Percent</th>
        <th style={{width:"90px"}}>Watchlist</th>

        </tr>
        </thead>
        <tbody >

        {
          this.state.temp_arr.map((d) => <tr><td id="symbhover" onClick={() => this.fetchStock(d.symbol)} style={{width:"90px"}}>{d.symbol}</td><td style={{width:"240px"}}>{d.comp_name}</td>
          <td class="leftal" style={{width:"135px"}}>{d.price}</td><td class="leftal" style={{width:"145px"}}>{d.change_p}</td><td style={{width:"90px"}}><button class="btn2 leftal" onClick={this.addToWatchlist(d.symbol)}><i class="fa fa-plus"></i></button></td></tr>)
        }


        </tbody>
        </table>
        </div>
        <div class="right-column">
          <div class="chart_div">
            <div class="pltstyle">
              <h3>{title1} Stock Chart</h3>
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
                {width: 720, height: 340,plot_bgcolor:'#02717D',margin: {
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
                      <div>
                        <h3>Market Cap</h3>
                        <h4>${p.marketCap}</h4>
                      </div>
                      <div>
                        <h3>Open</h3>
                        <h4>${p.open}</h4>
                      </div>
                      <div>
                        <h3>Previous Close</h3>
                        <h4>${p.previousClose}</h4>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h3>P/E Ratio</h3>
                        <h4>{p.peRatio}</h4>
                      </div>
                      <div>
                        <h3>Low</h3>
                        <h4>${p.low}</h4>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h3>52-week High</h3>
                        <h4>${p.week52High}</h4>
                      </div>
                      <div>
                        <h3>52-week Low</h3>
                        <h4>${p.week52Low}</h4>
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
