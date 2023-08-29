import "./HomePage.css"
import coin from "../assets/HomePage/coin.png"
import earphones from "../assets/HomePage/earphones.png"
import logo from "../assets/HomePage/logo.png"
import people from "../assets/HomePage/people.png"
import winner from "../assets/HomePage/winner.png"
import LoginPage from "./LoginPage"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import SignupPage from "./SignupPage"
import Footer from "../components/Footer"

export default function HomePage(props){
    const { 
        api, 
        emailRef,
        passwordRef, 
        authAlert, 
        setAuthAlert, 
        renderAlertVariant,
        isLoading,
        setIsLoading,
        auth,
        setAuth,
        setCurrentUserData
    } = props
    return(
        <>
            <div className="landing-page" style={{border: "1px solid red"}}>
                <div className="overlap-wrapper">
                    <div className="overlap" >
                        <div className="overlap-group" >
                            <img className="logo" alt="Logo" src={logo} />
                            <div className="icon-design" style={{border: "1px solid red"}}>
                                <img className="coin" alt="Coin" src={coin} />
                                <img className="people" alt="People" src={people} />
                                <img className="winner" alt="Winner" src={winner} />
                                <img className="headset" alt="Headset" src={earphones} />
                            </div>
                            <Footer />
                            <div className="sign-up" style={{border: "1px solid red"}}>
                                <div style={{border: "1px solid red", width: "40%", height: "100%"}}>
                                    <Link type="button" to="/signup" style={{width: "100%", height: "100%"}}>
                                        <Button className="p-0" style={{width: "100%", height: "100%", fontSize: "1.5rem"}}>Signup</Button>
                                    </Link>
                                </div>
                                <div className="text-wrapper-9">English (AU) \ USD</div>
                            </div>
                        </div>
                        <div className="brand-name" style={{border: "1px solid red"}}>
                            <img className="logo-2" alt="Logo" src={logo} />
                            <div className="text-wrapper-10">LEO TRADING</div>
                            <div className="text-wrapper-11">Trade</div>
                            <div className="text-wrapper-12">Learn</div>
                            <div className="text-wrapper-13">Markets</div>
                        </div>
                        <div className="login" style={{border: "1px solid red"}}>
                            <p className="join-the-world-s">Join the world’s&nbsp;&nbsp;largest crypto exchange.</p>
                            <p className="buy-sell-crypto-in">Buy &amp; sell crypto in minutes</p>
                            <LoginPage
                                api={api}
                                emailRef={emailRef}
                                passwordRef={passwordRef} 
                                authAlert={authAlert}
                                setAuthAlert={setAuthAlert}
                                renderAlertVariant={renderAlertVariant}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                auth={auth}
                                setAuth={setAuth}
                                setCurrentUserData={setCurrentUserData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}