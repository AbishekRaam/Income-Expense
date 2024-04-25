import React from 'react';
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import { useStateContext } from "../../../Context/ContextProvider";

const IncomeChart = ({months, selectedMonth, selectedYear}) => {
  const {income} = useStateContext();

  //get month value of income 
  let totalRevenue = 0, totalDebt = 0, totalLoan = 0, totalCash = 0;
  const calculate=(incomeArr,months)=>{
    const monthValue = months.indexOf(selectedMonth)
    const yearValue = selectedYear;
    
    incomeArr.forEach(data => {
      const date = new Date(data.date);
      const amount = parseInt(data.amount.replace(/,/g, ''));
      if(date.getMonth() == monthValue && date.getFullYear() == yearValue){
        if (data.type === 'Revenue') {
            totalRevenue += amount;
        } else if (data.type === 'Debt') {
            totalDebt += amount;
        } else if (data.type === 'Loan') {
          totalLoan += amount;
        } else if (data.type === 'Cash') {
          totalCash += amount;
        }
      }
    });
    return [totalRevenue, totalDebt, totalLoan, totalCash];
  }
  const monthlyIncome = calculate(income, months);

  const PieApexChartColors = getChartColorsArray('["--bs-primary", "--bs-danger","--bs-success", "--bs-warning"]');

  const series = monthlyIncome;
  const options = {
    chart: {
      height: 380,
      type: "pie",
    },
    labels: ["Revenue", "Debt", "Loan", "Cash"],
    colors: PieApexChartColors,
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <>
      <Col xl="4">
      <Card>
        <CardBody>
          <CardTitle className="mb-2">Monthly Income</CardTitle>
          <div className="mt-4">
            <ReactApexChart options={options} series={series} type="pie" height="280" />
          </div>
          
          <div className="text-center text-muted my-3">
            <Row className="d-flex justify-content-around">
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary me-1" /> Revenue                
                  </p>
                  <h5>$ {totalRevenue.toLocaleString('en-IN')}</h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger me-1" /> Debt
                  </p>
                  <h5>$ {totalDebt.toLocaleString('en-IN')}</h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success me-1" /> Loan                
                  </p>
                  <h5>$ {totalLoan.toLocaleString('en-IN')}</h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-warning me-1" /> Cash
                  </p>
                  <h5>$ {totalCash.toLocaleString('en-IN')}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
      </Col>
    </>
  )
}

export default IncomeChart