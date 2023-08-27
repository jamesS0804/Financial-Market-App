import { Link } from "react-router-dom"

export default function HomePage(){
    return(
        <>
            <h1>HomePage</h1>
            
            <Link type="button" to="/login">Login</Link>
            <Link type="button" to="/signup">Signup</Link>
        </>
    )
}