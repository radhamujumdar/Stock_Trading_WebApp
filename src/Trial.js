import React,{useState, useEffect} from 'react'
import axios from 'axios'


class Trial extends React.Component{
  constructor(props){
    super(props);
    this.state={
      top_10_stocks:['AAPL','FB','MSFT','AMZN',"IBM","TSLA","GOOGL","XOM","BAC","PYPL"],
      temp_arr:[]


    }
  }
  componentDidMount(){
  this.fetchData();
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




  render(){


    return (

      <div>
      <head>
      <link rel="stylesheet" href="index.css"></link>
      </head>
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
        this.state.temp_arr.map((d) => <tr><td>{d.symbol}</td><td>{d.comp_name}</td><td>{d.price}</td><td>{d.change_p}</td></tr>)
      }

      </tbody>
      </table>
      </div>

    )
  }
}

export default Trial
