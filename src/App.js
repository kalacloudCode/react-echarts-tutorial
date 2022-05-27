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
      <h3>「卡拉云 - 极速搭建企业内部工具，十倍提升开发效率」</h3>
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
