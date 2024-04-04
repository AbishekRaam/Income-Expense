import React from 'react'
import Pie from "../AllCharts/echart/piechart"
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"
const IncomeChart = () => {
  return (
    <Col lg="6">
    <Card>
      <CardBody>
          <div className="float-end mx-2">
            <div className="input-group input-group-sm">
              <select className="form-control select2-selection">
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="July">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>
          <div className="float-end">
            <div className="input-group input-group-sm">
              <select className="select2-selection form-control">
                <option value="Year">2024</option>
              </select>
            </div>
          </div>
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