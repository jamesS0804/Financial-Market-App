import { useEffect, useState } from "react"

export default function TraderPortfolio(){
    const [ portfolioTransactions, setPortfolioTransactions ] = useState([])
    return(
        <div className="container-fluid p-0" style={{border: "1px solid red", overflowY: "auto", overflowX: "hidden", height: "100%", maxHeight: "873px", display: "block"}}>
            <h1 className="px-3">My Portfolio</h1>
            <table className="container-fluid" style={{borderCollapse: "collapse", border: "2px solid green", height: "790px"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black"}}>
                    <tr>
                        <th id="market-name" style={{width: "30%", padding: "0.5em 1em"}}>Asset</th>
                        <th id="market-change">Amount</th>
                        <th id="market-buy">Units</th>
                        <th id="market-sell">Status</th>
                        <th id="market-average-daily-volume">Actions</th>
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}