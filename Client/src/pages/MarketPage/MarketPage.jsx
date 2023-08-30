import { useState } from "react";
import "./style.css";

export default function MarketPage(){
  const [ stockData, setStockData ] = useState([])
  const getStockData = async() => {
    
  }
  return (
    <div className="container-fluid p-2" style={{height: "80%", marginTop: "8%", marginLeft: "-5%", borderTop: "1px solid black"}}>
      <h1>Market</h1>
      <table className="container-fluid h-100" style={{borderCollapse: "collapse", border: "1px solid red"}}>
        <thead >
          <tr>
            <th id="market-name">Market</th>
            <th id="market-change">Change 1D</th>
            <th id="market-buy">Buy</th>
            <th id="market-sell">Sell</th>
            <th id="market-limit">Limit</th>
          </tr>
        </thead>
        <tbody className="h-100 w-100" style={{border: "1px solid blue"}}>
          {stockData.length === 0 && <tr><td colSpan={5}>No Data</td></tr>}
        </tbody>
      </table>
    </div>
  );
};
