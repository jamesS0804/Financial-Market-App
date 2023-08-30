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
    return(
        <div className="cash-wallet">
            <div className="overlap-group">
              <div className="rectangle" />
              <div className="text-wrapper">Settled Cash</div>
              <div className="text-wrapper-2">Market Value</div>
              <div className="text-wrapper-3">Buying Power</div>
              <div className="text-wrapper-4">Welcome back, {currentUserData.first_name}!</div>
              <div className="text-wrapper-5">${currentUserPortfolio.market_value}</div>
              <div className="text-wrapper-6">${currentUserPortfolio.settled_cash}</div>
              <div className="text-wrapper-7">${currentUserPortfolio.buying_power}</div>
              <div className="text-wrapper-8">${currentUserPortfolio.market_value}</div>
              <img className="line" alt="Line" src="/src/assets/img/line-8.svg" />
              <img className="img" alt="Line" src="/src/assets/img/line-7.svg" />
              <img className="line-2" alt="Line" src="/src/assets/img/line-6.svg" />
            </div>
        </div>
    )
}