import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Search_Stock from './Search_Stock.js';

class Trial extends React.Component{
  constructor(props){
    super(props);
    this.state={
      top_10_stocks:['AAPL','FB','MSFT','AMZN',"IBM","TSLA","GOOGL","XOM","BAC","PYPL"],
      //ap_info:[{}],//symbol:"",comp_name:"",change_p:"",chng:""}],
      temp_arr:[]
      //filteredStocks:'',

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

//console.log(this.state.symbol);
// Search_stock = () => () => {
//
//   const [stocks, setStocks] = useState([]);
//   const [search, setSearch] = useState('');
//
//   useEffect(() => {
//     axios
//       .get(
//         'https://cloud.iexapis.com/beta/ref-data/symbols?token=pk_042790e0f6f844c1a08763c9a03dc892'
//       )
//       .then(res => {
//         setStocks(res.data);
//         console.log(res.data);
//       })
//       .catch(error => console.log(error));
//   }, []);
//
//   const filteredStocks = stocks.filter(stock =>
//     stock.symbol.toLowerCase().includes(search.toLowerCase())
//   );
//
//
//   const handleChange = e => {
//   setSearch(e.target.value);
//   }
//
// }



  render(){
    // const listItems = this.state.temp_arr.map((d) => <tr>{d.symbol},{d.comp_name},{d.price},{d.change_p}</tr>);
    //const searchHook = this.Search_stock();

    return (
      // <div>
      // <div className='stock-app'>
      //   <div className='stock-search'>
      //     <h1 className='stock-text'>Search a stock</h1>
      //     <form>
      //     <input type='text' placeholder='Search' className='stock-input' onChange={this.handleChange}/>
      //     </form>
      //   </div>
      //   {this.filteredStocks.map(stock=>{
      //     return(
      //       <Search_Stock
      //         name={stock.name}
      //         symbol={stock.symbol}
      //         />
      //     )
      //   })}
      // </div>
      // </div>
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
      //</div>
    )
  }
}

export default Trial
//export default temp_arr
