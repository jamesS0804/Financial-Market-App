import { Link } from "react-router-dom"

export default function SignupPage(){
    return(
        <>
            <h1>SignupPage</h1>
            <Link type="button" to="/">Home</Link>
            <Link type="button" to="/login">Login</Link>
        </>
    )
}