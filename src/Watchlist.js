import React from 'react'
import {db, auth} from './firebase'
import firebase from 'firebase';
import Abc from './Abc';

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            temp_arr:[]
        }    
    }
    
    componentDidMount() {
        console.log('mounted');
        db.collection('Watchlist')
        .get()
        .then(snapshot => {
            const stocks = []
            snapshot.forEach( doc => {
                const data = doc.data()
                    stocks.push(data)
            })
            this.setState({ stocks })
            console.log(snapshot);
            console.log(this.state.stocks);
        }).catch( error => console.log(error) )
    }


    // async fetchData(){
    //   console.log("abc", this.state.stocks);
    //     let temp_arr = [];
    //     const pointertothis=this;
    //     for(let i=0;i<this.state.stocks.length;i++){
    //       const API_token = `https://cloud.iexapis.com/stable/stock/${this.state.stocks[i]}/quote?token=pk_042790e0f6f844c1a08763c9a03dc892`;
    //       await fetch(API_token)
    //       .then(
    //         function(response){
    //           return response.json();
    //         }
    //       )
    //       .then(
    //         function(data){
    
    //           temp_arr.push({symbol:data['symbol'], comp_name:data['companyName'], price:data['latestPrice'], change_p:data['changePercent'],marketCap:data['marketCap']});
    
    //         }
    
    //       )
    //     }
        
        
    //     pointertothis.setState(
    //       {
    //         temp_arr: temp_arr
    
    //       }
    //     );
    //     console.log(temp_arr);
    //   }

    render() {
      console.log("abc", this.state.stocks);
        return (
            <div className="App">
                <h1 style={{color:"white"}}>Watchlist</h1>
                {
                  this.state.stocks.map(({symbol, companyName}, index) => (<Abc key={index} symbol={symbol} companyName={companyName}/>))
                        
                    // this.state.temp_arr &&
                    // this.state.temp_arr.map( stock => {
                    //     return (
                    //         <div>
                    //             <p>{stock.comp_name}</p>
                    //             <p>{stock.symbol}</p>
                    //         </div>
                    //     )
                    // })
                }
            </div>
        )
    }
}

export default Watchlist
