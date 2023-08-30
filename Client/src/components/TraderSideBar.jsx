import "../components/TraderSideBar.css"

export default function TraderSideBar(props){
    const { setChosenSidebarOption } = props
    return(
        <div className="d-flex flex-column h-100" style={{backgroundColor: "#1F2039", width: "414px"}}>
            <div className="d-flex align-items-center px-3 py-3 gap-3">
                <img className="logo-2" alt="Logo" src="/src/assets/img/logo-1.png" />
                <div className="text-wrapper-11">LEO TRADING</div>
            </div>
            <div className="d-flex flex-column gap-3" style={{color: "#4C95A9", marginTop: "30%"}}>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("DASHBOARD")}>Dashboard</button>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("MARKET")}>Market</button>
                <button className="custom-button"  onClick={()=>setChosenSidebarOption("PORTFOLIO")}>Portfolio</button>
            </div>
        </div>
    )
}