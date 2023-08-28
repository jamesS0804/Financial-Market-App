import { Link } from "react-router-dom"
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useState, useRef } from "react";

export default function SignupPage(props){
    const { api, authAlert, setAuthAlert, renderAlertVariant } = props
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [validated, setValidated] = useState(false)

    const processSignup = async() => {
        if (!passwordRef.current.value || passwordRef.current.value !== confirmPasswordRef.current.value) {
            setAuthAlert({status: "ERROR", message: "Password doesn't match!"})
        } else {
            const signupInputs = {
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirm_password: confirmPasswordRef.current.value,
                role: "TRADER"
            }
            console.log(signupInputs)

            try {
                const response = api.post("signup", {
                    user: {
                        first_name: firstNameRef.current.value,
                        last_name: lastNameRef.current.value,
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        confirm_password: confirmPasswordRef.current.value,
                        role: "TRADER"
                    }
                })
                if(response.status === 200) {
                    setAuthAlert({status: "SUCCESS", message: "Signup successful!"})
                } else {
                    setAuthAlert({status: "ERROR", message: "Signup failed!"})
                }
            } catch(error) {
                setAuthAlert({status: "ERROR", message: error})
            }
            setValidated(true)
        }
    }
    return(
        <>
            <div>
                <h1>SignupPage</h1>
                <Link type="button" to="/">Home</Link>
                <Link type="button" to="/login">Login</Link>
            </div>
            <div className="w-25">
                <Form noValidate validated={validated} onSubmit={processSignup}>
                    <FloatingLabel
                        label="First Name"
                        className="mb-3"
                    >
                        <Form.Control
                            ref={firstNameRef}
                            type='text'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid first name.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                        label="Last Name"
                        className="mb-3"
                    >
                        <Form.Control
                            ref={lastNameRef}
                            type='text'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid last name.
                        </Form.Control.Feedback>
                    </FloatingLabel>
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
                    <FloatingLabel
                        label="Confirm Password"
                        className="mb-3"
                    >
                        <Form.Control
                            ref={confirmPasswordRef}
                            type='password'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Password shouldn't be blank.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form>
                { authAlert.status && renderAlertVariant() }
            </div>
            <Button onClick={processSignup}>Signup</Button>
        </>
    )
}