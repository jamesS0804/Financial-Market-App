import { useEffect, useState } from "react"
import authenticated_api from "../../utils/authenticated_api"
import logo1 from "../../assets/img/logo-1.png"

export default function TraderDashboard(props){
    const { 
        api,
        currentUserData,
        currentUserPortfolio,
        setCurrentUserPortfolio,
        chosenSidebarOption
    } = props
    const [ currentUserPortfolioUnits, setCurrentUserPortfolioUnits ] = useState([])
    useEffect(()=>{
        getUserPortfolio()
        getUserPortfolioUnits()
    },[])
    useEffect(()=>{
        getUserPortfolioUnits()
    }, [chosenSidebarOption])
    const getUserPortfolio = async() => {
        try {
            const response = await authenticated_api.get(`trader/${currentUserData.id}/portfolio`)
            if(response.status === 200) {
                console.log(response.data.data)
                const portfolio_data = response.data.data
                setCurrentUserPortfolio({
                    id: portfolio_data.id,
                    settled_cash: portfolio_data.settled_cash,
                    buying_power: portfolio_data.buying_power,
                    market_value: portfolio_data.market_value
                })
            } else {
                console.log(response.status)
            }
        } catch(error) {
            console.log(error)
        }
    }
    const getUserPortfolioUnits = async() => {
        try {
            const response = await authenticated_api.get(`trader/${currentUserData.id}/portfolio/all_portfolio_units`)
            if(response.status === 200) {
                console.log(response.data.data)
                const portfolio_units = response.data.data
                setCurrentUserPortfolioUnits(portfolio_units)
            } else {
                console.log(response.status)
            }
        } catch(error) {
            console.log(error)
        }
    }
    const card = {
        marginTop: "5%", 
        marginLeft: "2%", 
        width: "55%", 
        height: "58%", 
        backgroundColor: "#1a636c99",
        border: "none",
    }
    return(
        <div className="container-fluid d-flex gap-5 h-100">
            <div className="card d-flex justify-content-center align-items-center" style={card}>
                <div className="">
                    <div style={{padding: "0.5em 0.5em 0 0.5em", fontSize: "4rem", fontWeight: "bold"}}>Welcome back, {currentUserData.first_name}!</div>
                    <div style={{color: "#8EECF8",padding: "0 0.5em 0.2em 0.5em", fontSize: "6rem", fontWeight: "bold"}}>${currentUserPortfolio.market_value}</div>
                </div>
                <div className="d-flex justify-content-space-between w-100" style={{height: "50%", fontSize: "1.25rem"}}>
                    <div className="flex-fill p-2 d-flex justify-content-center align-items-center flex-column" style={{border: "1px solid #83D9E3", borderWidth: "1px 1px 0 0"}}>
                        <div style={{fontSize: "2.5rem"}}>${currentUserPortfolio.settled_cash}</div>
                        <div>Settled Cash</div>
                    </div>
                    <div className="flex-fill p-2 d-flex justify-content-center align-items-center flex-column" style={{border: "1px solid #83D9E3", borderWidth: "1px 0 0 0"}}>
                        <div style={{fontSize: "2.5rem"}}>${currentUserPortfolio.market_value}</div>
                        <div>Market Value</div>
                    </div>
                    <div className="flex-fill p-2 d-flex justify-content-center align-items-center flex-column" style={{border: "1px solid #83D9E3", borderWidth: "1px 0 0 1px"}}>
                        <div style={{fontSize: "2.5rem"}}>${currentUserPortfolio.buying_power}</div>
                        <div>Buying Power</div>
                    </div>
                </div>
            </div>
            <div className="flex-fill p-2 d-flex flex-column gap-2">
                <h1 style={{fontWeight: "bold", width: "100%", textAlign: "left"}}>My Stocks</h1>
                {  }
                {   currentUserPortfolioUnits.length === 0 ?
                    <h1 style={{width: "100%", height: "100%"}}>No Stock</h1>
                    :
                    currentUserPortfolioUnits.map((portfolio_unit)=>{
                        return(
                            <div style={{width: "100%", minHeight: "13%"}}>
                                <div className="d-flex align-items-center gap-0" style={{height: "100%", border: "1px solid #44929C", backgroundColor: "#44929C", borderRadius: "1rem"}}>
                                    <div className="p-2 px-4 d-flex gap-2 align-items-center" style={{width: "50%"}}>
                                        <img style={{border: "2px solid black", backgroundColor: "black", borderRadius: "0.5rem", padding: "0.2em", minWidth: "50px", minHeight: "50px"}} alt="brand-logo-placeholder" src={logo1} width="50px" height="50px"/>
                                        <div className="d-flex gap-1 flex-column px-2 py-1">
                                            <div style={{fontWeight: "bold", fontSize: "1.2rem"}}>{portfolio_unit.symbol}</div>
                                            <div style={{fontSize: "1rem"}}>{portfolio_unit.company_name}</div>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-5" style={{marginLeft: "10%",paddingRight: "2em", width: "60%", fontSize: "0.8rem"}}>
                                        <div className="d-flex flex-column">
                                            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.3rem"}}>${parseFloat(portfolio_unit.price_per_share).toFixed(2)}</div>
                                            <div style={{textAlign: "center"}}>Price per share</div> 
                                        </div>
                                        <div>
                                            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.3rem"}}>{parseFloat(portfolio_unit.quantity).toFixed(2)}</div>
                                            <div style={{textAlign: "center"}}>Quantity Owned</div>
                                        </div>
                                        <div>
                                            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.3rem"}}>${parseFloat(portfolio_unit.amount).toFixed(2)}</div>
                                            <div style={{textAlign: "center"}}>Amount Owned</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}