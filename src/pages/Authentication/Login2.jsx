import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// Formik validation
import * as Yup from "yup";
import { Field, Formik, useFormik } from "formik";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import {auth} from "../../firebase-config"
import {signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth'
import Company_logo from "../../assets/images/Comp_logo.jpg"
const initialValues = {
  email:"",
  password:""
}
const Login2 = () => {
  //meta title
  document.title = "Login | SST-Income and Expenses";

  const signupValidation = Yup.object({
    email: Yup.string().min(3).email("Please Enter Valid Email").required("Please Enter Your username"),
    password: Yup.string().min(3).required("Please Enter Your Password"),
  })

  const nav = useNavigate();

  const [show, setShow] = useState(false);
  const[error,seterror] = useState('');
// const error = error;
  // Form validation 
 const {values,handleBlur,handleChange,handleSubmit,errors}= useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit:(values) =>{
        signInWithEmailAndPassword(auth,values.email, values.password)
        .then(function (userCredential) {
          // Login successful, access the user object
          var user = userCredential.user;
          sessionStorage.setItem("uid",JSON.stringify(user.uid));
          nav('/dashboard');
        })
        .catch((error) => {
          // Handle errors
          error.code === "auth/invalid-credential" ? (
            seterror(" wrong password or invalid email")) : (seterror("Invalid password."))
        }) 
      
    }  
  });

    

  return (
    <React.Fragment>      
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
              <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={Company_logo}
                            alt=""
                            className="rounded-circle"
                            height="40"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4 ">
                        <span className="avatar-title rounded-circle bg-light bg-white">
                          <img
                            src={Company_logo}
                            alt=""
                            className=""
                            height="50"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Formik
              
                    >
                    <Form className="form-horizontal"
                    onSubmit={
                      
                      handleSubmit
                      
                      }>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Field
                          name="email"
                          className = {errors.email ? "  border-danger form-control" : "form-control"}
                          placeholder="Enter E-mail"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />              
                        {errors.email && <small className="text-danger m-0">{errors.email}</small>}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <div className="input-group auth-pass-inputgroup d-flex ">
                          <Field
                          // className="form-control"
                          className= {errors.password ? "  border-danger form-control" : "form-control"}
                            name="password"
                            type={show ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                            // invalid={
                            //   validation.touched.password && validation.errors.password ? true : false
                            // }
                          />
                           
                          <button onClick={() => setShow(!show)} className="btn btn-light" type="button" id="password-addon">
                            <i className="mdi mdi-eye-outline"></i></button>
                            
                        </div>
                        {errors.password && <small className="text-danger m-0">{errors.password}</small>}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                          // onClick={()=>handleSubmit()}
                        >
                          Log In
                        </button>
                      </div>
                      <div className="text-danger mx-auto pt-2 d-flex justify-content-center">{error}</div>
                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Forgot your
                          password?
                        </Link>
                      </div>
                    </Form>
                    </Formik>
                  </div>
                </CardBody>
              </Card>
 
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login2;

