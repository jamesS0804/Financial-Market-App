import { useState, useEffect } from "react";
import authenticated_api from "../../utils/authenticated_api";
import { Button } from "react-bootstrap";
import StockModal from "./StockModal";
import logo from "../../assets/img/logo-1.png"
import "./TraderMarket.css"

export default function TraderMarket(props){
    const { 
        currentUserPortfolio, 
        setAuthAlert, 
        isLoading, 
        setIsLoading, 
        renderAlertVariant,
        authAlert
    } = props
    const [ stockData, setStockData ] = useState([])
    const [ showStockModal, setShowStockModal ] = useState(false)
    const [ marketStockData, setMarketStockData ] = useState({
        symbol: "",
        price_per_share: "",
        transaction_type: "",
        change: "",
        change_percent: ""
    })
    useEffect(()=>{
        getStockData()
    },[])
    const openStockModal = (symbol, price, transaction_type, change, change_percent) => {
        setMarketStockData({
            symbol: symbol,
            price_per_share: parseFloat(price),
            transaction_type: transaction_type,
            change: change,
            change_percent: change_percent
        })
        setShowStockModal(true)
    }
    const getStockData = async() => {
        try{
            const response = await authenticated_api.get("get_stored_data")
            if(response.status === 200) {
                const allStockData = response.data.data
                setStockData(allStockData)
            } else {
                console.log(response.status)
            }
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid p-0" style={{overflowY: "scroll", overflowX: "hidden", maxHeight: "873px", display: "block"}}>
            <StockModal 
                showStockModal={showStockModal}
                setShowStockModal={setShowStockModal}
                marketStockData={marketStockData}
                setMarketStockData={setMarketStockData}
                currentUserPortfolio={currentUserPortfolio}
                setAuthAlert={setAuthAlert}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                renderAlertVariant={renderAlertVariant}
                authAlert={authAlert}
            />
            <h1 style={{fontWeight: "bold", fontSize: "2.5rem", padding: "0 1em 0 0.80em"}}>Stock Market</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse"}}>
                <thead className="sticky-header">
                    <tr style={{fontSize: "1.5rem", fontWeight: "bold", borderBottom: "2px solid black"}}>
                        <th style={{width: "25%", padding: "0 0 0 1.5em"}} id="market-name">Market</th>
                        <th className="p-3 text-center" id="market-change">Change (1D)</th>
                        <th className="p-3 text-center" id="market-buy">Buy</th>
                        <th className="p-3 text-center" id="market-sell">Sell</th>
                        <th className="p-3 text-center" id="market-average-daily-volume">Average Daily Volume</th>
                    </tr>
                </thead>
                <tbody style={{overflowY: "auto"}}>
                    {stockData.length === 0 && <tr><td colSpan={5}>No Data</td></tr>}
                    {
                        stockData.map((stock)=>{
                            return (
                                <tr key={stock.id} style={{border: "1px solid black", borderWidth: "0 0 1px 0"}}>
                                    <td headers="market-name" className="d-flex gap-3 align-items-center h-100" style={{padding: "0", margin: "1rem 0rem 0rem 2rem"}}>
                                        <img style={{border: "2px solid black", backgroundColor: "black", borderRadius: "0.5rem", padding: "0.2em"}} alt="brand-logo-placeholder" src={logo} width="50px" height="50px"/>
                                        <div className="d-flex flex-column">
                                            <span style={{fontWeight: "bold", fontSize: "1.35rem"}}>{stock.symbol}</span>
                                            <span style={{fontSize: "1.1rem"}}>{stock.company_name}</span>
                                        </div>
                                    </td>
                                    <td headers="market-change">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <span style={
                                                stock.change > 0 ? {color: "green", fontSize: "1.5rem", fontWeight: "bold"} : {color: "#A73121", fontSize: "1.5rem", fontWeight: "bold"}
                                            }>{parseFloat(stock.change_percent).toFixed(2)}%</span>
                                            <span style={
                                                stock.change > 0 ? {color: "green"} : {color: "#A73121"}
                                            }>({parseFloat(stock.change).toFixed(4)})</span>
                                        </div>
                                    </td>
                                    <td headers="market-buy" style={{width: "12%"}}>
                                        <Button onClick={()=>openStockModal(stock.symbol, stock.price, "BUY", stock.change, stock.change_percent)} 
                                            style={{position: "relative", width: "100%", paddingLeft: "2em", border: "none"}}>
                                            <span style={{
                                                position: "absolute", left: 0, top: 0, height: "100%",
                                                display: "flex", justifyContent: "center", alignItems: "center",
                                                borderRadius: "0.3em 0 0 0.3em", backgroundColor: "#005E69",
                                                padding: "0.5em"
                                            }}>
                                                <span>B</span>
                                            </span>
                                            <span>{stock.price}</span>
                                        </Button>
                                    </td>
                                    <td headers="market-sell" style={{width: "12%"}}>
                                        <Button onClick={()=>openStockModal(stock.symbol, stock.price, "SELL", stock.change, stock.change_percent)} 
                                            style={{position: "relative", width: "100%", paddingLeft: "2em", border: "none"}}>
                                            <span style={{
                                                position: "absolute", left: 0, top: 0, height: "100%",
                                                display: "flex", justifyContent: "center", alignItems: "center",
                                                borderRadius: "0.3em 0 0 0.3em", backgroundColor: "#005E69",
                                                padding: "0.5em"
                                            }}>
                                                <span>S</span>
                                            </span>
                                            <span>{stock.price}</span>
                                        </Button>
                                    </td>
                                    <td headers="market-average-daily-volume" className="d-flex justify-content-center align-items-center">
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
