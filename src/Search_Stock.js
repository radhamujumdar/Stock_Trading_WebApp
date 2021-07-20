import React from 'react';
import './Search_Stock.css';

const Search_Stock = ({
  name,
  symbol

}) => {
  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin'>

          <h1>{name}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>
      </div>
    </div>
  );

        //<div className='coin-data'>
          //<p className='coin-price'>${price}</p>
          //<p className='coin-volume'>${volume.toLocaleString()}</p>

          /*{priceChange < 0 ? (
            <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
          )}*/

          /*<p className='coin-marketcap'>
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>*/

}
export default Search_Stock;
