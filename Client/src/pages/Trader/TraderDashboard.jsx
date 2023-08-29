import { useEffect } from "react"

export default function TraderDashboard(props){
    const { api } = props
    useEffect(()=>{
        getUserPortfolio()
    },[])
    const getUserPortfolio = async() => {
        try {
            const response = await api.get("signup", {
                
            })
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