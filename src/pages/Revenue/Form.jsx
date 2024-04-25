import React, {useState} from 'react';
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

import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import 'firebase/database';
import {db} from "../../firebase-config.js";
import { useNavigate } from 'react-router-dom';
import { formatAmount } from "../../utils/utils"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
// Form Mask
import InputMask from "react-input-mask"

const FormRevenue = (props) => {
  const nav = useNavigate();

  const [alertSuccess, setAlertSuccess] = useState('d-none');
  const [alert, setAlert] = useState('d-none')

  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !date || !amount || !description) {
      setAlert('d-block');
      setTimeout(() => setAlert('d-none'), 2000);
      return;
    }

    await addDoc(collection(db, 'Income'), { type, date, amount, clientName, description,timestamp:Timestamp.now() }).then(() => {
      setAlertSuccess('d-block')
      setTimeout(() => setAlertSuccess('d-none'), 2000);   
    }).catch(err => console.log(err));
    setAmount("");
    setDate("");
    setType("");
    setClientName("");
    setDescription("");
  }

  return (
      <Row className='d-flex justify-content-center'>
        <Col lg={8} >
        <Alert color="danger" className={alert}>Please fill in all fields!</Alert>
        <Alert color="success" className={alertSuccess}>Income added successfully!</Alert>
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
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
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
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>Select Income Category</option>
                      <option value="Revenue">Revenue</option>
                      <option value="Debt">Debt</option>
                      <option value="Loan">Loan</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </Col>
                </div>
                
                {type === 'Revenue' && (
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
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </Col>
                </div>
                )}
               
                <div className="mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-5 col-form-label"
                  >
                   Amount (INR)
                  </Label>
                  <Col sm={12}>
                  <Input
                    name='amount'
                    type="text"
                    className="form-control"
                    id="horizontal-firstname-Input"
                    placeholder="Enter Income Amount"
                    value={amount}
                    onChange={(e) => setAmount(formatAmount(e.target.value))}
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
                  <input
                    name='description'
                    id="message"
                    className="form-control"
                    placeholder="Enter Your Message"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  </Col>
                </div>
                
                <Col sm={12}>
                  <div className='d-flex justify-content-end'>
                    <Button
                      type="submit"
                      color="primary"
                      className="w-md mx-2 my-2"
                      onClick={handleSubmit} id="liveAlertBtn"
                    >
                      Save
                    </Button>

                    <Button
                      type="button"
                      color="success"
                      className="w-md mx-2 my-2"
                      onClick={()=> nav('/income')}
                    >
                      Back
                    </Button>
                  </div>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
  )
}

export default FormRevenue