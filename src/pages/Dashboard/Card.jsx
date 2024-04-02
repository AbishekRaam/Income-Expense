import React from 'react'
import { Link } from 'react-router-dom';
import {Card, Col, CardBody,Row} from "reactstrap";

const Cardcontainer = () => {
  return (
    <Row>
    <Col xl={3} md={6}>
      <Card>
          <CardBody>
              <div className="list-inline mb-0">
                  <h6><b>Total Summary</b></h6>
              </div>
              
              <div className="mt-4 hstack gap-2">
                  <Link to="" className="btn btn-soft-success w-100">View All <i className="mdi mdi-arrow-right ms-1"></i></Link>
              </div>
          </CardBody>
      </Card>
    </Col>

    <Col xl={3} md={6}>
    <Card>
          <CardBody>
              <div className="list-inline mb-0">
                  <h3>51 Imcome</h3>
              </div>
              
              <div className="mt-4 hstack gap-2">
                  <Link to="" className="btn btn-soft-success w-100">View All <i className="mdi mdi-arrow-right ms-1"></i></Link>
              </div>
          </CardBody>
      </Card>
    </Col>

    <Col xl={3} md={6}>
      <Card>
          <CardBody>
              <div className="list-inline mb-0">
                  <h3>50 Expenses</h3>
              </div>
              
              <div className="mt-4 hstack gap-2">
                  <Link to="" className="btn btn-soft-success w-100">View All <i className="mdi mdi-arrow-right ms-1"></i></Link>
              </div>
          </CardBody>
      </Card>
    </Col>
    <Col xl={3} md={6}>
      <Card>
          <CardBody>
              <div className="list-inline mb-0">
                  <h3>50 Notes</h3>
              </div>
              
              <div className="mt-4 hstack gap-2">
                  <Link to="" className="btn btn-soft-success w-100">View All <i className="mdi mdi-arrow-right ms-1"></i></Link>
              </div>
          </CardBody>
      </Card>
    </Col>

    </Row>

  )
}

export default Cardcontainer