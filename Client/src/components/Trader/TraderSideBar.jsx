import "../../components/Trader/TraderSideBar.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authenticated_api from '../../utils/authenticated_api'
import logo1 from "../../assets/img/logo-1.png"

export default function TraderSideBar(props){
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
        <div className="d-flex flex-column h-100" style={{backgroundColor: "#1F2039", width: "20%"}}>
            <div className="d-flex align-items-center px-3 py-3 gap-3" style={{marginTop: "5%"}}>
                <img style={{width: "20%", height: "90%"}} alt="Logo" src={logo1}/>
                <h1 className="brand-name">LEO TRADING</h1>
            </div>
            <div className="d-flex flex-column gap-3" style={{color: "#4C95A9", marginTop: "10%"}}>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("DASHBOARD")}>Dashboard</button>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("MARKET")}>Market</button>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("PORTFOLIO")}>Portfolio</button>
            </div>
            <Link to="/" style={{margin: "auto 1em 5% 1em"}}>
                <Button onClick={logout} style={{
                    backgroundColor: "red", border:"none", width: "100%"
                }}>Logout</Button>
            </Link>
        </div>
    )
}