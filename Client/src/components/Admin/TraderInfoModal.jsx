import { Modal, Form, ButtonGroup, ToggleButton, FloatingLabel, Button, Spinner, InputGroup } from "react-bootstrap"
import { useEffect, useRef, useState, useLayoutEffect } from "react"
import authenticated_api from "../../utils/authenticated_api"

export default function TraderInfoModal(props){
    const { 
        selectedTraderInfo, 
        showTraderModal, 
        setShowTraderModal, 
        variant, 
        setIsLoading, 
        setAuthAlert, 
        renderAlertVariant, 
        authAlert,
        isLoading,
        getAllTradersData
    } = props
    const emailRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordRef = useRef()
    const [ isLoadingModal, setIsLoadingModal ] = useState(false)
    const [ roleRadioValue, setRoleRadioValue ] = useState("0");
    const [ roleName, setRoleName ] = useState("")
    const roles = [
        { name: 'Trader', value: '0' },
        { name: 'Admin', value: '1' }
    ];
    const [ signupStatusRadioValue, setSignupStatusRadioValue ] = useState("0");
    const [ signupStatus, setSignupStatus ] = useState("")
    const signupStatuses = [
        { name: 'Pending', value: '0' },
        { name: 'Approved', value: '1' }
    ];
    const [ emailConfirmedSwitchValue, setEmailConfirmedSwitchValue ] = useState(false)
    const [ emailConfirmed, setEmailConfirmed ] = useState(false)

    useLayoutEffect(()=> {
        console.log(selectedTraderInfo)
        setRoleRadioValue(selectedTraderInfo?.role === "ADMIN" ? "1" : "0")
        setSignupStatusRadioValue(selectedTraderInfo?.signup_status === "APPROVED" ? "1" : "0")
        setAuthAlert({status: "", message: ""})
        if(isLoadingModal) setIsLoadingModal(false)
    }, [showTraderModal])

    useEffect(()=>{
        setRoleName(roles[roleRadioValue].name.toUpperCase())
    }, [roleRadioValue])

    useEffect(()=>{
        setSignupStatus(signupStatuses[signupStatusRadioValue].name.toUpperCase())
    }, [signupStatusRadioValue])

    useEffect(()=> {
        console.log("switch: " + emailConfirmedSwitchValue)
        setEmailConfirmed(emailConfirmedSwitchValue)
    }, [emailConfirmedSwitchValue])

    const closeTraderModal = () => {
        setShowTraderModal(false)
    }

    const createTrader = async(e) => {
        e.preventDefault()
        setIsLoadingModal(true)
        console.log(roleName)
        console.log(signupStatus)
        console.log(emailConfirmed)
        emailConfirmed === true ? console.log(new Date().toLocaleString) : null
        try {
            const response = await authenticated_api.post("admin/create_trader", {
                user: {
                    email: emailRef.current.value,
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    password: passwordRef.current.value,
                    role: roleName,
                    signup_status: signupStatus,
                    confirmed_at: emailConfirmed === true ? new Date().toLocaleString : null
                }
            })
            if(response.status === 200){
                setAuthAlert({status: "SUCCESS", message: response.data.status.message})
                getAllTradersData()
            } else {
                setAuthAlert({status: "ERROR", message: response.response.data.status.message})
            }
        } catch (error) {
            setAuthAlert({status: "ERROR", message: error})
        }
        setIsLoadingModal(false)
    }
    const updateTrader = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await authenticated_api.patch(`admin/edit_trader/${selectedTraderInfo.id}`, {
                user: {
                    email: emailRef.current.value,
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    role: roleName,
                    signup_status: signupStatus,
                    confirmed_at: emailConfirmed === true ? new Date().toLocaleString : null
                }
            })
            if(response.status === 200){
                console.log(response)
                setAuthAlert({status: "SUCCESS", message: response.data.status.message})
                getAllTradersData()
                console.log(response)
            } else {
                console.log(response.response)
                console.log(Array.isArray(response.response.data.status.message))
                setAuthAlert({status: "ERROR", message: response.response.data.status.message})
            }
        } catch (error) {
            console.log(error)
            setAuthAlert({status: "ERROR", message: error})
        }
        setIsLoading(false)
    }
    return(
        <Modal 
            show={showTraderModal} 
            centered
            onHide={()=>closeTraderModal()}
            style={{color: "white", fontSize: "1.5rem"}}
        >
            <Modal.Header style={{backgroundColor: "#062440", border: "none"}}>
                <Modal.Title className="d-flex justify-content-center align-items-center" style={{width: "100%"}}>
                    <h1>{variant === "CREATE" ? "New Trader" : "Edit Trader"}</h1>
                </Modal.Title>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    style={{position: "absolute", left: "88%", top: "5%"}}
                    aria-label="Close"
                    onClick={() => closeTraderModal()}
                ></button>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "#062440", border: "none", padding: "0.5em 2em 1em 2em"}}>
                <Form>
                    <main className="d-flex flex-column">
                        <section>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                                style={{color: "black", padding: "0.02em 0 0 0"}}
                            >
                                <Form.Control ref={emailRef} style={{marginTop: "8px"}} type="email" placeholder="name@example.com" defaultValue={selectedTraderInfo.email}/>
                            </FloatingLabel>
                            <FloatingLabel
                                label="First Name"
                                className="mb-3"
                                style={{color: "black", padding: "0.02em 0 0 0"}}
                            >
                                <Form.Control ref={firstNameRef} style={{marginTop: "8px"}} type="text" placeholder="name@example.com" defaultValue={selectedTraderInfo.first_name}/>
                            </FloatingLabel>
                            <FloatingLabel
                                label="Last Name"
                                className="mb-3"
                                style={{color: "black", padding: "0.02em 0 0 0"}}
                            >
                                <Form.Control ref={lastNameRef} style={{marginTop: "8px"}} type="text" placeholder="name@example.com" defaultValue={selectedTraderInfo.last_name}/>
                            </FloatingLabel>
                            {
                                variant === "CREATE" && <FloatingLabel
                                    label="Password"
                                    className="mb-3"
                                    style={{color: "black", padding: "0.02em 0 0 0"}}
                                >
                                    <Form.Control ref={passwordRef} style={{marginTop: "8px"}} type="password" placeholder="name@example.com" />
                                </FloatingLabel>
                            }
                        </section>
                        <section>
                            <InputGroup className="d-flex flex-column gap-2">
                                <h1 style={{fontSize: "1rem"}}>Role</h1>
                                <ButtonGroup>
                                    {roles.map((role, index) => (
                                        <ToggleButton
                                            key={index}
                                            id={`role-${index}`}
                                            type="radio"
                                            variant={index % 2 ? 'outline-primary' : 'outline-primary'}
                                            name="role"
                                            value={role.value}
                                            checked={roleRadioValue === role.value}
                                            onChange={(e) => {
                                                setRoleRadioValue(e.currentTarget.value)
                                            }}
                                            style={{fontSize: "1.5rem", padding: "0 2em 0 2em"}}
                                        >
                                            {role.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </InputGroup>
                            <InputGroup className="d-flex flex-column gap-2">
                                <h1 style={{fontSize: "1rem"}}>Signup Status</h1>
                                <ButtonGroup>
                                    {signupStatuses.map((status, index) => (
                                        <ToggleButton
                                            key={index}
                                            id={`status-${index}`}
                                            type="radio"
                                            variant={index % 2 ? 'outline-primary' : 'outline-primary'}
                                            name="status"
                                            value={status.value}
                                            checked={signupStatusRadioValue === status.value}
                                            onChange={(e) => {
                                                setSignupStatusRadioValue(e.currentTarget.value)
                                            }}
                                            style={{fontSize: "1.5rem", padding: "0 2em 0 2em"}}
                                        >
                                            {status.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </InputGroup>
                            {/* <Form.Check
                                type="switch"
                                label="Email Confirmed"
                                onChange={(e)=> {
                                    setEmailConfirmedSwitchValue(!emailConfirmedSwitchValue)
                                }}
                                style={{margin: "1rem 0 1rem 0"}}
                            /> */}
                        </section>
                    </main>
                    { authAlert.status && renderAlertVariant() }
                    <Button style={{width: "100%", marginTop: "2rem"}} onClick={(e)=> {variant === "CREATE" ? createTrader(e) : updateTrader(e)}}>
                        {
                            isLoadingModal ? 
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <span className="m-0" style={{fontSize: "1.5rem"}}>{variant === "CREATE" ? "Creating..." : "Updating..."}</span>
                                <Spinner animation="border"/>
                            </div>
                            :
                            <p className="m-0" style={{fontSize: "1.5rem"}}>{variant === "CREATE" ? "Create Trader" : "Update Trader"}</p>
                        }
                        </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#062440", border: "none", paddingBottom: "1em"}}>
            </Modal.Footer>
        </Modal>
    )
}