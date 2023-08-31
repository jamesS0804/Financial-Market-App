import { useState, useEffect } from "react";
import authenticated_api from "../utils/authenticated_api";
import { Button } from "react-bootstrap";

export default function TraderMarket(props){
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
        <div className="container-fluid p-0" style={{overflowY: "scroll", overflowX: "hidden", maxHeight: "873px", display: "block"}}>
            <h1 className="px-3">Market</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black",}}>
                    <tr>
                        <th id="market-name" style={{width: "30%", padding: "0.5em 1em"}}>Market</th>
                        <th id="market-change">Change 1D</th>
                        <th id="market-buy">Buy</th>
                        <th id="market-sell">Sell</th>
                        <th id="market-average-daily-volume">Average Daily Volume</th>
                    </tr>
                </thead>
                <tbody style={{overflowY: "auto"}}>
                    {stockData.length === 0 && <tr><td colSpan={5}>No Data</td></tr>}
                    {
                        stockData.map((stock)=>{
                            return (
                                <tr key={stock.id} style={{border: "1px solid black", borderWidth: "1px 0 1px 0"}}>
                                <td headers="market-name" style={{width: "30%", padding: "0.5em 1em"}}>
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
                                <td headers="market-buy" >
                                    <Button style={{position: "relative", width: "55%", paddingLeft: "2em"}}>
                                        <span style={{
                                            position: "absolute", left: 0, top: 0, height: "100%",
                                            display: "flex", justifyContent: "center", alignItems: "center",
                                            borderRadius: "0.3em 0 0 0.3em", backgroundColor: "#005E69",
                                            padding: "0.5em"
                                        }}>
                                            <span>B</span>
                                        </span>
                                        <span style={{}}>{stock.price}</span>
                                    </Button>
                                </td>
                                <td headers="market-sell">
                                <Button style={{position: "relative", width: "55%", paddingLeft: "2em"}}>
                                        <span style={{
                                            position: "absolute", left: 0, top: 0, height: "100%",
                                            display: "flex", justifyContent: "center", alignItems: "center",
                                            borderRadius: "0.3em 0 0 0.3em", backgroundColor: "#005E69",
                                            padding: "0.5em"
                                        }}>
                                            <span>S</span>
                                        </span>
                                        <span style={{}}>{stock.price}</span>
                                    </Button>
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
