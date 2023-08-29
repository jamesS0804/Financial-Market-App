import Navbar from "../../components/Navbar"
import TraderSideBar from "../../components/TraderSideBar"
import TraderDashboard from './TraderDashboard'
import TraderMarket from './TraderMarket'
import TraderPortfolio from './TraderPortfolio'
import { useState } from 'react'

export default function TraderDashboardPage(){
    const [ chosenSidebarOption, setChosenSidebarOption ] = useState()
    const renderMainTraderView = () => {
        switch(chosenSidebarOption){
            case "MARKET":
                return <TraderMarket />
            case "PORTFOLIO":
                return <TraderPortfolio />
            default:
                return <TraderDashboard />
        }
    }
    return(
        <div className="d-flex" style={{width: "100dvw", height: "100dvh"}}>
            <TraderSideBar setChosenSidebarOption={setChosenSidebarOption}/>
            <section className="flex-grow-1" style={{
                backgroundColor: "#83D9E3", 
                }}>
                <Navbar />
                <main>
                    {renderMainTraderView()}
                </main>
            </section>
        </div>
    )
}