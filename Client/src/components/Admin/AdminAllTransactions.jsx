import { useEffect, useState } from "react"
import authenticated_api from "../../utils/authenticated_api"
import convertToProperDateAndTime from "../../utils/convertToProperDateAndTime"
import logo1 from "../../assets/img/logo-1.png"

export default function AdminAllTransactions(){
    const [ allTransactions, setAllTransactions ] = useState([])

    useEffect(()=> {
        getAllTransactionsData()
    },[])
    const getAllTransactionsData = async() => {
        try {
            const response = await authenticated_api.get("admin/view_all_transactions")
            if(response.status === 200){
                console.log(response.data.data)
                const allTransactionsData = response.data.data
                setAllTransactions(allTransactionsData)
            } else {
                console.log(response.data.status.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="container-fluid p-0" style={{overflowY: "auto", overflowX: "hidden", height: "100%", maxHeight: "873px", display: "block", fontWeight: "bold", fontSize: "0.9rem"}}>
            <h1 className="px-3" style={{fontWeight: "bold", fontSize: "2.5rem"}}>All Transactions</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black"}}>
                    <tr style={{fontSize: "1.5rem", fontWeight: "bold", borderBottom: "2px solid black"}}>
                        <th style={{padding: "0 0 0 5em", width: "20%"}} id="transactions-trader">Trader</th>
                        <th className="text-center" id="transactions-asset">Asset</th>
                        <th className="text-center" id="transactions-amount">Amount</th>
                        <th className="text-center" id="transactions-price-per-share">Price Per Share</th>
                        <th className="text-center" id="transactions-units">Units</th>
                        <th className="text-center" id="transactions-status">Status</th>
                        <th className="text-center" id="transactions-created-at">Created at</th>
                    </tr>
                </thead>
                <tbody style={{overflowY: "auto"}}>
                    { allTransactions.length === 0 ? 
                        <tr style={{border: "1px solid black"}}>
                            <td colSpan="7" style={{width: "100%", textAlign: "center"}}>
                                <div>No Transactions made</div>
                            </td>
                        </tr>
                        :
                        allTransactions.map((transaction) => {
                            return(
                                <tr key={transaction.id} style={{
                                    height: "10px", border: "1px solid black", borderWidth: "1px 0 1px 0",
                                }}>
                                    <td headers="transactions-trader" className="py-0 px-3" style={{height: "15%"}}>
                                        <div style={{padding: "2rem"}}>{transaction.trader}</div>
                                    </td>
                                    <td headers="transactions-asset" className="d-flex gap-2 justify-content-center">
                                        <img style={{border: "2px solid black", backgroundColor: "black", borderRadius: "0.5rem", padding: "0.2em"}} alt="brand-logo-placeholder" src={logo1} width="50px" height="50px"/>
                                        <div>
                                            <div className="d-flex gap-1 align-items-center">
                                                <span style={transaction.transaction_type === "BUY"? {color: "green"} : {color: "red"}}>{transaction.transaction_type}</span> 
                                                <span style={{fontWeight: "bold", fontSize: "1.2rem"}}>{transaction.symbol}</span>
                                            </div>
                                            <div>{convertToProperDateAndTime(transaction.created_at)}</div>
                                        </div>
                                    </td>
                                    <td headers="transactions-amount" className="text-center">${parseFloat(transaction.amount).toFixed(2)}</td>
                                    <td headers="transactions-price-per-share" className="text-center">${parseFloat(transaction.price_per_share).toFixed(2)}</td>
                                    <td headers="transactions-units" className="text-center">{parseFloat(transaction.quantity).toFixed(2)}</td>
                                    <td headers="transactions-status" className="d-flex justify-content-center">
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            backgroundColor: "#428E98", padding: "0.25em 1em 0.25em 1em",
                                            borderRadius: "1em", width: "fit-content", color: "white",
                                            fontWeight: "bold"
                                        }}>{transaction.status}</div>
                                    </td>
                                    <td headers="transactions-actions" className="text-center">{convertToProperDateAndTime(transaction.created_at)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}