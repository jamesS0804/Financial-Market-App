import { useEffect, useState } from "react"
import authenticated_api from "../../utils/authenticated_api"

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
        <div className="container-fluid p-0" style={{overflowY: "auto", overflowX: "hidden", height: "100%", maxHeight: "873px", display: "block", fontWeight: "bold"}}>
            <h1 className="px-3">All Transactions</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black"}}>
                    <tr>
                        <th id="transactions-trader">Trader</th>
                        <th id="transactions-asset" style={{width: "30%", padding: "0.5em 1em"}}>Asset</th>
                        <th id="transactions-amount">Amount</th>
                        <th id="transactions-price-per-share">Price Per Share</th>
                        <th id="transactions-units">Units</th>
                        <th id="transactions-status">Status</th>
                        <th id="transactions-created-at">Created at</th>
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
                                    <td>{transaction.trader}</td>
                                    <td headers="transactions-asset">
                                        <div>{transaction.transaction_type} {transaction.symbol}</div>
                                        <div>{transaction.created_at}</div>
                                    </td>
                                    <td headers="transactions-amount">${transaction.amount}</td>
                                    <td headers="transactions-price-per-share">${transaction.price_per_share}</td>
                                    <td headers="transactions-units">{transaction.quantity}</td>
                                    <td headers="transactions-status">
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            backgroundColor: "#428E98", padding: "0.25em 1em 0.25em 1em",
                                            borderRadius: "1em", width: "fit-content", color: "white",
                                            fontWeight: "bold"
                                        }}>{transaction.status}</div>
                                    </td>
                                    <td headers="transactions-actions">{transaction.created_at}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}