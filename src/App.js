import logo from './logo.svg';
import './App.css';
import Stock from './Stock.js';
import Dashboard from './Dashboard.js';
import Trial from './Trial.js';
//import {temp_arr} from './Trial.js';
import React,{Component,useState} from 'react';


function App() {
  const [searchTerm,setSearchTerm]=useState('');
  const temp = new Trial()
  temp.fetchData();
  return (
    <div className="App">
      <input
        type='text'
        placeholder='Search'
        onChange={(event)=>{
          setSearchTerm(event.target.value);
        }}
        />
        {temp.temp_arr.filter((val)=>{
          if(searchTerm==""){
            return val
          }else if (val.symbol.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }
        }).map((val,key)=>{
          return(
            <div key={key}>
              <p>{val.symbol}</p>
              </div>
          );
        })
        }
          <Trial></Trial>

    </div>
  );
}

export default App;
