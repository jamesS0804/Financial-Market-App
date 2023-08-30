import { Form, Button, FloatingLabel, Spinner } from 'react-bootstrap'
import { useState, useRef, useEffect } from "react";

export default function LoginPage(props){
    const { 
        api, 
        emailRef,
        passwordRef, 
        authAlert, 
        setAuthAlert, 
        renderAlertVariant,
        isLoading,
        setIsLoading,
        setAuth,
        setCurrentUserData
    } = props
    const formRef = useRef()
    const [ validated, setValidated ] = useState(false)

    useEffect(()=> {
        setAuthAlert({status: "", message: ""})
    },[])

    const processLogin = async(e) => {
        e.preventDefault()

        if(!formRef.current.checkValidity()){
            setValidated(true)
            return;
        }

        try {
            setIsLoading(true)
            const response = await api.post("login", {
                user: {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }
            })
            if(response.status === 200) {
                console.log(response)
                const userData = response.data.data.user
                setCurrentUserData({ id: userData.id ,email: userData.email, first_name: userData.first_name, last_name: userData.last_name, role: userData.role})
                setAuth(response.headers['authorization'])
                sessionStorage.setItem('current_user',JSON.stringify({ id: userData.id ,email: userData.email, first_name: userData.first_name, last_name: userData.last_name, role: userData.role}))
                sessionStorage.setItem('authToken',response.headers['authorization'].split(' ')[1])
                setAuthAlert({status: "SUCCESS", message: "Signin successful!"})
            } else {
                setAuthAlert({status: "ERROR", message: "Signin failed!"})
            }
        } catch(error) {
            console.log(error)
            setAuthAlert({status: "ERROR", message: error.response.data})
        }
        setIsLoading(false)
        setValidated(true)
    }
    return(
        <>
            <div className="w-100" style={{position: "absolute", top: "55%"}}>
                <Form ref={formRef} validated={validated} onSubmit={processLogin}>
                    <FloatingLabel
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            ref={emailRef}
                            type='email'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            ref={passwordRef}
                            type='password'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Password shouldn't be blank.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form>
                { authAlert.status && renderAlertVariant() }
                <Button type="submit" onClick={processLogin} style={{marginLeft: "65%", width: "35%"}}>
                    <div className="px-3 py-1 d-flex gap-2 justify-content-center align-items-center">
                        {
                            isLoading ? 
                                <>
                                    <p className="m-0" style={{fontSize: "1.2rem"}}>Logging in..</p>
                                    <Spinner animation="border"/>
                                </>
                                :
                            <p className="m-0" style={{fontSize: "1.5rem"}}>Login</p>
                        }
                    </div>
                </Button>
            </div>
        </>
    )
}