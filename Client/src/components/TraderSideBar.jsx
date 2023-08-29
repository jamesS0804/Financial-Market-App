import logo from "../assets/HomePage/logo.png"

export default function TraderSideBar(){
    return(
        <div className="d-flex flex-column" style={{backgroundColor: "#1F2039", width: "18%"}}>
            <div className="d-flex align-items-center px-3 py-3 gap-3">
                <img alt="logo" src={logo} width="15%" height="60%"/>
                <h1>LEO TRADING</h1>
            </div>
            <div className="d-flex flex-column gap-3" style={{color: "#4C95A9"}}>
                <div style={{backgroundColor: "#093F5A", fontSize: "2rem", paddingLeft: "2em"}}>Dashboard</div>
                <div style={{backgroundColor: "#093F5A", fontSize: "2rem", paddingLeft: "2em"}}>Market</div>
                <div style={{backgroundColor: "#093F5A", fontSize: "2rem", paddingLeft: "2em"}}>Portfolio</div>
            </div>
        </div>
    )
}