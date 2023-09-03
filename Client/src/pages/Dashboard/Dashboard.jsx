import { useState } from "react";
import TraderSideBar from "../../components/Trader/TraderSideBar";
import TraderDashboard from "../../components/Trader/TraderDashboard";
import TraderMarket from "../../components/Trader/TraderMarket"
import TraderPortfolio from "../../components/Trader/TraderPortfolio";
import Navbar from "../../components/Navbar";

export default function Dashboard (props) {
  const { 
    api, 
    currentUserData, 
    setAuthAlert, 
    isLoading, 
    setIsLoading, 
    renderAlertVariant,
    authAlert
  } = props
  const [ navBarHeight, setNavBarHeight ] = useState(0)
  const [ chosenSidebarOption, setChosenSidebarOption ] = useState()
  const [ currentUserPortfolio, setCurrentUserPortfolio ] = useState({
    id: "",
    settled_cash: "",
    buying_power: "",
    market_value: ""
  })
  const renderMainTraderView = () => {
      switch(chosenSidebarOption){
          case "MARKET":
              return <TraderMarket 
                        navBarHeight={navBarHeight}
                        currentUserPortfolio={currentUserPortfolio}
                        setAuthAlert={setAuthAlert}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        renderAlertVariant={renderAlertVariant}
                        authAlert={authAlert}
                      />
          case "PORTFOLIO":
              return <TraderPortfolio 
                        navBarHeight={navBarHeight}
                        currentUserData={currentUserData}
                      />
          default:
              return <TraderDashboard 
                        api={api}
                        currentUserData={currentUserData}
                        currentUserPortfolio={currentUserPortfolio}
                        setCurrentUserPortfolio={setCurrentUserPortfolio} 
                      />
      }
  }
  return (
    <div className="d-flex" style={{width: "100dvw", height: "100dvh"}}>
      <TraderSideBar setChosenSidebarOption={setChosenSidebarOption}/>
      <section className="flex-grow-1 d-flex flex-column" style={{backgroundColor: "#83D9E3"}}>
        <Navbar setNavBarHeight={setNavBarHeight}/>
        <main className="flex-grow-1">
            { renderMainTraderView() }
        </main>
      </section>
    </div>
  );
};
