import React, { useState } from "react";
import "./resident_dashboard.css";
import Bar from "../../images/bar.png";
import Pie from "../../images/pie.svg";
import Scatter from "../../images/scatter.jpeg";

import { Col, Row } from "antd";
import { Layout } from "antd";
import { Button } from "antd";
import { DatePicker, message } from "antd";

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

const Resident_dashboard = () => {
  const [image, setImage] = useState("");
  const [temp, setTfvalue] = useState("");

  const [date, setDate] = useState(null);
  const handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };

  const displayOnChange = (event) => {
    const valueSelectedByUser = parseInt(event.target.value);
    if (valueSelectedByUser === 1) {
      setImage("Bar");
    }

    if (valueSelectedByUser === 2) {
      setImage("Pie");
    }

    if (valueSelectedByUser === 3) {
      setImage("Scatter");
    }
    setTfvalue("false");
  };

  function handleClick(event) {
    // event.preventDefault();
    setTfvalue("true");
  }

  return (
    <>
      <Layout>
        <Header style={headerStyle}>Header Bar</Header>
        <Content style={contentStyle}>
          <Row>
            <Col flex={4}>
              <DatePicker onChange={handleChange} />
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
            <Col flex={2}>
              <Button onClick={handleClick}>Display Graph</Button>
            </Col>
          </Row>
        </Content>
      </Layout>
      {/* <div className="navcontainer"> */}
      {/* <div className="navbar"> */}
      {/* <label>pick a display</label> */}
      {/* </div> */}

      {temp === "true" && image === "Bar" && (
        <div className="content">
          <img className="graph" src={Bar} alt="picture" />
        </div>
      )}

      {temp === "true" && image === "Pie" && (
        <div className="content">
          <img className="graph" src={Pie} alt="picture" />
        </div>
      )}

      {temp === "true" && image === "Scatter" && (
        <div className="content">
          <img className="graph" src={Scatter} alt="picture" />
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default Resident_dashboard;
