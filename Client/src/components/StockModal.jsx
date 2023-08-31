import { Modal, Button, Form, InputGroup, ButtonGroup, ToggleButton } from "react-bootstrap"
import { useLayoutEffect, useRef, useState } from "react";
import authenticated_api from "../utils/authenticated_api";

export default function StockModal(props){
    const { 
        showStockModal,
        setShowStockModal,
        marketStockData,
        setMarketStockData,
        currentUserPortfolio
    } = props
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");
    const radios = [
        { name: 'Buy', value: '1' },
        { name: 'Sell', value: '2' }
    ];
    const amountRef = useRef()
    const quantityRef = useRef()

    useLayoutEffect(()=>{
        setRadioValue(()=>marketStockData.transaction_type === "BUY" ? "1" : "2")
    },[showStockModal])
    const closeStockModal = () => {
        setShowStockModal(false)
    }
    const processTransaction = async() => {
        console.log(marketStockData.transaction_type)
        console.log(amountRef.current.value)
        console.log(quantityRef.current.value)
        try {
            const response = await authenticated_api.post(`portfolios/${currentUserPortfolio.id}/transactions/market_order/${marketStockData.transaction_type.toLowerCase()}`,
                {
                    transaction: {
                        market_name: 'STOCK',
                        market_order_type: 'MARKET',
                        transaction_type: marketStockData.transaction_type,
                        status: 'FILLED',
                        symbol: 'AAPL',
                        quantity: quantityRef.current.value,
                        price: amountRef.current.value
                      }
                }
            )
            if(response.status === 200){
                console.log(response)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Modal 
            show={showStockModal} 
            centered
            onHide={()=>closeStockModal()}
            style={{color: "white", fontSize: "1.5rem"}}
        >
            <Modal.Header closeButton style={{backgroundColor: "#062440", border: "none"}}>
                <Modal.Title className="d-flex justify-content-center align-items-center" style={{width: "100%"}}>
                    <ButtonGroup>
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
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "#062440", border: "none", padding: "0.5em 2em 1em 2em"}}>
                <Form>
                    <div className="mb-5">{marketStockData.transaction_type} {marketStockData.symbol}</div>
                    <InputGroup className="d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <Button style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderRight: "1px solid white", borderRadius: "0"}}><i className="bi bi-dash"></i></Button>
                            <Form.Control
                                ref={amountRef}
                                defaultValue={`${marketStockData.amount}`}
                                placeholder={`${marketStockData.amount}`}
                                aria-label="number"
                                aria-describedby="basic-addon1"
                                style={{textAlign: "center", fontSize: "1.8rem", width: "70%", backgroundColor: "#005E69", color: "white", border: "none", borderRadius: "0"}}
                            />
                            <Button style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderLeft: "1px solid white", borderRadius: "0"}}><i className="bi bi-plus"></i></Button>
                        </div>
                        <div>Amount</div>
                    </InputGroup>
                    <InputGroup className="d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <Button style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderRight: "1px solid white", borderRadius: "0"}}><i className="bi bi-dash"></i></Button>
                            <Form.Control
                                ref={quantityRef}
                                defaultValue="1"
                                placeholder="1"
                                aria-label="number"
                                aria-describedby="basic-addon1"
                                style={{textAlign: "center", fontSize: "1.8rem", width: "70%", backgroundColor: "#005E69", color: "white", border: "none", borderRadius: "0"}}
                            />
                            <Button style={{backgroundColor: "#005E69", border: "none", height: "3.5em", borderLeft: "1px solid white", borderRadius: "0"}}><i className="bi bi-plus"></i></Button>
                        </div>
                        <div>Quantity</div>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#062440", border: "none", paddingBottom: "1em"}}>
                <Button variant="success" onClick={()=>processTransaction()} 
                    style={{backgroundColor: "#005E69", fontSize: "1.8rem", padding: "0 1em 0 1em", border: "none"}}
                >{marketStockData.transaction_type}</Button>
            </Modal.Footer>
        </Modal>
    )
}