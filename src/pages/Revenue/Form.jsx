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
    revenueDate: "",
    revenueAmount: "",
    revenueType: "option 1",
    revenueDescription: "",
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
      const docRef = await addDoc(collection(db, "Revenue"), {
        formData: formData,    
      });
      console.log("Document written with ID: ", docRef.id);
      setFormData({
        revenueDate: "",
        revenueAmount: "",
        revenueType: "option 1",
        revenueDescription: "",
        clientName: "",
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
      <Row className='d-flex justify-content-center'>
        <Col lg={9}>
          <div id="liveAlertPlaceholder">
            <Alert isOpen={show} toggle={() => {
              setShow(false)
            }}>
              Your Revenue Details Added
            </Alert>
          </div>
        </Col>  
        <Col lg={8} >
          <Card>
            <CardBody>
              <CardTitle className="mb-4">Revenue Form</CardTitle>

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
                      name="revenueDate"
                      value={formData.revenueDate}
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
                      name="revenueType"
                      value={formData.revenueType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                      <option value="Option 3">Option 3</option>
                    </select>
                  </Col>
                </div>
                
                <div className="mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-5 col-form-label"
                  >
                    Revenue Amount
                  </Label>
                  <Col sm={12}>
                  <Input
                    name='revenueAmount'
                    type="text"
                    className="form-control"
                    id="horizontal-firstname-Input"
                    placeholder="Enter Income Amount"
                    value={formData.revenueAmount}
                    onChange={handleChange}
                    required
                  />
                  </Col>
                </div>
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
                <div className="mb-4">
                  <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-sm-5 col-form-label"
                  >
                    Revenue Description
                  </Label>
                  <Col sm={12}>
                  <textarea
                    name='revenueDescription'
                    id="message"
                    className="form-control"
                    placeholder="Enter Your Message"
                    value={formData.revenueDescription}
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