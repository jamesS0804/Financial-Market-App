import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="logo" alt="Logo" src="/img/logo-3.png" />
            <footer className="footer">
              <div className="div">
                <div className="overlap-2">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <div className="text-wrapper-4">+90.80%</div>
                  <img className="img" alt="Logo" src="/img/logo-2.png" />
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line" alt="Line" src="/img/line-2.svg" />
                </div>
                <div className="overlap-3">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <div className="text-wrapper-6">+90.80%</div>
                  <img className="img" alt="Logo" src="/img/logo-2.png" />
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line-2" alt="Line" src="/img/line-3.svg" />
                </div>
                <div className="overlap-4">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <img className="img" alt="Logo" src="/img/logo-2.png" />
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line-3" alt="Line" src="/img/line-1.svg" />
                  <div className="text-wrapper-6">+90.80%</div>
                </div>
                <div className="overlap-5">
                  <div className="text-wrapper">LTR</div>
                  <div className="text-wrapper-2">LTR</div>
                  <div className="text-wrapper-3">24H</div>
                  <div className="text-wrapper-4">+90.80%</div>
                  <div className="text-wrapper-5">251.5291</div>
                  <img className="line-4" alt="Line" src="/img/line-4.svg" />
                  <img className="img" alt="Logo" src="/img/logo-2.png" />
                </div>
              </div>
            </footer>
            <div className="sign-up">
              <div className="overlap-6">
                <div className="rectangle" />
                <div className="text-wrapper-7">Sign up</div>
              </div>
              <div className="text-wrapper-8">English (AU) \ USD</div>
            </div>
          </div>
          <div className="login">
            <div className="rectangle-2" />
            <div className="rectangle-3" />
            <p className="join-the-world-s">Join the world’s&nbsp;&nbsp;largest crypto exchange.</p>
            <p className="buy-sell-crypto-in">Buy &amp; sell crypto in minutes</p>
            <div className="overlap-7">
              <div className="rectangle-4" />
            </div>
          </div>
          <div className="brand-name">
            <img className="logo-2" alt="Logo" src="/img/logo-1.png" />
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
