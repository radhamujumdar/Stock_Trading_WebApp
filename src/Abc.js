import { useEffect, useState } from "react";

const Abc = props => {
    
    const {companyName, symbol } = props;
    const [appState, setAppState ] = useState({companyName, symbol})
    useEffect(() => {
        let temp_arr=[];
        const API_token = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_fa109b03b4aa44088db504872ebef4f3 `;
        fetch(API_token)
          .then(
            function(response){
                return response.json();
              }
          )
          .then(
            function(data){
                // console.log("vdhsb", data);
                temp_arr.push({symbol:data['symbol'], companyName:data['companyName'], latestPrice:data['latestPrice'], changePercent:data['changePercent'],marketCap:data['marketCap']});
                setAppState(data)
                console.log("temp", temp_arr);
            }
          )
    }, [])
    
    
    console.log("rutuja", props);
    return (
        <>
          {/* <div class="sc"> */}
            <head>
                <link rel="stylesheet" href="Watchlist.css"></link>
                <link rel="stylesheet" href="Trial.css"></link>
            </head>
            
            <div class="outer">
                <div class="cards">

                    <div>
                      <div class="alignment3">
                      <p class="font3">{appState.companyName}</p>
                        
                      </div>
                      <div>

                      <p class="font4">{appState.latestPrice}</p>
                      
                      </div>
                      </div>
                      <div>
                      <div class="alignment3">
                      <p class="font5">{appState.symbol}</p>
                        </div>
                        <div class="changeh"><p class="font6">{appState.change}</p>
                            
                            {
                            appState.changePercent < 0 ? (
                                <p class="font6 red2">{parseFloat(appState.changePercent*100).toFixed(2)}% <span>&#x2193;</span></p>
                              ):<p class="font6 green2">{parseFloat(appState.changePercent*100).toFixed(2)}% <span>&#x2191;</span></p>
                            }                        
                        </div>
                        
                      </div>
                    </div>
                  </div>
            {/* </div> */}
            
        </>
    );
}

export default Abc;