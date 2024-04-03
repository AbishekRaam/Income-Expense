import React from 'react'
import Pie from "../AllCharts/echart/piechart"
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"
const IncomeChart = () => {
  return (
    <Col lg="6">
    <Card>
      <CardBody>
        <CardTitle>Income</CardTitle>
        <div id="pie-chart" className="e-chart">
          <Pie dataColors='["--bs-primary","--bs-warning", "--bs-danger","--bs-info", "--bs-success"]'/>
        </div>
      </CardBody>
    </Card>
  </Col>
  )
}

export default IncomeChart