import { Link } from "react-router-dom"
import logo from "../assets/HomePage/logo.png"
import "../components/Header.css"

export default function Header(){
    return(
        <div className="p-2 w-100 d-flex align-items-center">
            <div className="px-4 d-flex align-items-center gap-2">
                <img alt="logo" src={logo} width="15%"/>
                <h1>LEO TRADING</h1>
            </div>
            <div className="d-flex gap-4">
                <div>Markets</div>
                <div>Trade</div>
                <div>Learn</div>
            </div>
            <div className="px-4 d-flex gap-4" style={{marginLeft: "auto"}}>
                <Link type="button" to="/" style={{textDecoration: "none", color: "white"}}>Home</Link>
                <div>English (AU) \ USD</div>
            </div>
        </div>
    )
}