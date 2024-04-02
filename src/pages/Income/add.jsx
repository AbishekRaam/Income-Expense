import React,{useState} from 'react';
import PropTypes from "prop-types";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  Alert,
} from "reactstrap";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { withTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
const Add = (props) => {
  const nav = useNavigate()
  const [alert,setAlert] = useState('d-none')
  const [incomeAmount,setIncomeAmount] = useState('')
  const [description,setDescription] = useState('')
  const [incomeType,setIncomeType] = useState('')
  const [date,setDate] = useState('')
  const handleSubmit=()=>{
    const data ={income:incomeAmount,description:description,date:date,type:incomeType}
     addDoc(collection(db,'Income'),data).then(()=>{
      setAlert('d-block')
      setTimeout(()=>setAlert('d-none'),10000)
     }).catch(err=>console.log(err))
  }
 
  return (
    <div className='page-content'>
      <Container fluid>
      </Container>
      <Row className='d-flex justify-content-center'>
        <Col lg={8} >
        <Alert color='success' className={`${alert}`}>Icome added successfully</Alert>
          <Card>
            <CardBody>
              <CardTitle className="mb-4">Insert New Income</CardTitle>
              <Form>
              <div className="row mb-4">
                  <Col sm={12}>
                    <Label
                      htmlFor="horizontal-password-Input"
                      className="col-sm-3 col-form-label"
                    >
                      Date
                    </Label>
                    <Input
                      type='date'
                      value={date}
                      onChange={(e)=>setDate(e.target.value)}
                      className="form-control input-color"
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Label
                      htmlFor="horizontal-email-Input"
                      className="col-sm-3 col-form-label"
                    >
                      Category
                    </Label>
                   <select className="form-control" value={incomeType} onChange={(e)=>setIncomeType(e.target.value)}>
                    <option>Select Income Type</option>
                    <option value="Revenue">Revenue</option>
                    <option value="Debt">Debt</option>
                    <option value="Loan">Loan</option>
                    <option value="Cash">Cash</option>
                   </select>
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Label
                      htmlFor="horizontal-email-Input"
                      className="col-sm-3 col-form-label"
                    >
                      Income Amount
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-phoneno-input3"
                      placeholder="Enter Your Amount"
                      value={incomeAmount}
                      onChange={(e)=>setIncomeAmount(e.target.value)}
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Col sm={12}>
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-3 col-form-label"
                    >
                      Income Description
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="horizontal-firstname-Input"
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </Col>
                </div>        
                <Col sm={12}>
                  <div className='d-flex justify-content-end'>
                    <Button
                      type="button"
                      color="primary"
                      className="w-md mx-2 my-2"
                      onClick={()=>handleSubmit()}
                    >
                      Save
                    </Button>

                    <Button
                      type="submit"
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
    </div>
  )
}
Add.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};
export default withTranslation()(Add);