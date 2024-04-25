import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  CardTitle
} from "reactstrap";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { db } from "../../firebase-config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { formatAmount } from "../../utils/utils"

const Layout = () => {
  const nav = useNavigate();

  const [alertSuccess, setAlertSuccess] = useState('d-none');
  const [alert, setAlert] = useState('d-none');

  const [expense, setExpense] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense || !date || !amount || !description) {
      setAlert('d-block');
      setTimeout(() => setAlert('d-none'), 2000);
      return;
    }

    await addDoc(collection(db, 'Expense'), { expense, date, amount, description,timestamp:Timestamp.now() }).then(() => {
      setAlertSuccess('d-block')
      setTimeout(() => setAlertSuccess('d-none'), 2000);   
    }).catch(err => console.log(err));
    setAmount("");
    setDate("");
    setExpense("");
    setDescription("");
  }

  return (
    <Row >
      <Col lg={8} className="mx-auto">
      <Alert color="danger" className={alert}>Please fill in all fields!</Alert>
        <Alert color="success" className={alertSuccess}>Expense added successfully!</Alert>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Expense Form</CardTitle>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Label htmlFor="formrow-firstname-Input">Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={date}
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
                      className="form-control"
                      id="formrow-email-Input"
                      placeholder="Enter Your Expense Type"
                      name="expense"
                      value={expense}
                      onChange={(e) => setExpense(e.target.value)}
                    >
                      <option>Select Expense Category</option>
                      <option value="Salary">Salary</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Rent">Rent</option>
                      <option value="EB Bill">EB Bill</option>
                      <option value="Phone Bill">Phone Bill</option>
                      <option value="Broad Band">Broad Band</option>
                      <option value="Maid">Maid</option>
                      <option value="Service">Service</option>
                      <option value="Refreshment">Refreshment</option>
                      <option value="Team Lunch">Team Lunch</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Commission">Commission</option>
                      <option value="GPay">GPay</option>
                    </select>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="mb-3">
                    <Label htmlFor="formrow-password-Input">Amount (INR)</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="formrow-password-Input"
                      placeholder="Enter the amount"
                      name="amount"
                      value={amount}
                      onChange={(e) => setAmount(formatAmount(e.target.value))}
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
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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
                    onClick={()=> nav('/expense')}
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

export default Layout