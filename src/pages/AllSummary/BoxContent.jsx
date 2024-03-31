import React from 'react'
import { Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row, Label, Input, FormFeedback, Form } from 'reactstrap';

const BoxContent = () => {
  return (
    <div>
      <Row>
        <Col xl={3} md={6}>
            <Card className='bg-primary-subtle'>
              <CardBody>
                <h5 className="fs-17 mb-3">20/03/2022</h5>
                <ul className="list-inline mb-0">
                    <li className="list-inline-items">
                        <p className="text-muted fs-14 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illo neque labore. Maiores, dolor nobis?</p>
                    </li>
                    <li className="list-inline-item">
                        <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250</p>
                    </li>
                </ul>
              </CardBody>
            </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className='bg-primary-subtle'>
            <CardBody>
              <h5 className="fs-17 mb-3 ">20/03/2022</h5>
              <ul className="list-inline mb-0">
                  <li className="list-inline-items">
                      <p className="text-muted fs-14 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illo neque labore. Maiores, dolor nobis?</p>
                  </li>
                  <li className="list-inline-item">
                      <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 </p>
                  </li>
              </ul>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} md={6}>
            <Card className='bg-primary-subtle'>
              <CardBody>
                <h5 className="fs-17 mb-3 ">20/03/2022</h5>
                <ul className="list-inline mb-0">
                    <li className="list-inline-items">
                        <p className="text-muted fs-14 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illo neque labore. Maiores, dolor nobis?</p>
                    </li>
                    <li className="list-inline-item">
                        <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 </p>
                    </li>
                </ul>
              </CardBody>
            </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className='bg-primary-subtle'>
            <CardBody>
              <h5 className="fs-17 mb-3 ">20/03/2022</h5>
              <ul className="list-inline mb-0">
                  <li className="list-inline-items">
                      <p className="text-muted fs-14 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illo neque labore. Maiores, dolor nobis?</p>
                  </li>
                  <li className="list-inline-item">
                      <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 </p>
                  </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default BoxContent