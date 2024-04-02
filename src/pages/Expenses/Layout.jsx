import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  CardTitle
} from "reactstrap";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { Alert } from 'reactstrap'
const Layout = () => {
  const [alert, setAlert] = useState('d-none')
  const [expense, setExpense] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [client, setClient] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = async () => {
    await addDoc(collection(db, 'Expense'), { expense, date, amount, client, description }).then(() => {
      setAlert('d-block')
      setTimeout(() => setAlert('d-none'), 10000)
    }).catch(err => console.log(err))
  }

  return (
    <Row >
      <Col lg={8} className="mx-auto">
        <Alert color="success" className={alert}>Expense added successfully!</Alert>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Expense Form</CardTitle>
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <Label htmlFor="formrow-firstname-Input">Date</Label>
                <Input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  id="formrow-firstname-Input"
                  placeholder="Enter Your First Name"
                />
              </div>

              <Row>
                <Col md={12}>
                  <div className="mb-3">
                    <Label htmlFor="formrow-email-Input">Category</Label>
                    <select
                      type="email"
                      className="form-control"
                      id="formrow-email-Input"
                      placeholder="Enter Your Expense Type"
                      onChange={(e) => setExpense(e.target.value)}
                    >
                      <option value="Salary">Salary</option>
                      <option value="Rent">Rent</option>
                      <option value="EB Bill">EB Bill</option>
                      <option value="Phone Bill">Phone Bill</option>
                      <option value="Broad Brand">Broad Band</option>
                      <option value="Maid">Maid</option>
                      <option value="Service">Service</option>
                      <option value="Refreshment">Refreshment</option>
                      <option value="Team Lunch">Team Lunch</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Commission">Commission</option>
                    </select>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="mb-3">
                    <Label htmlFor="formrow-password-Input">Amount</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="formrow-password-Input"
                      placeholder="Enter the amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <div className="mb-3">
                <Label htmlFor="formrow-InputCity">Description</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-InputCity"
                  placeholder="Enter the description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary w-md" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Layout