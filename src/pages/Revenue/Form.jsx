import React, {useState, useEffect} from 'react';
import {
  Alert,
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup,
} from "reactstrap";

import { collection, addDoc, onSnapshot, Timestamp } from "firebase/firestore"; 
import 'firebase/database';
import {db} from "../../firebase-config.js"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
// Form Mask
import InputMask from "react-input-mask"

const FormRevenue = (props) => {

  const[formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "",
    description: "",
    clientName: "",
  });
  
  const [show, setShow] = useState(false);

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value,timestamp:Timestamp.now()});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault(); 

    try {
      const docRef = await addDoc(collection(db, "Income"),formData);
      // console.log("Document written with ID: ", docRef.id);
      setFormData({
        date: "",
        amount: "",
        type: "",
        description: "",
        clientName: "",
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(formData)
  }

  return (
      <Row className='d-flex justify-content-center'>
        <Col lg={9}>
          <div id="liveAlertPlaceholder">
            <Alert isOpen={show} toggle={() => {
              setShow(false)
            }}>
              Your Income Details Added
            </Alert>
          </div>
        </Col>  
        <Col lg={8} >
          <Card>
            <CardBody>
              <CardTitle className="mb-4">Income Form</CardTitle>

              <Form onSubmit={handleSubmit}>
                <div className=" mb-4">
                  <Label
                    htmlFor="horizontal-password-Input"
                    className="col-sm-3 col-form-label"
                  >
                    Date
                  </Label>
                  <Col sm={12}>
                  <InputGroup>
                    <input
                      className='form-control'
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                  </Col>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-sm-3 col-form-label"
                  >
                    Category
                  </Label>
                  <Col sm={12}>
                    <select
                      className="select2-selection form-control"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option>Select Income Category</option>
                      <option value="Revenue">Revenue</option>
                      <option value="Debt or Loan">Debt / Loan</option>
                    </select>
                  </Col>
                </div>
                
                {formData.type === 'Revenue' && (
                  <div className="mb-4">
                  <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-sm-3 col-form-label"
                  >
                    Client
                  </Label>
                  <Col sm={12}>
                    <Input
                      name='clientName'
                      type="text"
                      className="form-control"
                      id="horizontal-firstname-Input"
                      placeholder="Enter Client"
                      value={formData.clientName}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </div>
                )}

                
                
                <div className="mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-5 col-form-label"
                  >
                   Amount
                  </Label>
                  <Col sm={12}>
                  <Input
                    name='amount'
                    type="text"
                    className="form-control"
                    id="horizontal-firstname-Input"
                    placeholder="Enter Income Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                  </Col>
                </div>
                
                <div className="mb-4">
                  <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-sm-5 col-form-label"
                  >
                    Description
                  </Label>
                  <Col sm={12}>
                  <textarea
                    name='description'
                    id="message"
                    className="form-control"
                    placeholder="Enter Your Message"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  </Col>
                </div>
                
              <div className="justify-content-end">
                <Col sm={12}>
                  <div className=''>
                    <Button
                      type="submit"
                      color="primary"
                      className="w-md mx-2 my-2"
                      onClick={() => setShow(true)} id="liveAlertBtn"
                    >
                      Save
                    </Button>
                  </div>
                </Col>
              </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
  )
}

export default FormRevenue