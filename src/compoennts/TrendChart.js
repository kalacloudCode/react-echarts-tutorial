import Chart from "./Chart";
import { getData } from "../service/chartAPI";
import { getTimestamp, getDates } from "../utils/days";
import { useEffect, useState } from "react";
import { Spin } from "antd";

function getOptions(xAxisData, seriesData) {
  return {
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: 40,
      left: 40,
      bottom: 40,
      right: 40,
      containLabel: true,
    },
    series: [
      {
        data: seriesData,
        type: "line",
        smooth: true,
      },
    ],
  };
}

function BitcoinTrendChart({ slug, day = 7 }) {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getData({
      slug,
      start: getTimestamp(day),
      interval: "1d",
    }).then((res) => {
      const seriesData = res.data.map((item) => item.u);
      const xAxisData = getDates(day);

      setOptions(getOptions(xAxisData, seriesData));
      setLoading(false);
    });
  }, [slug, day]);

  return (
    <Spin spinning={loading}>
      <Chart options={options} />
    </Spin>
  );
}

export default BitcoinTrendChart;
