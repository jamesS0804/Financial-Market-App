import "./style.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";

export default function LandingPage(props) {
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
  return (
    <div className="landing-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="logo" alt="Logo" src="/src/assets/img/logo-3.png" />
            <footer className="footer">
              <div className="div">
                <div className="overlap-2">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <div className="text-wrapper-4">+90.80%</div>
                  <img className="img" alt="Logo" src="/src/assets/img/logo-2.png" />
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line" alt="Line" src="/src/assets/img/line-2.svg" />
                </div>
                <div className="overlap-3">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <div className="text-wrapper-6">+90.80%</div>
                  <img className="img" alt="Logo" src="/src/assets/img/logo-2.png" />
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line-2" alt="Line" src="/src/assets/img/line-3.svg" />
                </div>
                <div className="overlap-4">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <img className="img" alt="Logo" src="/src/assets/img/logo-2.png" />
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line-3" alt="Line" src="/src/assets/img/line-1.svg" />
                  <div className="text-wrapper-6">+90.80%</div>
                </div>
                <div className="overlap-5">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <div className="text-wrapper-4">+90.80%</div>
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line-4" alt="Line" src="/src/assets/img/line-4.svg" />
                  <img className="img" alt="Logo" src="/src/assets/img/logo-2.png" />
                </div>
              </div>
            </footer>
            <div className="sign-up">
              <Link type="button" to="/signup" style={{width: "100%", height: "100%"}}>
                  <Button className="p-0" style={{width: "35%", height: "100%", fontSize: "1.5rem"}}>Signup</Button>
              </Link>
              <div className="text-wrapper-8">English (AU) \ USD</div>
            </div>
          </div>
          <div className="login">
            <p className="join-the-world-s">Join the world’s&nbsp;&nbsp;largest crypto exchange.</p>
            <p className="buy-sell-crypto-in">Buy &amp; sell crypto in minutes</p>
            <div>
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
          <div className="brand-name">
            <img className="logo-2" alt="Logo" src="/src/assets/img/logo-1.png" />
            <div className="text-wrapper-10">LEO TRADING</div>
            <div className="text-wrapper-11">Trade</div>
            <div className="text-wrapper-12">Learn</div>
            <div className="text-wrapper-13">Markets</div>
          </div>
        </div>
      </div>
    </div>
  );
};
