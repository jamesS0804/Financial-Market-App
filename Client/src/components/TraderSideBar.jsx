import { Button } from 'react-bootstrap'

export default function TraderSideBar(props){
    const { setChosenSidebarOption } = props
    const sideBarButtonStyle = {
        backgroundColor: "#093F5A",
        fontSize: "2rem", 
        padding: "0.25em 2em 0.25em 2em", 
        color: "#4C95A9", 
        border: "none"
    }
    return(
        <div className="d-flex flex-column" style={{backgroundColor: "#1F2039", width: "18%"}}>
            <div className="d-flex align-items-center px-3 py-3 gap-3">
                <img alt="logo" src={logo} width="15%" height="60%"/>
                <h1>LEO TRADING</h1>
            </div>
            <div className="d-flex flex-column gap-3" style={{color: "#4C95A9"}}>
                <Button style={sideBarButtonStyle} onClick={()=>setChosenSidebarOption("DASHBOARD")}>Dashboard</Button>
                <Button style={sideBarButtonStyle} onClick={()=>setChosenSidebarOption("MARKET")}>Market</Button>
                <Button style={sideBarButtonStyle} onClick={()=>setChosenSidebarOption("PORTFOLIO")}>Portfolio</Button>
            </div>
        </div>
    )
}