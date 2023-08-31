import { useEffect, useState } from "react"
import authenticated_api from "../utils/authenticated_api"
import { Button } from "react-bootstrap"
import "./TraderPortfolio.css"

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
        <div className="container-fluid p-0" style={{border: "1px solid red", overflowY: "auto", overflowX: "hidden", height: "100%", maxHeight: "873px", display: "block"}}>
            <h1 className="px-3">My Portfolio</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse", border: "2px solid green"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black"}}>
                    <tr>
                        <th id="transactions-asset" style={{width: "30%", padding: "0.5em 1em"}}>Asset</th>
                        <th id="transactions-amount">Amount</th>
                        <th id="transactions-units">Units</th>
                        <th id="transactions-status">Status</th>
                        <th id="transactions-actions">Actions</th>
                    </tr>
                </thead>
                <tbody style={{overflowY: "auto"}}>
                    { portfolioTransactions.length === 0 ? 
                        <tr style={{border: "1px solid black"}}>
                            <td className="d-flex flex-column justify-content-center align-items-center h-100" colSpan="5" style={{border: "1px solid red"}}>
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
                                    <td headers="transactions-asset">
                                        <div>{transaction.transaction_type} {transaction.symbol}</div>
                                        <div>{transaction.created_at}</div>
                                    </td>
                                    <td headers="transactions-amount">${transaction.price}</td>
                                    <td headers="transactions-units">{transaction.quantity}</td>
                                    <td headers="transactions-status">
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            backgroundColor: "#428E98", padding: "0.25em 1em 0.25em 1em",
                                            borderRadius: "1em", width: "fit-content", color: "white",
                                            fontWeight: "bold"
                                        }}>{transaction.status}</div>
                                    </td>
                                    <td headers="transactions-actions">
                                        <Button>Cancel</Button>
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