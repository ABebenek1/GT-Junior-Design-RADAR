import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./resident_dashboard.css";

// Rechart UI
import {
  BarChart,
  Bar,
  Cell,
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

const agreeDisagreeRate = {
  width: "100%",
  height: "100%",
};

const titleStyle = {
  color: "white",
  marginLeft: "137px",
  marginTop: "8px",
};


// rechart dummy data to be removed
var barData = new Array();


// scatterplot global data
var scatterData = new Array();

// frequency of dates for scatterplot
var dateFreq = new Array();

// pie chart global data
var pieData = new Array();

const agreeDisagreeData = [
  { name: "Agree", value: 200 },
  { name: "Agree with Incidental Finding", value: 50 },
  { name: "Disagree", value: 20 },
  { name: "Disagree with Preliminary Report", value: 40 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//resident dashboard component
const Resident_dashboard = () => {
  const [image, setImage] = useState("BarImage");
  const [date, setDate] = useState(null);
  const [file, setFile] = useState();
  const [array, setArray] = useState(null);
  const [data, setData] = useState(null);
  const [metricsOption, setMetricsOption] = useState(null);

  // for data selector
  const handleDateChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };

  // graph selector
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

  // for metric selector
  const displayCategories = (event) => {
    const valueSelectedByUser = parseInt(event.target.value);

    if (valueSelectedByUser === 1) {
    }

    if (valueSelectedByUser === 2) {
    }

    if (valueSelectedByUser === 3) {
    }
  };

  // Load in data from backend server
  // https://jontkoh2424.medium.com/connecting-react-to-express-server-48948b74d091
  var userData = [];
  useEffect(() => {
    // hard-coded username to be apple
    // TODO: not hard code the username
    const url = "http://localhost:8000/user/apple";

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/user-data`, {
          method: "GET",
          headers: { Authentication: localStorage.getItem("token") },
          credentials: "same-origin",
        });

        userData = await res.json(); // parse response as json
        //console.log(userData);
        createBarData(userData);
        setData(userData);
        createPieData(userData);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData(url);

    async function fetchResidentDate() {
      if (scatterData.length != 0) {
        return
      }
      let temp = await fetchData()
      temp = [];
      let residentDate = "";
      dateFreq = [];
      for (let i = 0; i < userData.length; i++) {
        temp[i] = userData[i].exam_date.slice(0, 10)
      }
      for (let j = 0; j < userData.length; j++) {
        if (residentDate.localeCompare(dateFreq[j]) == 0) {
          dateFreq[j]++;
        } else {
          dateFreq[dateFreq.length] = 1
        }
      }
      for (let i = 0; i < userData.length; i++) {
        scatterData.push({x: temp[i], y: dateFreq[i]})
      }
      console.log(scatterData)
      console.log(dateFreq)
    }
    fetchResidentDate()
  }, []);

  function createBarData(userData) {
    let us_count = 0;
    let mri_count = 0;
    let xr_count = 0;
    let ct_count = 0;
    for (let i = 0; i < userData.length; i++) {
      switch (userData[i].proc_id) {
        case "US":
          us_count++;
          break;
        case "MRI":
          mri_count++;
          break;
        case "XR":
          xr_count++;
          break;
        case "CT":
          ct_count++;
          break;
      }
    }
    barData = [{name: "US", count: us_count},
                 {name: "MRI", count: mri_count},
                 {name: "XR", count: xr_count},
                 {name :"CT", count: ct_count}];
    console.log(barData);
  }

  function createPieData(userData) {
    let rpr1 = 0;
    let rpr2 = 0;
    let rpr3 = 0;
    let rpr4 = 0;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].feedback_provided === "No") {
        continue;
      }
      switch (userData[i].feedback_score) {
        case "1":
          rpr1++;
          break;
        case "2":
          rpr2++;
          break;
        case "3":
          rpr3++;
          break;
        case "4":
          rpr4++;
          break;
      }
    }
    pieData = [{"name": "RPR1", "value": rpr1}, {"name": "RPR2", "value": rpr2}, {"name": "RPR3", "value": rpr3}, {"name": "RPR4", "value": rpr4}];
    console.log(pieData);
  }

  const extractDropDownOptions = (data) => {
    if (data === null) {
      return [];
    }
    // extract the metrics name from resp obj's data object
    // Object.keys returns an array of string
    const metricsNames = Object.keys(data.data);
    console.log(metricsNames);
    // metricsNames.map((entry) => {return {label: entry, key: entry }});
    return metricsNames.map((entry) => ({ label: entry, key: entry }));
  };
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
      scatterData = [];
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
    console.log(data);
  };

  return (
    <>
      <Layout style={layoutStyle}>
        {/* header */}
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

            <div>
              {/* date selector */}
              <Col flex={3}>
                <RangePicker onChange={handleDateChange} />
              </Col>
            </div>


            <div>
              {/* graph selector */}
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
            </div>

            <Col flex={2}></Col>
          </Row>
        </Content>


        {/* csv stuff */}

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
        </div>


        {/* where the statisic are displayed */}

        <div id="result" style={{ backgroundColor: "lightblue" }}></div>

        {/* where the graph is displayed */}
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
                <Bar dataKey="count" stackId="a" fill="#8884d8" />
              </BarChart>

              {/* <img className="graph" src={BarImage} alt="picture" /> */}
            </div>
          )}

          {image === "PieImage" && (
            <div className="content">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  nameKey="name"
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
                <XAxis type="category" dataKey="x" name="Date" />
                <YAxis type="number" dataKey="y" name="Frequency" unit=" exams" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Exam Frequency" data={scatterData} fill="#8884d8" />
              </ScatterChart>
            </div>
          )}

        </div>

        {/* the following should be delete if not in use */}
        {/* <div style={agreeDisagreeRate}
      align = "center">
        <select
        onChange={displayCategories}
        className="dropdown"
        name="agreeDisagreeGraphs"
        id="agreeDisagreeGraphs"
        >
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </select>
        <PieChart width={800} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={agreeDisagreeData}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
          >
          {agreeDisagreeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div> */}

      </Layout>
    </>
  );
};

export default Resident_dashboard;
