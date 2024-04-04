import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { useStateContext } from "../../Context/ContextProvider";
import { getRevenue, getTotalAmount } from "../../utils/getTotalAmount";

const SalesAnalytics = ({ dataColors }) => {
  const {income,expense} = useStateContext()
  const apexsaleschartColors = getChartColorsArray(dataColors);
  const incomeAmount = getTotalAmount(income,'income')
  const expenseAmount = getTotalAmount(expense,'amount')
  const revenueAmount = getRevenue(income)
  const series = [incomeAmount, revenueAmount, expenseAmount];
  const options = {
    labels: ["Income", "Revenue", "Expenses"],
    colors: apexsaleschartColors,
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Col xl="6">
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
            <h4 className="card-title mb-4">Total Analytics</h4>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={260}
                  className="apex-charts"
                />
              </div>
            </div>
            <div className="text-center text-muted">
              <Row>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Income
                      
                    </p>
                    <h5>$ {incomeAmount.toLocaleString()}</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Revenue
                      
                    </p>
                    <h5>$ {revenueAmount.toLocaleString()}</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Expenses
                      C
                    </p>
                    <h5>$ {expenseAmount.toLocaleString()}</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesAnalytics;
