import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./resident_dashboard.css";

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
  Cell,
} from "recharts";

// ANTD UI
import {
  Col,
  Row,
  Layout,
  Button,
  DatePicker,
  message,
  Typography,
  Dropdown,
  Space,
} from "antd";

import {
  DownOutlined,
  UserOutlined,
  DotChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const { RangePicker } = DatePicker;

// ANTD CSS - TO be migrated to a seperate CSS file
const { Header, Content } = Layout;

// css styling
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle = {
  width: "100%",
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "black",
  backgroundColor: "#108fe9",
  display: "flex",
  justifyContent: "space-around",
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
  marginLeft: "137px",
  marginTop: "8px",
};

// // rechart dummy data to be removed
// var barDa = new Array();

// scatterplot global data
var scatterDa = new Array();

// // frequency of dates for scatterplot
// var dateFreq = new Array();

//resident dashboard component
const Resident_dashboard = () => {
  const [date, setDate] = useState(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [displayOption, setDisplayOtion] = useState(1);
  const [displayOptionText, setDisplayOptionText] =
    useState("1 Counts per Scan");
  const [scatterData, setScatterData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  // for data selector
  const handleDateChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };

  // dropdown menu for selecting the graph to be displayed
  const onClickDropdown = (event) => {
    // console.log(event);
    setDisplayOtion(parseInt(event.key));
    setDisplayOptionText(event.key);
  };

  // items selection for the dropdown menu
  const items = [
    {
      key: "1 Counts per Scan",
      label: "Counts per Scan",
      icon: <BarChartOutlined />,
    },
    {
      key: "2 Agree/Disagree Rate",
      label: "Agree/Disagree Rate",
      icon: <PieChartOutlined />,
    },
    {
      key: "3 Feedback Score Over Time",
      label: "Feedback Score Over Time",
      icon: <DotChartOutlined />,
    },
  ];

  // Load in data from backend server
  // https://jontkoh2424.medium.com/connecting-react-to-express-server-48948b74d091
  var userData = []; // what a dumbass line
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/user-data`, {
          method: "GET",
          headers: { Authentication: localStorage.getItem("token") },
          credentials: "same-origin",
        });

        const json = await res.json(); // parse response as json

        // setData(json);
        setName(`${json[0].firstname} ${json[0].lastname}`);
        processData(json);
        userData = json; // dumbass line
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  // console.log(scatterData);
  // console.log(barData);

  const processData = (userData) => {
    // console.log("inside processData");
    // console.log(userData);

    const pieScanCount = userData
      .map((obj) => {
        return obj.proc_id;
      })
      .reduce((accumulator, proc) => {
        if (accumulator[proc]) {
          accumulator[proc] = accumulator[proc] + 1;
        } else {
          accumulator[proc] = 1;
        }
        return accumulator;
      }, {});
    const pieProperties = Object.entries(pieScanCount).map(([k, v]) => {
      return { name: k, value: v };
    });
    // look up iife -- un-name fxn expression
    setPieData(pieProperties);
    setBarData(pieProperties);

    const scatterProperties = userData.map((obj) => {
      const shallowCopy = {
        exam_date: new Date(obj.exam_date).getTime(),
        feedback_score: obj.feedback_score,
      };
      return shallowCopy;
    });
    setScatterData(scatterProperties);
  };

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

    const mapped_array = array.map((d) => Array.from(Object.values(d)));

    for (let i = 0; i < mapped_array.length; i++) {
      if (!(typeof mapped_array[i][1] == "undefined")) {
        scatterDa.push({
          x: parseInt(mapped_array[i][0]),
          y: parseInt(mapped_array[i][1]),
        });
      }
    }
    // console.log(scatterData);
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
      scatterDa = [];
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

        const pdf_content = [
          `Min: ${stats_array[0]}\n`,
          `Max: ${stats_array[1]}\n`,
          `Average: ${stats_array[2]}\n`,
        ];
        const download_file = new Blob(pdf_content, { type: "text/plain" });

        const element = document.createElement("a");
        element.href = URL.createObjectURL(download_file);
        element.download = "RADAR_Statistics-" + Date.now() + ".txt";
        document.body.appendChild(element);
        element.click();
      };

      fileReader.readAsText(file);
    }
  };

  const handleClear = (e) => {
    const removedElement = document.getElementById("result");
    removedElement.remove();
    // console.log(data);
  };
  console.log(pieData);

  return (
    <>
      <Layout style={layoutStyle}>
        {/* header */}
        <Header style={headerStyle}>
          <Row>
            <Link to="/sign-in">
              <Button className="logout">
                <ArrowLeftOutlined />
                Logout
              </Button>
            </Link>
            {/* Need to figure out a way to not hard code this span portion */}
            <Col span={5}></Col>

            <Title style={titleStyle} id="title">
              Welcome {name}!
            </Title>
          </Row>
        </Header>

        <Content style={contentStyle}>
          <Row>
            {/* date selector */}
            <Col flex={3}>
              {/* <RangePicker onChange={handleDateChange} /> */}
            </Col>
            <Col flex={3} style={{ margin: 14 }}></Col>
            <Col flex={2}>
              <Dropdown
                menu={{
                  items,
                  onClick: onClickDropdown,
                  selectable: true,
                  defaultSelectedKeys: ["1"],
                }}
              >
                <Typography.Link>
                  <Button style={{ backgroundColor: "white" }}>
                    {displayOptionText.replace(/[0-9]/g, "")}
                    <DownOutlined />
                  </Button>
                </Typography.Link>
              </Dropdown>
            </Col>
          </Row>
        </Content>

        {/* csv stuff */}
        {/* 
        <div style={{ textAlign: "center", backgroundColor: "#108fe9" }}>
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
            <button
              onClick={(e) => {
                handleClear(e);
              }}
            >
              Clear Data
            </button>
          </form>
        </div> */}

        {/* where the statisic are displayed
        <div id="result" style={{ backgroundColor: "black" }}></div> */}

        {/* where the graph is displayed */}
        <Row style={graphContainer}>
          {displayOption === 1 && (
            <Row className="content">
              <BarChart
                width={1000}
                height={600}
                data={barData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Title text="Number of Readings per Scan Type" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" stackId="a" fill="#8884d8" />
              </BarChart>
            </Row>
          )}

          {displayOption === 2 && (
            <Row className="content">
              <PieChart width={500} height={400}>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  <Cell fill="#3356c7" />
                  <Cell fill="#2b733a" />
                  <Cell fill="#8a2828" />
                  <Cell fill="#603181" />
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
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
                <XAxis type="category" dataKey="x" name="Date" />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Frequency"
                  unit=" exams"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="Exam Frequency"
                  data={scatterData}
                  fill="#8884d8"
                />
              </ScatterChart>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Resident_dashboard;
