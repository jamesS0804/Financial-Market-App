import { useEffect } from "react"
import authenticated_api from "../../utils/authenticated_api"

export default function TraderDashboard(props){
    const { 
        api,
        currentUserData,
        currentUserPortfolio,
        setCurrentUserPortfolio
    } = props
    useEffect(()=>{
        getUserPortfolio()
    },[])
    const getUserPortfolio = async() => {
        console.log(currentUserData)
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
    const card = {
        marginTop: "5%", 
        marginLeft: "5%", 
        width: "50%", 
        height: "50%", 
        backgroundColor: "#1a636c99",
        border: "none"
    }
    return(
        <div className="container-fluid">
            <div className="card" style={card}>
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
        </div>
    )
}