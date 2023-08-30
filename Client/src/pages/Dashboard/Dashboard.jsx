import { useState } from "react";
import "./style.css";
import TraderSideBar from "../../components/TraderSideBar";
import TraderDashboard from "../../components/TraderDashboard";
import TraderMarket from "../Trader/TraderMarket";
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
    <div className="dashboard">
      <div className="div">
        <div className="overlap">
          <img className="logo" alt="Logo" src="/src/assets/img/logo-7.png" />
          <main>
            { renderMainTraderView() }
          </main>
          <Navbar />
        </div>
        <TraderSideBar setChosenSidebarOption={setChosenSidebarOption}/>
      </div>
    </div>
  );
};
