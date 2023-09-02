import AdminSidebar from "../../components/Admin/AdminSidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import AdminAllTraders from "../../components/Admin/AdminAllTraders"
import AdminAllTransactions from "../../components/Admin/AdminAllTransactions";

export default function Admin (props) {
  const { setIsLoading, setAuthAlert, renderAlertVariant, authAlert, isLoading } = props
  const [ chosenSidebarOption, setChosenSidebarOption ] = useState()
  const renderMainTraderView = () => {
      switch(chosenSidebarOption){
          case "TRANSACTIONS":
              return <AdminAllTransactions
                      />
          default:
              return <AdminAllTraders
                          setIsLoading={setIsLoading}
                          setAuthAlert={setAuthAlert}
                          renderAlertVariant={renderAlertVariant}
                          authAlert={authAlert}
                          isLoading={isLoading}
                      />
      }
    }
  return (
    <div className="d-flex" style={{width: "100dvw", height: "100dvh"}}>
      <AdminSidebar setChosenSidebarOption={setChosenSidebarOption}/>
      <section className="flex-grow-1 d-flex flex-column" style={{backgroundColor: "#83D9E3"}}>
        <Navbar/>
        <main className="flex-grow-1">
            { renderMainTraderView() }
        </main>
      </section>
    </div>
  );
};
