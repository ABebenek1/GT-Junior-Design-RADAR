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
  ResponsiveContainer,
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
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

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

const layoutStyle = {
  width: "100vw",
  height: "100vh",
};

const graphContainer = {
  width: "100%",
  height: "100%",
  backgroundColor: "red",
};

const titleStyle = {
  color: "white",
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

var scatterData = new Array();

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

  const [file, setFile] = useState();
  const [array, setArray] = useState(null);
  const [data, setData] = useState(null);

  // https://jontkoh2424.medium.com/connecting-react-to-express-server-48948b74d091
  useEffect(() => {
    // hard-coded username to be apple
    // TODO: not hard code the username
    const url = "http://localhost:8000/user/apple";

    async function fetchData() {
      try {
        const response = await fetch(url); // resp is a blob, binary data
        const json = await response.json(); // parse response as json
        setData(json);
      } catch (e) {
        console.error(e);
      }
    }
    console.log(data);
    fetchData(url);
  }, []);

  // const processData = (data) => {
  //   console.log(data);
  // };
  // console.log(processData(data));

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    const mapped_array = array.map((d) => Array.from(Object.values(d)));

    for (let i = 0; i < mapped_array.length; i++) {
      if (!(typeof mapped_array[i][1] == "undefined")) {
        scatterData.push({
          x: parseInt(mapped_array[i][0]),
          y: parseInt(mapped_array[i][1]),
        });
      }
    }
    console.log(scatterData);
    let statistics_values = [];
    for (let i = 0; i < mapped_array.length; i++) {
      if (!(typeof mapped_array[i][1] == "undefined")) {
        statistics_values.push(parseInt(mapped_array[i][1]));
      }
    }
    return generateStatistics(statistics_values);
  };

  function generateStatistics(data) {
    const count = data.length;
    const min = Math.min.apply(Math, data);
    const max = Math.max.apply(Math, data);

    var sum = data.reduce(function (a, b) {
      return a + b;
    }, 0);

    const avg = sum / count;

    let stats_array = [];
    stats_array.push(min);
    stats_array.push(max);
    stats_array.push(avg);

    return stats_array;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        let stats_array = csvFileToArray(text);
        document.getElementById(
          "result"
        ).innerHTML += `<div>Min: ${stats_array[0]}</div><br />`;
        document.getElementById(
          "result"
        ).innerHTML += `<div>Max: ${stats_array[1]}</div><br />`;
        document.getElementById(
          "result"
        ).innerHTML += `<div>Average: ${stats_array[2]}</div><br />`;
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Row>
            <Link to="/sign-in">
              <button className="logout">Logout</button>
            </Link>
            {/* Need to figure out a way to not hard code this span portion */}
            <Col span={8}></Col>
            <Title style={titleStyle}>Resident Dashboard</Title>
          </Row>
        </Header>

        <Content style={contentStyle}>
          <Row>
            <Col flex={3}>
              <RangePicker onChange={handleDateChange} />
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "1st menu item",
                      key: "1",
                    },
                    {
                      label: "2nd menu item",
                      key: "2",
                    },
                    {
                      label: "3rd menu item",
                      key: "3",
                    },
                    {
                      label: "4rd menu item",
                      key: "4",
                    },
                  ],
                  onClick: ({ key }) => {
                    message.info(`Click on button ${key}`);
                  },
                }}
              >
                <Button>
                  <Space>
                    Button
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
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
            <Col flex={2}></Col>
          </Row>
        </Content>

        <div style={{ textAlign: "center" }}>
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />
            <button
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Generate Data
            </button>
          </form>
        </div>

        <br />

        <div id="result"></div>

        <div style={graphContainer}>
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
                <XAxis type="number" dataKey="x" name="Day" />
                <YAxis type="number" dataKey="y" name="Score" unit="%" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="A school" data={scatterData} fill="#8884d8" />
              </ScatterChart>
            </div>
          )}
          {/* </div> */}
        </div>
      </Layout>
    </>
  );
};

export default Resident_dashboard;
