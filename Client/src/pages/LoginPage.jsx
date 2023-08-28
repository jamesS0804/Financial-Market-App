import { Link } from "react-router-dom"
import { Form, Button, FloatingLabel, Spinner } from 'react-bootstrap'
import { useState, useRef } from "react";

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
        auth,
        setAuth,
        setCurrentUserData
    } = props
    const formRef = useRef()
    const [ validated, setValidated ] = useState(false)

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
                setCurrentUserData({ email: userData.email, first_name: userData.first_name, last_name: userData.last_name})
                setAuth(response.headers['authorization'])
                sessionStorage.setItem('authorization',response.headers['authorization'].split(' ')[1])
                setAuthAlert({status: "SUCCESS", message: "Signup successful!"})
            } else {
                setAuthAlert({status: "ERROR", message: "Signup failed!"})
            }
        } catch(error) {
            console.log(error)
            setAuthAlert({status: "WARNING", message: error.response.data})
        }
        setIsLoading(false)
        setValidated(true)
    }
    return(
        <>
            <div>
                <h1>LoginPage</h1>
                <Link type="button" to="/">Home</Link>
                <Link type="button" to="/signup">Signup</Link>
            </div>
            <div className="w-25">
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
                <Button type="submit" onClick={processLogin}>
                    {
                        isLoading ? 
                            <div>
                                <p>Logging in..</p>
                                <Spinner animation="border"/>
                            </div>
                            :
                            <span>Login</span>
                    }
                </Button>
            </div>
        </>
    )
}