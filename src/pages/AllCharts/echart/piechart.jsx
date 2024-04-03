import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import { useStateContext } from "../../../Context/ContextProvider";
import { getTotalAmount } from "../../../utils/getTotalAmount";

const Pie = ({ dataColors }) => {
  const {income} = useStateContext()
  const loan= income.filter(ele=> ele.type === 'Loan')
  const debt = income.filter(ele=> ele.type === 'Debt')
  const revenue = income.filter(ele=>ele.type === 'Revenue')
  const cash = income.filter(ele => ele.type === 'Cash')
  const PieEChartColors = getChartColorsArray(dataColors);
  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      data: ["Revenue", "Debt", "Loan", "Cash"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: PieEChartColors,
    series: [
      {
        name: "Total Income",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          { value: getTotalAmount(revenue,'income'), name: "Revenue" },
          { value: getTotalAmount(debt,'income'), name: "Debt" },
          { value: getTotalAmount(loan,'income'), name: "Loan" },
          { value: getTotalAmount(cash,'income'), name: "Cash" },
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
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  );
};
export default Pie;
