import { Link } from "react-router-dom"

export default function LoginPage(){
    return(
        <>
            <h1>LoginPage</h1>
            <Link type="button" to="/">Logout</Link>
        </>
    )
}