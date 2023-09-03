import { Modal, Button, Form, InputGroup, ButtonGroup, ToggleButton } from "react-bootstrap"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import authenticated_api from "../../utils/authenticated_api";
import logo from "../../assets/img/logo-1.png"

export default function StockModal(props){
    const { 
        showStockModal,
        setShowStockModal,
        marketStockData,
        setMarketStockData,
        currentUserPortfolio,
        setAuthAlert,
        isLoading,
        setIsLoading,
        renderAlertVariant,
        authAlert
    } = props
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");
    const radios = [
        { name: 'Buy', value: '1' },
        { name: 'Sell', value: '2' }
    ];
    const amountRef = useRef()
    const quantityRef = useRef()
    const [ quantity, setQuantity ] = useState(1)
    const [ amount, setAmount ] = useState(marketStockData.price_per_share)
    const [ quantityData, setQuantityData ] = useState(1)
    const [ amountData, setAmountData ] = useState(marketStockData.price_per_share)

    useLayoutEffect(()=>{
        setRadioValue(()=>marketStockData.transaction_type === "BUY" ? "1" : "2")
        setQuantity(1)
        setAmount(marketStockData.price_per_share)
        setAuthAlert({status: "", message: ""})
    },[showStockModal])

    useEffect(()=>{
        const quantity = (amount / marketStockData.price_per_share)
        const fixedQuantity = quantity.toFixed(2)
        setQuantityData(quantity)
        setQuantity(quantity)
    },[amount])

    useEffect(()=>{
        const amount = (marketStockData.price_per_share * quantity)
        const fixedAmount = amount.toFixed(2)
        setAmountData(amount)
        setAmount(amount)
    },[quantity])

    const closeStockModal = () => {
        setShowStockModal(false)
    }

    const processTransaction = async() => {
        console.log("transaction type: " + marketStockData.transaction_type)
        console.log("price per share: " + marketStockData.price_per_share)
        console.log("DISPLAY amount: " + amount)
        console.log("DISPLAY quantity: " + quantity)
        console.log("DATA amount: " + amountData)
        console.log("DATA quantity: " + quantityData)
        try {
            const response = await authenticated_api.post(`portfolios/${currentUserPortfolio.id}/transactions/market_order/${marketStockData.transaction_type.toLowerCase()}`,
                {
                    transaction: {
                        market_name: 'STOCK',
                        market_order_type: 'MARKET',
                        transaction_type: marketStockData.transaction_type,
                        status: 'FILLED',
                        symbol: 'AAPL',
                        quantity: quantity,
                        price_per_share: marketStockData.price_per_share
                    }
                }
            )
            if(response.status === 200){
                console.log(response)
            } else {
                setAuthAlert({status: "ERROR", message: response.response.data.status.message})
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleAmountOnChange = (e) => {
        const amount = parseFloat(e.currentTarget.value)
        const fixedFloat = amount.toFixed(2);
        setAmountData(amount)
        setAmount(fixedFloat)
    }
    const handleQuantityOnChange = (e) => {
        const quantity = parseFloat(e.currentTarget.value)
        const fixedFloat = quantity.toFixed(2);
        setQuantityData(quantity)
        setQuantity(fixedFloat)
    }
    const handleAmountOnBlur = (e) => {
        const float = parseFloat(e.currentTarget.value);
        const fixedFloat = float.toFixed(2);
        setAmountData(float)
        setAmount(fixedFloat)
    }
    const handleQuantityOnBlur = (e) => {
        const float = parseFloat(e.currentTarget.value);
        const fixedFloat = float.toFixed(2);
        setQuantityData(float)
        setQuantity(fixedFloat)
    }
    return(
        <Modal 
            show={showStockModal} 
            centered
            onHide={()=>closeStockModal()}
            style={{color: "white", fontSize: "1.5rem"}}
        >
            <Modal.Header style={{backgroundColor: "#062440", border: "none"}}>
                <Modal.Title className="d-flex justify-content-center align-items-center" style={{width: "100%"}}>
                    <ButtonGroup style={{marginTop: "0.30rem"}}>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => {
                                    setRadioValue(e.currentTarget.value)
                                    setMarketStockData({...marketStockData, transaction_type: e.currentTarget.value === "1" ? "BUY" : "SELL"})
                                    console.log(e.currentTarget.value)
                                }}
                                style={{fontSize: "1.5rem", padding: "0 2em 0 2em"}}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{position: "absolute", left: "88%", top: "5%"}}
                        aria-label="Close"
                        onClick={() => closeStockModal()}
                    ></button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "#062440", border: "none", padding: "0.5em 2em 1em 2em"}}>
                <Form>
                    <div className="mb-5 mt-2 px-0 d-flex gap-3">
                        <div className="d-flex justify-content-center align-items-center">
                            <img style={{height: "80%", width: "100%", border: "2px solid black", backgroundColor: "black", borderRadius: "0.5rem", padding: "0.1em"}} alt="brand-logo-placeholder" src={logo} width="50px" height="50px"/>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <div style={{height: "25%"}}>
                                <span>{marketStockData.transaction_type} </span>
                                <span>{marketStockData.symbol}</span>
                            </div>
                            <div>
                                <span style={{marginRight: "1rem", fontSize: "3rem"}}>{marketStockData.price_per_share}</span>
                                <span style={
                                    Number(marketStockData.change) >= 0 ?
                                    {marginRight: "1rem", color: "#59FF00"} : {marginRight: "1rem", color: "red"}}>{Number(marketStockData.change).toFixed(2)}</span>
                                <span style={
                                    Number(marketStockData.change) >= 0 ?
                                    {marginRight: "1rem", color: "#59FF00"} : {marginRight: "1rem", color: "red"}}>({Number(marketStockData.change_percent).toFixed(2)}%)</span>
                            </div>
                        </div>
                    </div>
                    <InputGroup className="d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <Button onClick={()=> setAmount(amount - 100)} style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderRight: "1px solid white", borderRadius: "0"}}><i className="bi bi-dash"></i></Button>
                            <Form.Control
                                ref={amountRef}
                                value={amount || ""}
                                onChange={handleAmountOnChange}
                                onBlur={handleAmountOnBlur}
                                aria-label="number"
                                aria-describedby="basic-addon1"
                                style={{textAlign: "center", fontSize: "1.8rem", width: "70%", backgroundColor: "#005E69", color: "white", border: "none", borderRadius: "0"}}
                            />
                            <Button onClick={()=> setAmount(amount + 100)} style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderLeft: "1px solid white", borderRadius: "0"}}><i className="bi bi-plus"></i></Button>
                        </div>
                        <div>Amount</div>
                    </InputGroup>
                    <InputGroup className="d-flex flex-column justify-content-center align-items-center" style={{margin: "1rem 0 1rem 0"}}>
                        <div className="d-flex justify-content-center align-items-center">
                            <Button onClick={()=> setQuantity(quantity - 1)} style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderRight: "1px solid white", borderRadius: "0"}}><i className="bi bi-dash"></i></Button>
                            <Form.Control
                                ref={quantityRef}
                                value={quantity || ""}
                                onChange={handleQuantityOnChange}
                                onBlur={handleQuantityOnBlur}
                                aria-label="number"
                                aria-describedby="basic-addon1"
                                style={{textAlign: "center", fontSize: "1.8rem", width: "70%", backgroundColor: "#005E69", color: "white", border: "none", borderRadius: "0"}}
                            />
                            <Button onClick={()=> setQuantity(quantity + 1)} style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderLeft: "1px solid white", borderRadius: "0"}}><i className="bi bi-plus"></i></Button>
                        </div>
                        <div>Quantity</div>
                    </InputGroup>
                </Form>
                { authAlert.status && renderAlertVariant() }
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#062440", border: "none", paddingBottom: "1em"}}>
                <Button variant="success" onClick={()=>processTransaction()} 
                    style={{backgroundColor: "#005E69", fontSize: "1.8rem", padding: "0 1em 0 1em", border: "none"}}
                >{marketStockData.transaction_type}</Button>
            </Modal.Footer>
        </Modal>
    )
}