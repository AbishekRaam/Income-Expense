import React from 'react'
import { Container, Row, Col,CardBody,CardTitle,Card } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { Link } from 'react-router-dom';
import { useStateContext } from "../../Context/ContextProvider";
import { getToatalRevenue, revenueChat } from "../../utils/utils.js"

const Revenue = ({dataColors}) => {
  const {income} = useStateContext();

  const spineareaChartColors = getChartColorsArray(dataColors);

  const revenueChatData = [];
  const series = [
    {
      name: "series1",
      data: revenueChatData,
    },
    
  ];
  const options = {
    chart: {
      toolbar: "false",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    colors: spineareaChartColors,
    xaxis: {
      type: "month",
      categories: [
        "Jan",
        "Feb",
        "Mar",
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    
  };
  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <div className="clearfix">
              <div className="float-end">
                <div className="input-group input-group-sm">
                  {/* <div className="input-group-append"> */}
                  <label className="input-group-text">Month</label>
                  {/* </div> */}
                </div>
              </div>
              <h4 className="card-title mb-4">Revenue</h4>
            </div>
            <Row>
              <Col lg="3" className='px-4'>
                <div className="text-muted">
                  <div className="mb-4 ">
                    <p>Total</p>
                    <h4>{`$ ${getToatalRevenue(income)}`}</h4>
                    {/* <div>
                      <span className="badge badge-soft-success font-size-12 me-1">
                        {" "}
                        + 0.2%{" "}
                      </span>{" "}
                      From previous period
                    </div> */}
                  </div>
                  <div className="mt-4">
                    <p className="mb-2">This month</p>
                    <h5>$2281.04</h5>
                  </div>
                  {/* <div>
                    <Link to="#" className="btn btn-primary  btn-sm">
                      View Details{" "}
                      <i className="mdi mdi-chevron-right ms-1"></i>
                    </Link>
                  </div> */}                  
                </div>
              </Col>
              <Col lg="9">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="line"
                  height="350"
                  className="apex-charts"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      
    </React.Fragment>
  )
}

export default Revenue