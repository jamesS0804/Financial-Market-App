import { useState } from "react";
import TraderSideBar from "../../components/TraderSideBar";
import TraderDashboard from "../../components/TraderDashboard";
import TraderMarket from "../../components/TraderMarket"
import TraderPortfolio from "../Trader/TraderPortfolio";
import Navbar from "../../components/Navbar";

export default function Dashboard (props) {
  const { api, currentUserData } = props
  const [ chosenSidebarOption, setChosenSidebarOption ] = useState()
  const [ currentUserPortfolio, setCurrentUserPortfolio ] = useState({
    settled_cash: "",
    buying_power: "",
    market_value: ""
  })
  const renderMainTraderView = () => {
      switch(chosenSidebarOption){
          case "MARKET":
              return <TraderMarket />
          case "PORTFOLIO":
              return <TraderPortfolio />
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
    <div className="d-flex" style={{width: "100dvw", height: "100dvh", border: "1px solid blue"}}>
      <TraderSideBar setChosenSidebarOption={setChosenSidebarOption}/>
      <section className="flex-grow-1 d-flex flex-column" style={{border: "1px solid red", backgroundColor: "#13ADC0"}}>
        <Navbar />
        <main className="flex-grow-1" style={{height: "78%"}}>
            { renderMainTraderView() }
        </main>
      </section>
    </div>
  );
};
