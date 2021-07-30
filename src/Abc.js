import { useEffect, useState } from "react";

const Abc = props => {
    let temp_arr=[];
    const {companyName, symbol, } = props;
    const [appState, setAppState ] = useState({})
    useEffect(() => {
        const API_token = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_042790e0f6f844c1a08763c9a03dc892`;
        fetch(API_token)
          .then(
            function(response){
                
                return response.json();
              }
          )
          .then(
            function(data){
                console.log("vdhsb", data);
                temp_arr.push({symbol:data['symbol'], comp_name:data['companyName'], price:data['latestPrice'], change_p:data['changePercent'],marketCap:data['marketCap']});
                setAppState(data)
                console.log("Temp", temp_arr);
            }
          )
    }, [])
    
    console.log("rutuja", props);
    return (
        <>
            <p style={{color:"white"}}>{symbol}</p>
            <p style={{color:"white"}}>{companyName}</p>
        </>
    );
}

export default Abc;