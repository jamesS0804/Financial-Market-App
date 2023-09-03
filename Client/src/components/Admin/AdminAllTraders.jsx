import { useEffect, useRef, useState } from "react"
import authenticated_api from "../../utils/authenticated_api"
import { Button, Spinner } from "react-bootstrap"
import convertToProperDateAndTime from "../../utils/convertToProperDateAndTime"
import TraderInfoModal from "./TraderInfoModal"

export default function AdminAllTraders(props){
    const { setIsLoading, setAuthAlert, renderAlertVariant,authAlert, isLoading } = props
    const [ allTraders, setAllTraders ] = useState([])
    const [ showTraderModal, setShowTraderModal ] = useState(false)
    const [ selectedTraderInfo, setSelectedTraderInfo ] = useState({})
    const [ variant, setVariant ] = useState()

    useEffect(()=> {
        getAllTradersData()
    },[])
    const openTraderModal = (id, email, first_name, last_name, role, signup_status, confirmed_at) => {
        setSelectedTraderInfo({
            id: id,
            email: email,
            first_name: first_name,
            last_name: last_name,
            role: role,
            signup_status: signup_status?.toUpperCase(),
            confirmed_at: confirmed_at
        })
        setShowTraderModal(true)
    }
    const getAllTradersData = async() => {
        try {
            const response = await authenticated_api.get("admin/view_all_traders")
            if(response.status === 200){
                console.log(response.data.data)
                const allTradersData = response.data.data
                setAllTraders(allTradersData)
            } else {
                console.log(response.data.status.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getAllPendingTraders = async() => {
        try {
            const response = await authenticated_api.get("admin/view_all_pending")
            if(response.status === 200){
                console.log(response.data.data)
                const allTradersData = response.data.data
                setAllTraders(allTradersData)
            } else {
                console.log(response.data.status.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const approvePendingTrader = async(trader_id) => {
        setIsLoading(true)
        try {
            const response = await authenticated_api.patch(`admin/approve_trader/${trader_id}`)
            if(response.status === 200){
                console.log(response.data.data)
                getAllTradersData()
            } else {
                console.log(response.data.status.message)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    const deleteTrader = async(trader_id) => {
        try {
            const response = await authenticated_api.delete(`admin/delete_trader/${trader_id}`)
            if(response.status === 200){
                console.log(response.data.data)
                getAllTradersData()
            } else {
                console.log(response.data.status.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div 
            className="container-fluid p-0" 
            style={{
                overflowY: "auto", overflowX: "hidden", height: "100%", maxHeight: "873px", 
                display: "block", fontWeight: "bold", textAlign: "center"
            }}
        >
            <TraderInfoModal 
                variant={variant}
                selectedTraderInfo={selectedTraderInfo}
                setShowTraderModal={setShowTraderModal}
                showTraderModal={showTraderModal}
                renderAlertVariant={renderAlertVariant}
                setIsLoading={setIsLoading}
                setAuthAlert={setAuthAlert}
                authAlert={authAlert}
                isLoading={isLoading}
                getAllTradersData={getAllTradersData}
            />
            <div className="d-flex">
                <h1 className="px-3">All Traders</h1>
                <div className="d-flex gap-2 p-3" style={{marginLeft: "auto"}}>
                    <Button onClick={()=> getAllTradersData()}>All Traders</Button>
                    <Button onClick={()=> getAllPendingTraders()}>All Pending</Button>
                    <Button onClick={()=> {
                        openTraderModal()
                        setVariant('CREATE')
                    }}>Create Trader</Button>
                </div>
            </div>
            <table className="container-fluid" style={{borderCollapse: "collapse"}}>
                <thead className="sticky-header" style={{borderBottom: "1px solid black"}}>
                    <tr>
                        <th id="trader-email" style={{width: "10%", padding: "0.5em 1em"}}>Email</th>
                        <th id="trader-first-name" style={{width: "10%", padding: "0.5em 1em"}}>First Name</th>
                        <th id="trader-last-name" style={{width: "10%", padding: "0.5em 1em"}}>Last Name</th>
                        <th id="trader-role" style={{width: "10%", padding: "0.5em 1em"}}>Role</th>
                        <th id="trader-signup-status">Signup status</th>
                        <th id="trader-confirmed-at" style={{width: "20%", padding: "0.5em 1em"}}>Confirmed at</th>
                        <th id="trader-created-at">Created at</th>
                        <th id="trader-actions">Actions</th>
                    </tr>
                </thead>
                <tbody style={{overflowY: "auto"}}>
                    { allTraders.length === 0 ? 
                        <tr style={{border: "1px solid black"}}>
                            <td colSpan="7" style={{width: "100%"}}>
                                <div>No Pending Traders</div>
                            </td>
                        </tr>
                        :
                        allTraders.map((trader) => {
                            return(
                                <tr key={trader.id} style={{
                                    height: "10px", border: "1px solid black", borderWidth: "1px 0 1px 0",
                                }}>
                                    <td headers="trader-email">{trader.email}</td>
                                    <td headers="trader-first-name">{trader.first_name}</td>
                                    <td headers="trader-last-name">{trader.last_name}</td>
                                    <td headers="trader-role">{trader.role}</td>
                                    <td headers="trader-signup-status">
                                        {
                                            trader.signup_status === "PENDING" ?
                                                <div style={{
                                                    backgroundColor: "#428E98", padding: "0.25em 1em 0.25em 1em",
                                                    borderRadius: "1em", color: "white", width: "100%",
                                                    fontWeight: "bold", textAlign: "center"
                                                }}>{trader.signup_status.toUpperCase()}</div>
                                                :
                                                <div style={{
                                                    backgroundColor: "green", padding: "0.25em 1em 0.25em 1em",
                                                    borderRadius: "1em", color: "white", width: "100%",
                                                    fontWeight: "bold", textAlign: "center"
                                                }}>{trader.signup_status.toUpperCase()}</div>
                                        }
                                    </td>
                                    <td headers="trader-confirmed-at" className="d-flex justify-content-center align-items-center">{trader.confirmed_at === null ? 
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            backgroundColor: "#428E98", padding: "0.25em 1em 0.25em 1em",
                                            borderRadius: "1em", color: "white",
                                            fontWeight: "bold", textAlign: "center"
                                        }}>PENDING</div>
                                    : convertToProperDateAndTime(trader.confirmed_at)}</td>
                                    <td headers="trader-created-at">{trader.created_at === null ? "PENDING" : convertToProperDateAndTime(trader.created_at)}</td>
                                    <td className="d-flex gap-2">
                                        <Button onClick={()=> approvePendingTrader(trader.id)} disabled={ trader.signup_status === "PENDING" ? false : true } variant="success">
                                            {
                                                isLoading ?
                                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                                        <span className="m-0">Approving...</span>
                                                        <Spinner style={{width: "0.5rem", height: "0.5rem"}} animation="border"/>
                                                    </div>
                                                    : <div>Approve <i className="bi bi-check"></i></div>
                                            }
                                        </Button>
                                        <Button onClick={()=> {
                                            openTraderModal(trader.id, trader.email, trader.first_name, trader.last_name, trader.role, trader.signup_status, trader.confirmed_at)
                                            setVariant("EDIT")
                                        }} variant="warning">Edit <i className="bi bi-pencil-fill"></i></Button>
                                        <Button onClick={()=> deleteTrader(trader.id)} variant="danger">Delete <i className="bi bi-trash-fill"></i></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}