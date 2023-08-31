import { useState } from "react";
import TraderSideBar from "../../components/TraderSideBar";
import TraderDashboard from "../../components/TraderDashboard";
import TraderMarket from "../../components/TraderMarket"
import TraderPortfolio from "../../components/TraderPortfolio";
import Navbar from "../../components/Navbar";

export default function Dashboard (props) {
  const { api, currentUserData } = props
  const [ navBarHeight, setNavBarHeight ] = useState(0)
  const [ chosenSidebarOption, setChosenSidebarOption ] = useState()
  const [ currentUserPortfolio, setCurrentUserPortfolio ] = useState({
    settled_cash: "",
    buying_power: "",
    market_value: ""
  })
  const renderMainTraderView = () => {
      switch(chosenSidebarOption){
          case "MARKET":
              return <TraderMarket 
                        navBarHeight={navBarHeight}
                      />
          case "PORTFOLIO":
              return <TraderPortfolio 
                        navBarHeight={navBarHeight}
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
