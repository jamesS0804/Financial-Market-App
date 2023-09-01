import { useEffect } from "react"
import authenticated_api from "../utils/authenticated_api"

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
        height: "40%", 
        backgroundColor: "#1a636c99",
        border: "none",

    }
    return(
        <div className="container-fluid h-100" style={{border: "1px solid green"}}>
            <div className="card" style={card}>
                <div className="p-5">
                    <div>Welcome back, {currentUserData.first_name}!</div>
                    <div>${currentUserPortfolio.market_value}</div>
                </div>
                <div className="d-flex">
                    <div className="p-3" style={{border: "1px solid white", borderWidth: "1px 1px 0 0"}}>
                        <div>Settled Cash</div>
                        <div>${currentUserPortfolio.settled_cash}</div>
                    </div>
                    <div className="p-3" style={{border: "1px solid white", borderWidth: "1px 0 0 0"}}>
                        <div>Market Value</div>
                        <div>${currentUserPortfolio.market_value}</div>
                    </div>
                    <div className="p-3" style={{border: "1px solid white", borderWidth: "1px 0 0 1px"}}>
                        <div>Buying Power</div>
                        <div>${currentUserPortfolio.buying_power}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}