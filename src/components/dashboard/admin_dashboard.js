import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./admin_dashboard.css";

// ANTD UI
import { Col, Row } from "antd";
import { Layout } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

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

  const UserElement = (props) => {
    const {id, firstname, lastname, email, year} = props.user
    return (
      <tr id={id}>
        <td>{id}</td>
        <td>{lastname + ", " + firstname}</td>
        <td>{email}</td>
        <td>{year}</td>
        <td>
          <select id="ActionDropDown" onChange={ddaction}>
            <option>Select an action for {lastname + ", " + firstname}</option>
            <option value="delete">Delete</option>
            <option value="comment">Comment</option>
            <option value="view">View Profile</option>
          </select>
          {/* <button onClick={testing}>Confirm</button> */}
        </td>

      </tr>
    )
  }

  function ddaction(e) {
    let row = e.target.parentNode.parentNode
    let rowdata = document.getElementById(row.id).querySelectorAll("td");
    let name = rowdata[1].innerHTML;

    let action = e.target.value;
    if (action === "delete") {

      let text = "Please confirm that you want delete user: " + name;

      if (window.confirm(text) === true) {
        row.remove();

        for (let i = 0; i < dummyDataList.length; i++) {
          if (dummyDataList[i].id === row.id) {
            dummyDataList.splice(i, 1)
          }

        }

      }
    }

    // console.log(dummyDataList);
  }

  return (
    <>
      <Layout>
        <Header style={headerStyle}>
          <Row>
            <Link to="/sign-in">
              <button className="logoutButton">Logout</button>
            </Link>
            {/* Need to figure out a way to not hard code this span portion */}
            <Col span={8}></Col>
            <Title style={{ color: "white" }}>Admin Dashboard</Title>
          </Row>
        </Header>
      </Layout>

      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <tr>
          <th style={{width:"10%"}}>ID</th>
          <th>Last, First</th>
          <th>Email</th>
          <th style={{width:"10%"}}>Year</th>
          <th style={{width:"25%"}}>Action</th>
        </tr>

        {dummyDataList.map((user) => {
          return <UserElement user={user}></UserElement>
        })}

      </table>

    </>
  );
};

export default Admin_dashboard;
