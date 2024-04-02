import React from 'react';
import {
  Row,Col,Button, Card, CardHeader, CardBody, CardTitle, CardText
} from "reactstrap";

const CardData = ({date,description,amount}) => {
  return (
        <Col xl={3} md={6}>
          <Card>
            <CardBody>                
                <h6 className="fs-17 mb-2"><b>{date}</b></h6>
             
                    <li className="list-inline-item">
                        <p className="text-muted fs-14 mb-3">{description}</p>
                    </li>
                    <br />
                    <li className="list-inline-item">
                        <p className="text-muted fs-14 mb-0 me-2"><i className="bx bx-wallet"></i>{amount}</p>
                    </li>
                
            </CardBody>
          </Card>
        </Col>
  )
}

export default CardData