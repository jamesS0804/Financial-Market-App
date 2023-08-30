import { useEffect } from "react"
import authenticated_api from "../../utils/authenticated_api"

export default function TraderDashboard(props){
    const { api, currentUserData } = props
    useEffect(()=>{
        getUserPortfolio()
    },[])
    const getUserPortfolio = async() => {
        console.log(currentUserData)
        try {
            const response = await authenticated_api.get(`trader/${currentUserData.id}/portfolio`)
            if(response.status === 200) {
                console.log(response.data)
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
              <div className="text-wrapper-4">Welcome back, James!</div>
              <div className="text-wrapper-5">$00.00</div>
              <div className="text-wrapper-6">$00.00</div>
              <div className="text-wrapper-7">$00.00</div>
              <div className="text-wrapper-8">$00.00</div>
              <img className="line" alt="Line" src="/src/assets/img/line-8.svg" />
              <img className="img" alt="Line" src="/src/assets/img/line-7.svg" />
              <img className="line-2" alt="Line" src="/src/assets/img/line-6.svg" />
            </div>
        </div>
    )
}