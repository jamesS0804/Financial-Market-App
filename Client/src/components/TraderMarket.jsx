import { useState, useEffect } from "react";
import authenticated_api from "../utils/authenticated_api";

export default function MarketPage(){
    const [ stockData, setStockData ] = useState([])
    useEffect(()=>{
        getStockData()
    },[])
    const getStockData = async() => {
        try{
            const response = await authenticated_api.get("get_stored_data")
            if(response.status === 200) {
                console.log(response.data.data)
                setStockData(response.data.data)
            } else {
                console.log(response.status)
            }
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid p-2" style={{height: "100px", marginTop: "8%", marginLeft: "-5%", borderTop: "1px solid black"}}>
        <h1>Market</h1>
        <table className="container-fluid" style={{maxHeight: "50%",borderCollapse: "collapse", border: "1px solid red", overflow: "hidden"}}>
            <thead >
            <tr>
                <th id="market-name">Market</th>
                <th id="market-change">Change 1D</th>
                <th id="market-buy">Buy</th>
                <th id="market-sell">Sell</th>
                <th id="market-average-daily-volume">Average Daily Volume</th>
            </tr>
            </thead>
            <tbody className="h-100 w-100" style={{maxHeight: "100px", border: "1px solid blue", overflow: "hidden"}}>
            {stockData.length === 0 && <tr><td colSpan={5}>No Data</td></tr>}
            {
                stockData.map((stock)=>{
                    return (
                        <tr key={stock.id}>
                          <td headers="market-name">
                            <div className="d-flex flex-column">
                                <span>{stock.symbol}</span>
                                <span>{stock.name}</span>
                            </div>
                          </td>
                          <td headers="market-change">
                            <div className="d-flex flex-column">
                                <span>{stock.change}</span>
                                <span>({stock.change_percent})%</span>
                            </div>
                          </td>
                          <td headers="market-buy">
                            <span>{stock.price}</span>
                          </td>
                          <td headers="market-sell">
                            <span>{stock.price}</span>
                          </td>
                          <td headers="market-average-daily-volume">
                            <span>{stock.average_daily_volume}</span>
                          </td>
                        </tr>
                      )
                })
            }
            </tbody>
        </table>
        </div>
    );
};
