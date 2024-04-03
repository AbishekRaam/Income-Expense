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
