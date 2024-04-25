import React, { useState } from "react";
import { Row, Col, Card, CardBody, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { useStateContext } from "../../Context/ContextProvider";
import { getTotalAmount,getRevenue } from "../../utils/getTotalAmount";
import { getToatalRevenue  } from "../../utils/utils";

const years = [2023, 2024, 2025, 2026,];

const SalesAnalytics = ({ dataColors }) => {
  const [singlebtn1, setSinglebtn1] = useState(false);
  
  const yearVal = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(yearVal);
  const handleYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const {income,expense} = useStateContext()
  const apexsaleschartColors = getChartColorsArray(dataColors);

  const incomeAmount = getTotalAmount(income,'amount')
  const expenseAmount = getTotalAmount(expense,'amount')
  const revenueAmount = getRevenue(income);

  //get year value of income and expense
  function calculate(values){
    const yearValue = selectedYear;
    let total=0;
    const filterVal = values.filter((data)=>{
        const date = new Date(data.date);
        const monthIndex = date.getFullYear() == yearValue;
        return monthIndex   
    })
    filterVal.map(val =>{
        total+=parseInt(val.amount.replace(/,/g, ''));
    })
    return total
  }
  const yearlyIncome = calculate(income);
  const yearlyExpense = calculate(expense);

  const series = [yearlyIncome, yearlyExpense];
  //const series = [incomeAmount, expenseAmount];
  const options = {
    labels: ["Income", "Expenses"],
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
      <Col xl="5">
        <Card>
          <CardBody>            
            <div className="clearfix">
              <div className="float-end">
                <div className="input-group input-group-sm">
                  <Dropdown
                    isOpen={singlebtn1}
                    toggle={() => setSinglebtn1(!singlebtn1)}
                  >
                    <DropdownToggle tag="button" className="btn btn-primary" caret>
                      {selectedYear}
                      <i className="mdi mdi-chevron-down" />
                    </DropdownToggle>
                    <DropdownMenu>
                      {years.map((year, index)=>(
                        <DropdownItem key={index} onClick={() => setSelectedYear(year)}>{year}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <h4 className="card-title mb-4">Total Analytics</h4>
            </div>

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
            <div className="text-center text-muted my-4">
              <Row className="d-flex justify-content-around">
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Income                     
                    </p>
                    <h5>$ {yearlyIncome.toLocaleString('en-IN')}</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Expenses
                    </p>
                    <h5>$ {yearlyExpense.toLocaleString('en-IN')}</h5>
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
