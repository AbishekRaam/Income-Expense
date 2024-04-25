import React from "react";
import { Row, Col } from "reactstrap";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import { useStateContext } from "../../../Context/ContextProvider";
import { getTotalAmount } from "../../../utils/getTotalAmount";

const Pie = ({ dataColors }) => {
  const {income} = useStateContext()

  const debt = income.filter(ele=> ele.type === 'Debt')
  const revenue = income.filter(ele=>ele.type === 'Revenue')
  const cash = income.filter(ele => ele.type === 'Cash')
  const loan= income.filter(ele=> ele.type === 'Loan')
  const PieEChartColors = getChartColorsArray(dataColors);

  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    // legend: {
    //   orient: "horizontal",
    //   left: "center",
    //   data: ["Revenue", "Debt / Loan"],
    //   textStyle: {
    //     color: ["#8791af"],
    //   },
    // },
    color: PieEChartColors,
    series: [
      {
        name: "Income",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          { value: getTotalAmount(revenue,'amount'), name: "Revenue" },
          { value: getTotalAmount(debt,'amount'), name: "Debt" },
          { value: getTotalAmount(cash,'amount'), name: "Cash" },
          { value: getTotalAmount(loan,'amount'), name: "Loan" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "300px" }} option={options} />
      <div className="text-center text-muted">
        <Row className="d-flex justify-content-around">
          <Col xs="3">
            <div className="mt-3">
              <p className="mb-2 text-truncate">
                <i className="mdi mdi-circle text-primary me-1" /> Revenue                
              </p>
              <h5>$ {getTotalAmount(revenue,'amount').toLocaleString('en-IN')}</h5>
            </div>
          </Col>
          <Col xs="3">
            <div className="mt-3">
              <p className="mb-2 text-truncate">
                <i className="mdi mdi-circle text-danger me-1" /> Debt
              </p>
              <h5>$ {getTotalAmount(debt,'amount').toLocaleString('en-IN')}</h5>
            </div>
          </Col>
          <Col xs="3">
            <div className="mt-3">
              <p className="mb-2 text-truncate">
                <i className="mdi mdi-circle text-success me-1" /> Loan                
              </p>
              <h5>$ {getTotalAmount(loan,'amount').toLocaleString('en-IN')}</h5>
            </div>
          </Col>
          <Col xs="3">
            <div className="mt-3">
              <p className="mb-2 text-truncate">
                <i className="mdi mdi-circle text-warning me-1" /> Cash
              </p>
              <h5>$ {getTotalAmount(cash,'amount').toLocaleString('en-IN')}</h5>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default Pie;
