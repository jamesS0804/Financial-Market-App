import { useEffect, useState } from "react"
import authenticated_api from "../../utils/authenticated_api"
import logo1 from "../../assets/img/logo-1.png"
import "./TraderPortfolio.css"
import convertToProperDataAndTime from "../../utils/convertToProperDateAndTime"

export default function TraderPortfolio(props){
    const { currentUserData } = props
    const [ portfolioTransactions, setPortfolioTransactions ] = useState([])
    useEffect(()=> {
        getTransactionsData()
    },[])
    const getTransactionsData = async() => {
        console.log(currentUserData)
        try {
            const response = await authenticated_api.get(`trader/${currentUserData.id}/portfolio/transactions`)
            if(response.status === 200){
                console.log(response.data.data)
                const transactionsData = response.data.data
                setPortfolioTransactions(transactionsData)
            } else {
                console.log(response.data.status.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="container-fluid p-0" style={{overflowY: "auto", overflowX: "hidden", height: "100%", maxHeight: "873px", display: "block"}}>
            <h1 style={{fontWeight: "bold", fontSize: "2.5rem", padding: "0 1em 0 0.80em"}} className="px-3">My Portfolio</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black"}}>
                    <tr style={{fontSize: "1.5rem", fontWeight: "bold", borderBottom: "2px solid black"}}>
                        <th id="transactions-asset" style={{width: "30%", padding: "0.5em 1em"}}>Asset</th>
                        <th id="transactions-amount">Amount</th>
                        <th style={{width: "20%"}} id="transactions-price-per-share">Price Per Share</th>
                        <th id="transactions-units">Units</th>
                        <th className="text-center" id="transactions-status">Status</th>    
                    </tr>
                </thead>
                <tbody style={{overflowY: "auto"}}>
                    { portfolioTransactions.length === 0 ? 
                        <tr style={{border: "1px solid black"}}>
                            <td colSpan="5" style={{width: "100%", textAlign: "center", fontSize: "2rem"}}>
                                <div>Your Portfolio is empty</div>
                                <div> Start exploring investment opportunities by checking the market</div>
                            </td>
                        </tr>
                        :
                        portfolioTransactions.map((transaction) => {
                            return(
                                <tr key={transaction.id} style={{
                                    height: "10px", border: "1px solid black", borderWidth: "1px 0 1px 0",
                                }}>
                                    <td headers="transactions-asset" className="d-flex gap-2">
                                        <img style={{border: "2px solid black", backgroundColor: "black", borderRadius: "0.5rem", padding: "0.2em"}} alt="brand-logo-placeholder" src={logo1} width="50px" height="50px"/>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex gap-2 align-items-center" style={{fontWeight: "bold"}}>
                                                <div style={transaction.transaction_type === "BUY" ? {color: "green"} : {color: "#A73121"}}>{transaction.transaction_type}</div>
                                                <div style={{fontSize: "1.2rem"}}>{transaction.symbol}</div>
                                            </div>
                                            <div>{convertToProperDataAndTime(transaction.created_at)}</div>
                                        </div>
                                    </td>
                                    <td headers="transactions-amount">${parseFloat(transaction.amount).toFixed(2)}</td>
                                    <td headers="transactions-price-per-share">${parseFloat(transaction.price_per_share).toFixed(2)}</td>
                                    <td headers="transactions-units">{parseFloat(transaction.quantity).toFixed(2)}</td>
                                    <td headers="transactions-status" className="d-flex justify-content-center align-items-center">
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            backgroundColor: "#428E98", padding: "0.25em 1em 0.25em 1em",
                                            borderRadius: "1em", width: "fit-content", color: "white",
                                            fontWeight: "bold"
                                        }}>{transaction.status}</div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}