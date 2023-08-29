export default function Navbar(){
    return(
        <div className="d-flex p-4 align-items-center justify-content-center" style={{borderBottom: "1px solid black"}}>
            <div className="d-flex rounded-3 p-2" style={{backgroundColor: "#44939C", width: "35%", marginLeft: "25%"}}>
                <i className="bi bi-search"/>
                <div style={{color: "white", marginLeft: "1rem"}}>Search</div>
            </div>
            <div style={{marginLeft: "auto"}}>English (AU) \ USD</div>
        </div>
    )
}