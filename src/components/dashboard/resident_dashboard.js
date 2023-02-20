import React, { useState } from "react";
import "./resident_dashboard.css";

// dummy graph image files to be removed
import BarImage from "../../images/bar.png";
import Pie from "../../images/pie.svg";
import Scatter from "../../images/scatter.jpeg";

// Rechart UI
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ANTD UI
import { Col, Row } from "antd";
import { Layout } from "antd";
import { Button } from "antd";
import { DatePicker, message } from "antd";

const { RangePicker } = DatePicker;

// ANTD CSS - TO be migrated to a seperate CSS file
const { Header, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "black",
  backgroundColor: "#108ee9",
};

// rechart dummy data to be removed

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Resident_dashboard = () => {
  const [image, setImage] = useState("BarImage");
  const [date, setDate] = useState(null);

  const handleDateChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };

  const displayOnChange = (event) => {
    const valueSelectedByUser = parseInt(event.target.value);

    if (valueSelectedByUser === 1) {
      setImage("BarImage");
    }

    if (valueSelectedByUser === 2) {
      setImage("Pie");
    }

    if (valueSelectedByUser === 3) {
      setImage("Scatter");
    }
  };

  return (
    <>
      <Layout>
        <Header style={headerStyle}>Header Bar</Header>
        <Content style={contentStyle}>
          <Row>
            <Col flex={3}>
              <RangePicker onChange={handleDateChange} />
            </Col>
            <Col flex={2}>
              <select
                onChange={displayOnChange}
                className="dropdown"
                name="graphs"
                id="graphs"
              >
                <option value="1">Bar Graph</option>
                <option value="2">Pie Chart</option>
                <option value="3">Scatter plot</option>
              </select>
            </Col>
            <Col flex={2}>
              <select className="dropdown" name="variables" id="variables">
                <option value="v1">Variable 1</option>
                <option value="v2">Variable 2</option>
                <option value="v3">Variable 3</option>
              </select>
            </Col>
            <Col flex={2}></Col>
          </Row>
        </Content>
      </Layout>
      {/* <div className="navcontainer"> */}
      {/* <div className="navbar"> */}
      {/* <label>pick a display</label> */}
      {/* </div> */}

      {image === "BarImage" && (
        <div className="content">
          <BarChart
            width={1000}
            height={600}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
            <Bar dataKey="uv" fill="#ffc658" />
          </BarChart>

          {/* <img className="graph" src={BarImage} alt="picture" /> */}
        </div>
      )}

      {image === "Pie" && (
        <div className="content">
          <img className="graph" src={Pie} alt="picture" />
        </div>
      )}

      {image === "Scatter" && (
        <div className="content">
          <img className="graph" src={Scatter} alt="picture" />
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Resident_dashboard;
