import React from 'react'
import Pie from "../AllCharts/echart/piechart"
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"
const IncomeChart = () => {
  return (
    <Col xl="7">
    <Card>
      <CardBody>
        <CardTitle>Income</CardTitle>
        <div id="pie-chart" className="e-chart">
          <Pie dataColors='["--bs-primary", "--bs-danger","--bs-warning","--bs-success","--bs-info"]'/>
        </div>
        
      </CardBody>
    </Card>
  </Col>
  )
}

export default IncomeChart