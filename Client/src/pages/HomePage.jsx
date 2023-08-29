import "./HomePage.css"
import coin from "../assets/HomePage/coin.png"
import earphones from "../assets/HomePage/earphones.png"
import logo from "../assets/HomePage/logo.png"
import people from "../assets/HomePage/people.png"
import winner from "../assets/HomePage/winner.png"

export default function HomePage(){
    return(
        <>
            <div className="landing-page">
                <div className="overlap-wrapper">
                    <div className="overlap">
                    <div className="overlap-group">
                        <img className="logo" alt="Logo" src={logo} />
                        <div className="icon-design">
                        <img className="coin" alt="Coin" src={coin} />
                        <img className="people" alt="People" src={people} />
                        <img className="winner" alt="Winner" src={winner} />
                        <img className="headset" alt="Headset" src={earphones} />
                        </div>
                        <footer className="footer">
                            <div className="div">
                                <div className="text-wrapper">LTR</div>
                                <div className="text-wrapper-2">LTR</div>
                                <div className="text-wrapper-3">24H</div>
                                <div className="text-wrapper-4">+90.80%</div>
                                <img className="img" alt="Logo" src={logo} />
                                <div className="text-wrapper-5">251.5291</div>
                                <svg className="line" width="251" height="53" viewBox="0 0 251 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.58045 51.6711L19.456 26.7709C20.1452 25.8108 20.9621 24.9492 21.8841 24.2099L44.4609 6.10698C46.5784 4.40903 49.1744 3.41647 51.8846 3.2685L76.9821 1.89831C79.3665 1.76813 81.7406 2.2972 83.8441 3.42746L105.918 15.2887C108.022 16.419 110.396 16.948 112.78 16.8179L150.22 14.7738C152.972 14.6236 155.7 15.3516 158.01 16.8526L178.096 29.8995C178.883 30.4107 179.723 30.8351 180.601 31.1655L199.533 38.2858C203.308 39.7054 207.528 39.2929 210.956 37.1691L250.33 12.7762" stroke="#8EECF8"/>
                                </svg>
                                <div className="div-wrapper">
                                <div className="text-wrapper-6">&gt;</div>
                                </div>
                            </div>
                            <div className="overlap-2">
                                <div className="text-wrapper">LTR</div>
                                <div className="text-wrapper-2">LTR</div>
                                <div className="text-wrapper-3">24H</div>
                                <div className="text-wrapper-7">+90.80%</div>
                                <img className="img" alt="Logo" src={logo} />
                                <div className="text-wrapper-5">251.5291</div>
                                <svg className="line-2" width="213" height="48" viewBox="0 0 213 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.57882 46.6659L14.2701 28.9852C17.8871 23.9463 24.5601 22.1645 30.2074 24.7297L54 35.5371L65.4499 41.7529C70.7523 44.6314 77.3383 43.4834 81.3542 38.9807L96.244 22.2857C97.4028 20.9864 98.8109 19.933 100.385 19.1882L123.033 8.46914C124.007 8.00805 125.035 7.66991 126.093 7.46251L151.757 2.42996C154.817 1.83004 157.99 2.3496 160.698 3.89392L181.558 15.7884C186.323 18.5051 192.28 17.9394 196.447 14.3745L211.5 1.5" stroke="#8EECF8"/>
                                </svg>
                                <div className="div-wrapper">
                                <div className="text-wrapper-6">&gt;</div>
                                </div>
                            </div>
                            <div className="overlap-3">
                                <div className="text-wrapper">LTR</div>
                                <div className="text-wrapper-2">LTR</div>
                                <div className="text-wrapper-3">24H</div>
                                <img className="img" alt="Logo" src={logo} />
                                <div className="text-wrapper-5">251.5291</div>
                                <svg className="line-3" width="225" height="45" viewBox="0 0 225 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.580425 43.671L16.986 36.0345C21.5692 33.9012 24.5 29.3042 24.5 24.2488L24.5 21.327C24.5 16.5117 27.1618 12.0908 31.4175 9.83778L45.0583 2.61621C48.2131 0.946057 51.9158 0.646589 55.2979 1.78806L90 13.4999L101.06 18.7C105.948 20.9981 111.779 19.4723 114.915 15.075V15.075C118.337 10.2764 124.897 8.95978 129.906 12.0662L147 22.6684L171.676 35.5284C173.531 36.4952 175.592 37 177.684 37L192.117 37C193.036 37 193.953 37.0975 194.852 37.2909L224.5 43.671" stroke="#8EECF8"/>
                                </svg>
                                <div className="div-wrapper">
                                <div className="text-wrapper-6">&gt;</div>
                                </div>
                                <div className="text-wrapper-7">+90.80%</div>
                            </div>
                            <div className="overlap-group-2">
                                <div className="text-wrapper">LTR</div>
                                <div className="text-wrapper-2">LTR</div>
                                <div className="text-wrapper-3">24H</div>
                                <div className="text-wrapper-4">+90.80%</div>
                                <div className="text-wrapper-5">251.5291</div>
                                <svg className="line-4" width="229" height="65" viewBox="0 0 229 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.580527 63.6711L24.8105 54.1785C27.5154 53.1188 29.7562 51.1332 31.1337 48.5755L35.0575 41.29C38.2935 35.2817 47.0222 35.6171 49.7875 41.856V41.856C52.5394 48.0645 61.2103 48.4359 64.483 42.4856L72.9289 27.1293C76.1058 21.3532 83.1031 18.8693 89.2108 21.3495L100.74 26.0313C101.578 26.3714 102.378 26.7978 103.126 27.3037L106.783 29.774C112.089 33.3583 119.215 32.5451 123.577 27.8575L144.221 5.67272C147.473 2.17786 152.38 0.746677 157.001 1.94476L173.705 6.27537C175.546 6.75272 177.26 7.62829 178.726 8.84032L191.848 19.6894C195.622 22.8099 200.829 23.5447 205.32 21.5901L228.5 11.5001" stroke="#8EECF8"/>
                                </svg>
                                <div className="div-wrapper">
                                <div className="text-wrapper-6">&gt;</div>
                                </div>
                                <img className="img" alt="Logo" src={logo} />
                            </div>
                        </footer>
                        <div className="sign-up">
                        <div className="overlap-4">
                            <div className="text-wrapper-8">Sign up</div>
                        </div>
                        <div className="text-wrapper-9">English (AU) \ USD</div>
                        </div>
                    </div>
                    <div className="brand-name">
                        <img className="logo-2" alt="Logo" src={logo} />
                        <div className="text-wrapper-10">LEO TRADING</div>
                        <div className="text-wrapper-11">Trade</div>
                        <div className="text-wrapper-12">Learn</div>
                        <div className="text-wrapper-13">Markets</div>
                    </div>
                    <div className="login">
                        <div className="rectangle" />
                        <div className="rectangle-2" />
                        <p className="join-the-world-s">Join the world’s&nbsp;&nbsp;largest crypto exchange.</p>
                        <p className="buy-sell-crypto-in">Buy &amp; sell crypto in minutes</p>
                        <div className="overlap-5">
                        <div className="text-wrapper-14">Login</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </>
    )
}