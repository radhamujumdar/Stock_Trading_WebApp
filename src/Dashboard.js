import React from 'react';


class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
       top_10_stocks:['AAPL','FB','MSFT','AMZN',"IBM","TSLA","GOOGL","XOM","BAC","PYPL"],
       list_prices:[],
       list_symbols:[],
       list_open:[],
       list_close:[],
       list_high:[],
       list_low:[],
       list_changep:[]
    }
  }

componentDidMount(){
this.fetchData();
    }

async fetchData(){
   let lprice=[];
   let sym=[];
   let open_l=[];
   let close_l=[];
   let high_l=[];
   let low_l=[];
   let changep_l=[];

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
          console.log(data);
           lprice.push(data['latestPrice']);
           sym.push(data['symbol']);
           open_l.push(data['open']);
           close_l.push(data['close']);
           high_l.push(data['high']);
           low_l.push(data['low']);
           changep_l.push(data['changePercent']);

     }
    )
  }
  pointertothis.setState(
    {

      list_prices:lprice,
      list_symbols:sym,
      list_open:open_l,
      list_close:close_l,
      list_high:high_l,
      list_low:low_l,
      list_changep:changep_l

    }
  );
console.log(lprice);
return lprice;
}

render(){
  return(
    <div>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
      <link rel="stylesheet" href="index.css"></link>
    </head>
    <table class="stocklist">
    <div>
    <thead>
    <tr>
    <th>Symbol</th>
    <th>Latest Price ($)</th>
    <th>Open ($)</th>
    <th>Close ($)</th>
    <th>High ($)</th>
    <th>Low ($)</th>
    <th>Change Percent</th>
    </tr>
    </thead>
    <tbody>
    <td>
      {
        this.state.list_symbols.map((symb)=>(
          <li style={{ listStyleType: "none" }}>{symb}</li>
        ))
      }

    </td>
    <td>
      {
        this.state.list_prices.map((price)=>(
          <li style={{ listStyleType: "none" }}>{price}</li>
        ))
      }
      </td>
      <td>
      {
        this.state.list_open.map((op)=>(
          <li style={{ listStyleType: "none" }}>{op}</li>
        ))
      }
      </td>
      <td>
      {
        this.state.list_close.map((cl)=>(
          <li style={{ listStyleType: "none" }}>{cl}</li>
        ))
      }
      </td>
      <td>
      {
        this.state.list_high.map((hi)=>(
          <li style={{ listStyleType: "none" }}>{hi}</li>
        ))
      }
      </td>
      <td>
      {
        this.state.list_low.map((lo)=>(
          <li style={{ listStyleType: "none" }}>{lo}</li>
        ))
      }
      </td>
      <td>
        {
          this.state.list_changep.map((chp)=>(
            <li style={{ listStyleType: "none" }}>{chp}</li>
          ))
        }
      </td>
      </tbody>
      </div>
      </table>
      </div>


  )
}
}

export default Dashboard
