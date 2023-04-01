import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./admin_dashboard.css";

// dummy graph image files to be removed
import EmoryLogo from "../../images/emory.png";

// ANTD UI
import { Col, Row } from "antd";
import { Layout } from "antd";
import { Button } from "antd";
import { DatePicker, message } from "antd";
import { Typography } from "antd";
import { List } from "antd";

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

// dummy data
const dummyDataList = [
  {id:"1",    firstname:"Reginald",   lastname:"Aguilar",     email:"dee_gulgowski87@yahoo.com",        year:"1"},
  {id:"2",    firstname:"Dolores",    lastname:"Howard",      email:"saige_graham@hotmail.com",         year:"2"},
  {id:"3",    firstname:"Kristi",     lastname:"Drake",       email:"nona82@gmail.com",                 year:"3"},
  {id:"4",    firstname:"Yolanda",    lastname:"Tucker",      email:"angelina70@gmail.com",             year:"2"},
  {id:"5",    firstname:"Marcus",     lastname:"Cunningham",  email:"kim57@hotmail.com",                year:"2"},
  {id:"6",    firstname:"Benjamin",   lastname:"Ramirez",     email:"frances1@hotmail.com",             year:"2"},
  {id:"7",    firstname:"Tara",       lastname:"Oliver",      email:"neva_parker21@yahoo.com",          year:"1"},
  {id:"8",    firstname:"Melinda",    lastname:"Newton",      email:"velva_homenick65@hotmail.com",     year:"3"},
  {id:"9",    firstname:"Blake",      lastname:"Myers",       email:"rebekah56@yahoo.com",              year:"3"},
  {id:"10",   firstname:"Tabitha",    lastname:"Carlson",     email:"vicenta12@yahoo.com",              year:"3"},
  {id:"11",   firstname:"Diane",      lastname:"Mann",        email:"rod_kutch46@yahoo.com",            year:"2"},
  {id:"12",   firstname:"Tommie",     lastname:"Castro",      email:"casandra_boehm@gmail.com",         year:"3"},
  {id:"13",   firstname:"Mike",       lastname:"Rhodes",      email:"trinity.gusikowski13@yahoo.com",   year:"2"},
  {id:"14",   firstname:"Brittany",   lastname:"Harris",      email:"jonatan.schaefer43@gmail.com",     year:"2"},
  {id:"15",   firstname:"Jackie",     lastname:"Barker",      email:"elijah_blanda@yahoo.com",          year:"1"},
  {id:"16",   firstname:"Jo",         lastname:"Clayton",     email:"demarcus.reinger@yahoo.com",       year:"1"},
  {id:"17",   firstname:"Annette",    lastname:"Daniel",      email:"anjali_jacobson57@hotmail.com",    year:"1"},
  {id:"18",   firstname:"Kathleen",   lastname:"Sparks",      email:"leonora.lynch55@gmail.com",        year:"2"},
  {id:"19",   firstname:"Damon",      lastname:"Moreno",      email:"trycia.williamson@hotmail.com",    year:"3"},
  {id:"20",   firstname:"Irving",     lastname:"Dixon",       email:"bailee_macejkovic@gmail.com",      year:"1"},
  {id:"21",   firstname:"Andrew",     lastname:"Doyle",       email:"neal85@yahoo.com",                 year:"3"},
  {id:"22",   firstname:"Audrey",     lastname:"Curtis",      email:"isom_bailey@gmail.com",            year:"2"},
  {id:"23",   firstname:"Randall",    lastname:"James",       email:"floyd_daniel@gmail.com",           year:"1"},
  {id:"24",   firstname:"Terrence",   lastname:"Hampton",     email:"nasir31@gmail.com",                year:"2"},
  {id:"25",   firstname:"Kelli",      lastname:"Manning",     email:"willy.hansen@hotmail.com",         year:"3"},
]

const Admin_dashboard = () => {

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
            <Title style={{ color: "white" }}>Admin Dashboard</Title>
          </Row>
        </Header>
      </Layout>

      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <tr>
          <th>ID</th>
          <th>Last, First</th>
          <th>Year</th>
          <th>Email</th>
        </tr>

      </table>

    </>
  );
};

const UserElement = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.firstname}</td>
      <td>{props.lastname}</td>
      <td>{props.email}</td>
    </tr>
  )
}

export default Admin_dashboard;
