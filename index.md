---
title: "React Echarts 使用教程 - 如何在 React 中加入图表（内附数据看板实战搭建案例）"
author: "stone"
date: "2022-05-25"
featuredImage: "./images/head.jpg"
snippet: "Ehcarts 作为数据展示的组件，应用场景丰富，所以在 React 里引入 Echarts 图表是每个前端必会技能。而 Echarts配置项多且复杂，每个配置项都会细分很多个配置小项，并且还对外暴露了一套 API，包括图表实例，事件监听等，还是有一定的上手难度。本文手把手教大家如何在 React 里使用 Echarts，并结合实际使用场景，分享我是如何处理图表自适应等具体问题。 最后来一个实战教学，教大家如何结合 ant-design React UI 框架，开发企业级的「数字币走势数据看板」，帮助大家加深对 Echarts 的理解。"
type: "blog"
categories: ["react", "echarts"]
---

import { EmbedApp } from "src/components/embed-app"

![React Echarts 使用教程 - 如何在 React 中加入图表（内附数据看板实战搭建案例）](./images/head.jpg)

Ehcarts 作为数据展示的组件，应用场景丰富，所以在 [React 里引入 Echarts 图表](/blog/react-echarts-tutorial/)是每个前端必会技能。而 `Echarts`配置项多且复杂，每个配置项都会细分很多个配置小项，并且还对外暴露了一套 API，包括图表实例，事件监听等，还是有一定的上手难度。

本文手把手教大家如何在 `React` 里使用 `Echarts`，并结合实际使用场景，分享我是如何处理图表自适应等具体问题。
最后来一个实战教学，教大家如何结合 ant-design React UI 框架，开发企业级的「[数字币走势数据看板](/templates/data-dashboard/)」，帮助大家加深对 `Echarts` 的理解。

当然，如果你根本不想处理任何前端问题，就想专注在产品开发上，那么推荐使用[卡拉云](/)，卡拉云是新一代低代码开发工具，内置包括 Ehcarts 在内的多种常见的前端组件，拖拽即可生成，还可一键接入常见数据库及 API ，无需懂前端，快速搭建属于你自己的后台管理工具，一周工作量缩减至 1 天，详见本文文末。

## 如何在 React 里引入 Echarts

首先，我们需要初始化 `React` 项目，这里使用 `create-react-app` 即可轻松完成，以下两个命令都可以，是等价的：

```js
yarn create react-app kalacloud-react-echarts
// OR
create-react-app kalacloud-react-echarts
```

![kalacloud-卡拉云-低代码平台](./images/01-kalacloud-react-echarts-init.png)

初始化成功后，我们就可以在项目中安装 `Echarts`，这里我们使用 `Echarts` 的最新版本：

```js
yarn add echarts
```

安装好 `Echarts` 之后，我们就可以在项目中引入使用了。`Echarts` 支持两种引入方式：

1. 全量引入

```js
import * as echarts from 'echarts';
```

2. 按需引入 

```js
// 引入 echarts 核心模块
import * as echarts from 'echarts/core';
// 按需引入图表类型
import { BarChart } from 'echarts/charts';
// 按需引入标题，提示框组件
import { TitleComponent, TooltipComponent } from 'echarts/components';
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  // ...
});
```

这里为了简单起见，我们直接使用全局引入的方式即可。引入 `echarts` 后，我们先来实现一个折线+柱状图。

扩展阅读：《[7 款最棒的开源 React 移动端 UI 组件库和模版框架](/blog/best-react-mobile-ui-component-libraries/)》

## React Echarts 实现折线图 + 柱状图

在 src 目录下，新建一个 components 文件夹，用来存放我们的图表组件，然后新建一个 LineBarChart.js，用来展现折线柱状图组件：

位置：`src/components/LineBarChart.js`

```js
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function LineBarChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    const option = {
      legend: {
        data: [
          "3-11岁任务数",
          "3-11岁全程接种量",
          "60岁任务数",
          "60岁全程接种量",
          "80岁任务数",
          "80岁全程接种量",
          "完成率",
        ],
      },
      xAxis: {
        type: "category",
        data: ["街道1", "街道2", "街道3", "街道4", "街道5", "街道6", "街道7"],
      },
      yAxis: [
        { type: "value" },
        {
          type: "value",
          name: "%",
          nameTextStyle: {
            color: "#ccc",
            padding: [0, 0, 10, -30],
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              width: 1,
              color: ["#ccc", "#ccc"],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          color: "#fff",
          align: "left",
          fontSize: 14,
        },
        backgroundColor: "rgba(0,0,0,0.8)",
      },
      series: [
        {
          name: "3-11岁任务数",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
        {
          name: "3-11岁全程接种量",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
        {
          name: "60岁任务数",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "bar",
        },
        {
          name: "60岁全程接种量",
          data: [880, 30, 124, 118, 35, 47, 160],
          type: "bar",
        },
        {
          name: "80岁任务数",
          data: [660, 30, 124, 118, 35, 47, 160],
          type: "bar",
        },
        {
          name: "80岁全程接种量",
          data: [880, 30, 124, 118, 35, 47, 160],
          type: "bar",
        },
        {
          name: "完成率",
          data: [50, 130, 124, 18, 35, 47, 160],
          yAxisIndex: 1,
          type: "line",
          smooth: true,
        },
      ],
    };
    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>React Echarts 折线+柱状图</h2>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}

export default LineBarChart;
```

效果如下:

![kalacloud-卡拉云-低代码平台](./images/02-kalacloud-react-echarts-line.png)

当然，如果你完全不想处理前端问题，直接在卡拉云拖拽一个图表组件，然后把 Echarts 代码直接贴进去就能生成图表。
![kalacloud-echarts](./images/kalacloud-echarts.jpg)

当然，你也可以把做好的图表一键分享给同事使用，或嵌入在你自己的网页里，像下面这样。

<EmbedApp
publishedLink={"https://my.kalacloud.com/apps/1zy4x4kwxm/published"}
title={"卡拉云 Ehcarts 图表 DEMO"}
/>


以上就可以结合 `React`，就可以实现一个简单的折线图、柱状图。了解更多折线图、柱状图等可看我们的 [Echart 系列教程](/category/echart/)。
- [Echarts 折线图完全配置指南 ](/blog/vue-echarts-line-tutorial/)
- [Echarts 折线图、柱状图、饼图多种渐变色设置指南](/blog/how-to-add-gradient-color-in-echarts/)
- [Echarts 关系图完全配置指南](/blog/echarts-graph-tutorial/)
- [如何设置 Echarts 标线（markLine）及平均值、最大最小值及颜色](/blog/echarts-markline-tutorial/)
- [ECharts 饼图颜色设置教程](/blog/set-pie-chart-color-from-echarts/)

在本教程中，我挑两个重点讲一下，着重讲讲 `series`，`xAxis` 这两个属性配置，series 表示一个系列的数据，type 表示系列类型；xAxis 表示 x轴的数据。它们是一个数组，必须保持数据的有序性和一一对应，否则会出现数据错乱。`Echart` 的的主要 `API` 就是 `setOption`，我们可以利用这个，封装一个通用的图表组件，还可以统一处理自适应，容错等问题。

扩展阅读：《[最好的 6 个 React Table 组件详细亲测推荐](/blog/best-react-table-component/)》

## React Echarts 封装通用图表组件

在 components 文件夹下新建 `Chart.js` 文件：

```js
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Chart({ options }) {
  const chartRef = useRef(null);
  let chartInstance = null;

  // 定义渲染函数
  function renderChart() {
    try {
      // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 options 发生改变的时候，不需要
      // 重新创建图表，而是复用该图表实例，提升性能
      const renderedInstance = echarts.getInstanceByDom(chartRef.current);
      if (renderedInstance) {
        chartInstance = renderedInstance;
      } else {
        chartInstance = echarts.init(chartRef.current);
      }
      chartInstance.setOption(options);
    } catch (error) {
      console.error("error", error.message);
      chartInstance && chartInstance.dispose();
    }
  }

  // 定义窗口大小发生改变执行的回调函数
  function resizeHandler() {
    chartInstance.resize();
  }

  // 页面初始化时，开始渲染图表
  useEffect(() => {
    renderChart();

    return () => {
      // 销毁图表实例，释放内存
      chartInstance && chartInstance.dispose();
    };
  }, []);

  // 监听窗口大小改变
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div>
      <h2>折线+柱状图</h2>
      <div style={{ height: "400px" }} ref={chartRef} />
    </div>
  );
}

export default Chart;
```

我在代码里做了详细的注释，方便大家理解。以上就实现了一个通用的图表组件，只需要传入 `options` 即可，我们来使用以下这个组件，修改 `App.js` 如下：

```js
import Chart from "./compoennts/Chart";

const options = {
  tooltip: {},
  legend: {
    data: ["销量"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

function App() {
  return (
    <div className="App">
      <Chart options={options} />
    </div>
  );
}

export default App;
```

简单明了，效果如下：

![kalacloud-卡拉云-低代码平台](./images/03-kalacloud-react-echarts-common.png)


封装通用组件的好处就是可以让我们更关注业务实现，不需要去关心底层图表具体的实现方式，后面我会给大家介绍如何使用卡拉云搭建图表系统，让我们只关注业务层，无需关心代码实现。

扩展阅读：《[最好用的 5 款 React 富文本编辑器](/blog/top-5-rich-text-editors-for-react/)》

## 基于 Ant Design React 搭建数字币走势数据看板

本节我们使用国内最常用的 [React UI 框架](/blog/best-react-ui-component-libraries/) Ant Design React 来手把手教大家搭一套极简版数字币走势数据看板，帮助大家加深理解 `Echarts`。首先，我们需要安装 `antd` 作为项目的 `UI` 框架，然后还需要安装 `axios` 来发送请求获取数据，还需要 `dayjs` 方便我们处理日期：

```js
yarn add antd axios dayjs
```

安装成功后，在 `index.js` 导入 `antd` 的 样式文件

```js
import "antd/dist/antd.min.css"
```

接下来就可以正式进入开发了，首先说明下我们要做的事情：
1. 封装工具类，用来处理公共请求，日期等场景
2. 实现一个趋势图组件，用来显示币种的价格走势

第一步，先封装一个工具类，在 `src` 目录下新建 `utils` 文件夹，然后新建 `request.js` 文件，用来处理请求发送：

```js
import axios from "axios";

const apiKey = "B8XHZFRRAIWTAMDHZXWSNHB0IHVT1HGF7JS6DPHA";

export const request = axios.create({
  baseURL: "https://data.mifengcha.com",
  headers: { "X-API-KEY": apiKey },
});
```

这里是我申请的 `API key`，大家直接使用就可以了，不是文章的重点。接着我们再新建一个文件 `days.js`，用来处理日期范围相关的逻辑：

```js
import dayjs from "dayjs";

export const getTimestamp = (day) => {
  return dayjs().subtract(day, "day").valueOf();
};

export const getDates = (day) => {
  return new Array(day)
    .fill(0)
    .map((d, index) => dayjs().subtract(index, "day").format("YYYY-MM-DD"));
};
```

把上面的代码直接粘贴即可。然后我们还需要发送请求，所以在 `src` 目录下 新建 `service` 文件夹，新建一个 `chartAPI.js`，统一存放我们要发送的请求url：

```js
import { request } from "../utils/request";

export const getData = (params) => {
  return request.get("/api/v3/price/history", { params });
};
```

创建完之后，就可以开始编写真正的渲染组件了，还记得第一节封装的通用图表组件吗，现在我们就可以直接使用这个组件了，在 `components` 下创建趋势图组件 `LineBarChart.js`，用来展示单个趋势图：

```js
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
```

以上代码编写完成后，还有最后一步，就是使用这个趋势图组件，修改 `App.js` 如下:

```js
import { Row, Col, Select, Form } from "antd";
import { useState } from "react";
import TrendChart from "./compoennts/TrendChart";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  style: { width: "400px" },
};

function App() {
  const [day, setDay] = useState(7);

  return (
    <div className="App">
      <h2>数字币走势数据看板</h2>
      <Form {...layout}>
        <Form.Item label="周期">
          <Select defaultValue={7} onChange={setDay}>
            <Option value={7}>7天</Option>
            <Option value={30}>30天</Option>
          </Select>
        </Form.Item>
      </Form>
      <Row>
        <Col span={12}>
          <h3>比特币</h3>
          <TrendChart slug="bitcoin" day={day} />
        </Col>
        <Col span={12}>
          <h3>狗币</h3>
          <TrendChart slug="dogecoin" day={day} />
        </Col>
        <Col span={12}>
          <h3>以太坊</h3>
          <TrendChart slug="ethereum" day={day} />
        </Col>
        <Col span={12}>
          <h3>币安币</h3>
          <TrendChart slug="binance-coin" day={day} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
```

然后打开浏览器 http://localhost:3000，就可以看到最终效果了：

![kalacloud-卡拉云-低代码平台](./images/04-kalacloud-react-echarts-project.gif "04-kalacloud-react-echarts-project.gif")

本文所有代码均在 [github](https://github.com/kalacloudCode/react-echarts-tutorial) 可以找到。

扩展阅读：《[React form 表单验证终极教程](/blog/react-form-validate-tutorial/)》

## React Echarts 与卡拉云

本文详细讲解新版 React 中如何引入 Echarts。其实如果你根本不想处理复杂的前端问题，完全可以使用卡拉云来搭建数据看板，卡拉云内置包括 Echarts 在内的多种常用组件，无需懂任何前端，仅需拖拽即可快速生成，一键连接后端数据源，极速开发后台管理工具。

下图是用卡拉云搭建的「数字币数据看板」
<EmbedApp
publishedLink={"https://my.kalacloud.com/apps/2rmxksczrp/published"}
title={"卡拉云数字币走势数据看板"}
/>

可直接分享给同事一起使用：[https://my.kalacloud.com/apps/2rmxksczrp/published](https://my.kalacloud.com/apps/2rmxksczrp/published)

卡拉云是新一代低代码开发平台，与 React 这类框架相比，卡拉云无需配置开发环境，[直接注册](https://my.kalacloud.com/signup)即可开始搭建。开发者无需处理任何前端问题，简单拖拽即可生成图表、表格、表单、富文本等功能组件，一键接入数据库及 API，快速完成企业内部工具搭建，还可以分享给团队成员共享使用，数周的开发时间，缩短至 1 小时。

扩展阅读：
- [最好用的 8 款 React Datepicker 时间日期选择器测评推荐](/blog/best-react-date-timepicker-components/)
- [React Router 6 (React路由) 最详细教程](/blog/react-router-tutorial/)
- [React Draggable 实现拖拽 - 最详细中文教程](/blog/react-draggable-tutorial/)
- [最好的 6 款 React admin 后台管理系统模板和框架](/blog/best-react-admin-dashboard/)