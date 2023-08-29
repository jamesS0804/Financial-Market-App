import Navbar from "../components/Navbar"
import TraderSideBar from "../components/TraderSideBar"

export default function TraderDashboardPage(){
    return(
        <div className="d-flex" style={{width: "100dvw", height: "100dvh"}}>
            <TraderSideBar />
            <section className="flex-grow-1" style={{backgroundColor: "#83D9E3"}}>
                <Navbar />
                <main>
        
                </main>
            </section>
        </div>
    )
}