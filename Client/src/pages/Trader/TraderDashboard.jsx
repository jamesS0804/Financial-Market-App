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
        <div>
            <h1>TraderDashboard</h1>
            <div>
                <h1>Welcome back, !</h1>
                <div>$</div>
                <div>
                    <div>
                        <div>$</div>
                        <div>SETTLED CASH</div>
                    </div>
                    <div>
                        <div>$</div>
                        <div>MARKET VALUE</div>
                    </div>
                    <div>
                        <div>$</div>
                        <div>BUYING POWER</div>
                    </div>
                </div>
            </div>
        </div>
    )
}