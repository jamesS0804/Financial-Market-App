import "./style.css";
import { Form, Button, FloatingLabel, Spinner } from 'react-bootstrap'
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage(props){
  const { 
    api, 
    emailRef,
    passwordRef, 
    authAlert, 
    setAuthAlert, 
    renderAlertVariant,
    isLoading,
    setIsLoading
  } = props
  const formRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const confirmPasswordRef = useRef()
  const [ validated, setValidated ] = useState(false)

  useEffect(()=> {
      setAuthAlert({status: "", message: ""})
  },[])

  const processSignup = async(e) => {
      e.preventDefault()

      if(!formRef.current.checkValidity()){
          setValidated(true)
          return;
      }

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          setAuthAlert({status: "ERROR", message: "Password doesn't match!"})
      } else {
          try {
              setIsLoading(true)
              const response = await api.post("signup", {
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
          setIsLoading(false)
      }
      setValidated(true)
  }
  return (
    <div className="sign-up-page">
      <div className="div">
        <div className="rectangle" />
        <div className="d-flex flex-column justify-content-center align-items-center" style={{padding: "0 0 2.5em 0",marginTop: "10rem"}}>
            <div className="w-25 d-flex flex-column align-items-center">
                <Form className="w-75" ref={formRef} validated={validated} onSubmit={processSignup}>
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
                <Button type="submit" onClick={processSignup} style={{backgroundColor: "#13ADC0", color: "black", border: "none", marginTop: "0.5rem"}}>
                    <div className="p-2 d-flex gap-2 justify-content-center align-items-center">
                      {
                        isLoading ? 
                          <>
                            <p className="m-0" style={{fontSize: "1.5rem"}}>Signing up..</p>
                            <Spinner animation="border"/>
                          </>
                          :
                        <p className="m-0" style={{fontSize: "1.5rem"}}>Signup</p>
                      }
                    </div>
                </Button>
            </div>
        </div>
        <div className="navbar">
          <img className="logo" alt="Logo" src="/src/assets/img/logo-1.png" />
          <div className="text-wrapper-2">LEO TRADING</div>
          <div className="text-wrapper-3">Trade</div>
          <div className="text-wrapper-4">Learn</div>
          <div className="text-wrapper-5">Markets</div>
          <Link to="/">
            <div className="text-wrapper-6">Home</div>
          </Link>
          <div className="text-wrapper-7">English (AU) \ USD</div>
        </div>
      </div>
    </div>
  );
};
