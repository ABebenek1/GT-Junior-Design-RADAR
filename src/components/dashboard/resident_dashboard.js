import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./resident_dashboard.css";

// dummy graph image files to be removed
import EmoryLogo from "../../images/emory.png";

// Rechart UI
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
} from "recharts";

// ANTD UI
import { Col, Row } from "antd";
import { Layout } from "antd";
import { Button } from "antd";
import { DatePicker, message } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

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

const barData = [
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

const scatterData = [
  { x: 100, y: 90, z: 90 },
  { x: 45, y: 70, z: 20 },
  { x: 80, y: 50, z: 20 },
  { x: 120, y: 20, z: 20 },
  { x: 170, y: 40, z: 30 },
  { x: 140, y: 60, z: 60 },
  { x: 150, y: 80, z: 70 },
  { x: 65, y: 40, z: 20 },
  { x: 110, y: 50, z: 50 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const Resident_dashboard = () => {
  const [image, setImage] = useState("BarImage");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);

  // https://jontkoh2424.medium.com/connecting-react-to-express-server-48948b74d091
  useEffect(() => {
    // hard-coded username to be apple
    // TODO: not hard code the username
    const url = "localhost:8000/user/apple";

    async function fetchData() {
      const response = await fetch(url); // resp is a blob, binary data
      const json = await response.json(); // parse response as json
      setData(json);
    }

    fetchData(url);
  }, []);

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
      setImage("PieImage");
    }

    if (valueSelectedByUser === 3) {
      setImage("ScatterImage");
    }
  };

  return (
    <>
      <Layout>
        <Header style={headerStyle}>
          <Row>
            <Link to="/sign-in">
              <img src={EmoryLogo} width="60px" />
            </Link>
            {/* Need to figure out a way to not hard code this span portion */}
            <Col span={8}></Col>
            <Title style={{ color: "white" }}>Resident Dashboard</Title>
          </Row>
        </Header>
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

      {image === "BarImage" && (
        <div className="content">
          <BarChart
            width={1000}
            height={600}
            data={barData}
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

      {image === "PieImage" && (
        <div className="content">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            {/* <Pie
              dataKey="value"
              data={data02}
              cx={500}
              cy={200}
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
            /> */}
            <Tooltip />
          </PieChart>
        </div>
      )}
      {image === "ScatterImage" && (
        <div className="content">
          <ScatterChart
            width={1000}
            height={600}
            data={scatterData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="count" />
            <YAxis type="number" dataKey="y" name="accuracy" unit="%" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="A school" data={scatterData} fill="#8884d8" />
          </ScatterChart>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Resident_dashboard;
