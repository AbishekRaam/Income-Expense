import React from 'react';
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import { useStateContext } from "../../../Context/ContextProvider";

const ExpenseChart = ({ months, selectedMonth, selectedYear }) => {  
  const {expense} = useStateContext();

  //get month value of income 
  let totalSalary = 0, totalCash = 0, totalCheque = 0, totalRent = 0, totalEBbill = 0, totalPhonebill = 0, totalBroadband = 0, totalMaid = 0, totalService = 0, totalRefreshment = 0, totalTeamlunch = 0, totalTransportation = 0, totalCommission = 0, totalGpay = 0;

  const calculate=(expenseArr,months)=>{
    const monthValue = months.indexOf(selectedMonth)
    const yearValue = selectedYear;

    expenseArr.forEach(data => {
      const date = new Date(data.date);
      const amount = parseInt(data.amount.replace(/,/g, ''));
      if(date.getMonth() == monthValue && date.getFullYear() == yearValue){
        if (data.expense === 'Salary') {
          totalSalary += amount;
        } else if (data.expense === 'Cash') {
          totalCash += amount;
        } else if (data.expense === 'Cheque') {
          totalCheque += amount;
        } else if (data.expense === 'Rent') {
          totalRent += amount;
        } else if (data.expense === 'EB Bill') {
          totalEBbill += amount;
        } else if (data.expense === 'Phone Bill') {
          totalPhonebill += amount;
        } else if (data.expense === 'Broad Band') {
          totalBroadband += amount;
        } else if (data.expense === 'Maid') {
          totalMaid += amount;
        } else if (data.expense === 'Service') {
          totalService += amount;
        } else if (data.expense === 'Refreshment') {
          totalRefreshment += amount;
        } else if (data.expense === 'Team Lunch') {
          totalTeamlunch += amount;
        } else if (data.expense === 'Transportation') {
          totalTransportation += amount;
        } else if (data.expense === 'Commission') {
          totalCommission += amount;
        } else if (data.expense === 'GPay') {
          totalGpay += amount;
        }
      }
    });

    return [totalSalary, totalCash, totalCheque, totalRent, totalEBbill, totalPhonebill, totalBroadband, totalMaid, totalService, totalRefreshment, totalTeamlunch, totalTransportation, totalCommission, totalGpay];
  }
  const monthlyExpense = calculate(expense, months);

  const doughnutEChartColors = getChartColorsArray('["--bs-success","--bs-danger","--bs-primary","--bs-warning","--bs-info","--bs-secondary","--bs-danger","--bs-primary", "--bs-danger","--bs-info","--bs-success","--bs-warning","--bs-primary","--bs-secondary"]');

  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    // legend: {
    //   orient: "vertical",
    //   x: "left",
    //   data: ["Salary","Rent","EB Bill", "Phone Bill","Broad Band","Maid","Service","Refreshment","Team Lunch","Transportation","Commission"],
    //   textStyle: {
    //     color: ["#8791af"],
    //   },
    // },
    color: doughnutEChartColors,
    series: [
      {
        name: "Expenses",
        type: "pie",
        radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold",
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          { value: totalSalary, name: "Salary" },
          { value: totalCash, name: "Cash" },
          { value: totalCheque, name: "Cheque" },
          { value: totalRent, name: "Rent" },
          { value: totalEBbill, name: "EB Bill" },
          { value: totalPhonebill, name: "Phone Bill" },
          { value: totalBroadband, name: "Broad Band" },
          { value: totalMaid, name: "Maid" },
          { value: totalService, name: "Service" },
          { value: totalRefreshment, name: "Refreshment" },
          { value: totalTeamlunch, name: "Team Lunch" },
          { value: totalTransportation, name: "Transportation" },
          { value: totalCommission, name: "Commission" },
          { value: totalGpay, name: "GPay" },
        ],
      },
    ],
  };

  return (
    <>
      <Col xl="8">
        <Card>
          <CardBody>
            <CardTitle>Monthly Expense</CardTitle>

            <Row className='flex my-2'>
              <Col lg="6">
                <div id="doughnut-chart" className="e-chart">
                  <ReactEcharts style={{ height: "350px" }} option={options} />
                </div>
              </Col>

              <Col lg="3" sm="6" className='text-center text-muted'>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success me-1" /> Salary          
                  </p>
                  <h5>$ {totalSalary.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger me-1" /> Cash
                  </p>
                  <h5>$ {totalCash.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary me-1" /> Cheque 
                  </p>     
                  <h5>$ {totalCheque.toLocaleString('en-IN')}</h5>             
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-warning me-1" /> Rent
                  </p>
                  <h5>$ {totalRent.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-info me-1" /> EB Bill                
                  </p>
                  <h5>$ {totalEBbill.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-secondary me-1" /> Phone Bill
                  </p>
                  <h5>$ {totalPhonebill.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger me-1" /> Broad Band
                  </p>
                  <h5>$ {totalBroadband.toLocaleString('en-IN')}</h5>
                </div>                
              </Col>
              
              <Col lg="3" sm="6" className='text-center text-muted'>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary me-1" /> Maid
                  </p>
                  <h5>$ {totalMaid.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger me-1" /> Service
                  </p>
                  <h5>$ {totalService.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-info me-1" /> Refreshment
                  </p>
                  <h5>$ {totalRefreshment.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success me-1" /> Team Lunch
                  </p>
                  <h5>$ {totalTeamlunch.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-warning me-1" /> Transportation
                  </p>
                  <h5>$ {totalTransportation.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary me-1" /> Commission
                  </p>
                  <h5>$ {totalCommission.toLocaleString('en-IN')}</h5>
                </div>
                <div className="mt-3">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-secondary me-1" /> GPay
                  </p>
                  <h5>$ {totalGpay.toLocaleString('en-IN')}</h5>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default ExpenseChart