import "../TraderSideBar.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authenticated_api from "../../utils/authenticated_api"

export default function AdminSidebar(props){
    const { setChosenSidebarOption } = props

    const logout = async() => {
        try {
            const response = await authenticated_api.delete("logout")
            if(response.status === 200){
                console.log(response)
                sessionStorage.clear()
            }else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="d-flex flex-column h-100" style={{backgroundColor: "#1F2039", width: "414px"}}>
            <div className="d-flex align-items-center px-3 py-3 gap-3">
                <img className="logo-2" alt="Logo" src="/src/assets/img/logo-1.png"/>
                <div className="text-wrapper-11">LEO TRADING</div>
            </div>
            <div className="d-flex flex-column gap-3" style={{color: "#4C95A9", marginTop: "30%"}}>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("TRADERS")}>Traders</button>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("TRANSACTIONS")}>Transactions</button>
            </div>
            <Link to="/" style={{margin: "auto 1em 5% 1em"}}>
                <Button onClick={logout} style={{
                    backgroundColor: "red", border:"none", width: "100%"
                }}>Logout</Button>
            </Link>
        </div>
    )
}