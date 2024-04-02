import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

import { useStateContext } from "../../Context/ContextProvider";
const Pie = ({ dataColors }) => {
const {income,expense} = useStateContext()
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
      orient: "vertical",
      left: "left",
      data: ["Income", "Expenses", "Notes"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: PieEChartColors,
    series: [
      {
        name: "Total sales",
        type: "pie",
        radius: "75%",
        center: ["50%", "60%"],
        data: [
          { value: income.length, name: "Income" },
          { value: expense.length, name: "Expenses" },
          { value: income.length, name: "Revenue" },
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
