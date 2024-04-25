import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row,Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

import { useStateContext } from "../../Context/ContextProvider";

import { result } from "lodash";
import IncomeChart from "../AllCharts/echart/IncomeChart";
import ExpenseChart from "../AllCharts/echart/ExpenseChart";

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const years = [2023, 2024, 2025, 2026,];

const IncomeAndExpense = ({ dataColors }) => {
  var statisticsApplicationColors = getChartColorsArray(dataColors);
  
  const {income, expense} = useStateContext();

  //const incomeArray = income.map(obj => obj.amount);
  //const expenseArray = expense.map(obj => obj.amount);

  const [singlebtn, setSinglebtn] = useState(false);
  const [singlebtn1, setSinglebtn1] = useState(false);

  //get current month and year
  const thisMonth = new Date().getMonth() + 1;
  for (let i = 0; i < months.length; i++) {
    if (i + 1 === thisMonth) {
      var monthVal = months[i];
      break;
    }
  }
  const yearVal = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(monthVal);
  const [selectedYear, setSelectedYear] = useState(yearVal);
  const handleMonth = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleYear = (event) => {
    setSelectedYear(event.target.value);
  };

  //get month value of income and expense 
  const calculate=(incomeArr,months)=>{
    const monthValue = months.indexOf(selectedMonth)
    const yearValue = selectedYear
    let total=0;
    const filterVal = incomeArr.filter((data)=>{
        const date = new Date(data.date);
        const monthIndex = date.getMonth() == monthValue && date.getFullYear() == yearValue;
        return monthIndex
    })
    filterVal.map(val =>{
        total+=parseInt(val.amount.replace(/,/g, ''));
    })
    return total;
  }
  const monthlyIncome = calculate(income, months);
  const monthlyExpense = calculate(expense, months);

  //get month value of revenue
  const calculateRev=(incomeArr,months)=>{
    const monthValue = months.indexOf(selectedMonth)
    const yearValue = selectedYear
    let total=0;
    const filterVal = incomeArr.filter((data)=>{
        const date = new Date(data.date);
        const monthIndex = date.getMonth() == monthValue && date.getFullYear() == yearValue && data.type === "Revenue";
        return monthIndex
    })
    filterVal.map(val =>{
        total+=parseInt(val.amount.replace(/,/g, ''))
    })
    return total
  }
  const monthlyRevenue = calculateRev(income, months);

  //Condition for Profit or loss
  const Income = monthlyIncome;
  const Expense = monthlyExpense;
  let result="";
  let resultVal = Income - Expense;
  // if (resultVal < 0) {
  //   resultVal = 0;
  // }
  if (Income > 0 || Expense > 0) {
    if (resultVal > 0) {
      result = "Profit";
    } else if (resultVal < 0) {
      result = "Loss";
    }
  } else {
    result = " ";
  }
  //icons
  const profitIcon = (result == "Profit") ? <i className="mdi mdi-arrow-up ms-1"></i> : <i className="mdi mdi-arrow-down ms-1"></i>;
  const lossIcon = (result == "Loss") ? <i className="mdi mdi-arrow-up ms-1"></i> : <i className="mdi mdi-arrow-down ms-1"></i>;
  
  const series = [{
        name: 'Income',
        type: 'column',
        data: [monthlyIncome]
    }, 
    {
      name: 'Expenses',
      type: 'column',
      data: [monthlyExpense]
    },
    
  ];
  var options = {
      chart: {
          height: 350,
          type: 'line',
          stacked: false,
          toolbar: {
              show: false,
          },
      },
      legend: {
          show: true,
          offsetY: 10,
      },
      stroke: {
          width: [0, 0, 2, 2],
          curve: 'smooth'
      },
      plotOptions: {
          bar: {
              columnWidth: '10%'
          }
      },
      fill: {
          opacity: [1, 1, 0.1, 1],
          gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
          }
      },
      colors: statisticsApplicationColors,
      markers: {
          size: 0
      },
      xaxis: {
          type: 'months', 
          categories: [selectedMonth],
          title: { text:"Month" }
      },
      yaxis: {
        title: {
          text: "Amount",
        },
      },
      tooltip: {
          shared: true,
          intersect: false,
          y: {
              formatter: function (y) {
                  if (typeof y !== "undefined") {
                      return y.toLocaleString('en-IN');
                  }
                  return y;

              }
          }
      }
  };

  return (
    <React.Fragment>
      <Col xl={12}>
      <Card>
        <CardBody>
          <div className="clearfix ">
            <div className="float-end mx-2 px-3">
              <div className="input-group input-group-sm">
                <Dropdown
                  isOpen={singlebtn}
                  toggle={() => setSinglebtn(!singlebtn)}
                >
                  <DropdownToggle tag="button" className="btn btn-primary" caret>
                    {selectedMonth}
                    <i className="mdi mdi-chevron-down" />
                  </DropdownToggle>
                  <DropdownMenu>
                    {months.map((month, index)=>(
                      <DropdownItem key={index} onClick={() => setSelectedMonth(month)}>{month}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

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
            <h5 className="card-title mb-4">Income / Expenses Analytics</h5>
          </div>
          
          <Row className="text-center">
            <Col lg={3}>
              <div className="mt-4">
                <h4 className="mb-2">{selectedMonth} {"- "+ selectedYear}</h4>
                <h3 className={result === "Profit" ? "text-success" : "text-danger"}>{result}</h3>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mt-4">
                <h4 className="text-muted mb-2">Income</h4>
                <h5>
                  $ {monthlyIncome.toLocaleString('en-IN')}
                  <span className="text-success font-size-18">
                    {profitIcon}
                  </span>
                </h5>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mt-4">
                <h4 className="text-muted mb-2">Revenue</h4>
                <h5>
                  $ {monthlyRevenue.toLocaleString('en-IN')}
                </h5>
              </div>
            </Col>            
            <Col lg={3}>
              <div className="mt-4">
                <h4 className="text-muted mb-2">Expenses</h4>
                <h5>
                  $ {monthlyExpense.toLocaleString('en-IN')}
                  <span className="text-danger font-size-18">       
                    {lossIcon}          
                    {/* <i className="mdi mdi-arrow-up ms-1"></i> */}
                  </span>
                </h5>
              </div>
            </Col>
            {/* <Col lg={3}>
              <div className="mt-4">
                <h4 className="text-muted mb-2">Available Balance</h4>
                <h5 className={result === "Profit" ? "text-success" : "text-danger"}>
                  $ {resultVal.toLocaleString('en-IN')}
                </h5>
              </div>
            </Col> */}
          </Row>
          <hr className="mb-4" />
          
          <div id="area-chart" dir="ltr">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height="350"
              className="apex-charts pb-3"
            />
          </div>
        </CardBody>
      </Card>
      </Col>
      <Row>
        <IncomeChart months={months} selectedMonth={selectedMonth} selectedYear={selectedYear}/>

        <ExpenseChart months={months} selectedMonth={selectedMonth} selectedYear={selectedYear}/>
      </Row>
    </React.Fragment>
  )
}

export default IncomeAndExpense