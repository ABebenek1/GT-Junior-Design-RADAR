import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./admin_dashboard.css";
import { dummies } from "../../dummy_data_list";
import img0 from "../../images/img0.png";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import img3 from "../../images/img3.png";
import img4 from "../../images/img4.png";

// ANTD UI
import { Layout, Col, Row } from "antd";
import { Space, Table, Tag } from "antd";
import { Button, Popover, message } from "antd";
import { Input } from "antd";
import { Typography } from "antd";
const { TextArea } = Input;
const { Header, Content } = Layout;

const { Title } = Typography;

// // ANTD CSS - TO be migrated to a seperate CSS file
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const Admin_dashboard = () => {
  const [people, setPeople] = useState(dummies);
  const [targetCommentUser, setTargetCommentUser] = useState(null);
  const [targetViewUser, setTargetViewUser] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showViewBox, setShowViewBox] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [img, setImg] = useState(null);

  const handleCommentSubmission = () => {
    messageApi.info(`Comment Submitted for ${targetCommentUser} `);
    // setShowCommentBox(false);
    setTimeout(() => {
      setShowCommentBox(false);
    }, 1000);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span
            onClick={(e) => {
              console.log(record);
              setShowViewBox(true);
              setTargetViewUser(record.firstname + " " + record.lastname);
              setTargetCommentUser(null); // side-effect
              setShowCommentBox(false); // side-effect
              // select random img to display
              const num = getRandomInt(5);
              if (num == 0) {
                setImg(img0);
              } else if (num == 1) {
                setImg(img1);
              } else if (num == 2) {
                setImg(img2);
              } else if (num == 3) {
                setImg(img3);
              } else {
                setImg(img4);
              }
            }}
          >
            <a>View</a>
          </span>
          <span
            onClick={(e) => {
              setShowCommentBox(true);
              setTargetCommentUser(record.firstname + " " + record.lastname);
              setTargetViewUser(null); // side-effect
              setShowViewBox(false); // side-effect
            }}
          >
            <a>Comment</a>
          </span>
          <span
            onClick={(e) => {
              const thisid = record.id;
              console.log(thisid);
              setPeople(people.filter((people) => record.id !== people.id));
            }}
          >
            <a style={{ color: "red" }}>Delete</a>
          </span>
        </Space>
      ),
    },
  ];

  // console.log(people);

  const UserElement = (props) => {
    const { id, firstname, lastname, email, year } = props.user;
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
    );
  };

  function ddaction(e) {
    let row = e.target.parentNode.parentNode;
    let rowdata = document.getElementById(row.id).querySelectorAll("td");
    let name = rowdata[1].innerHTML;

    let action = e.target.value;
    if (action === "delete") {
      let text = "Please confirm that you want delete user: " + name;

      if (window.confirm(text) === true) {
        row.remove();

        for (let i = 0; i < dummies.length; i++) {
          if (dummies[i].id === row.id) {
            dummies.splice(i, 1);
          }
        }
      }
    } else if (action === "comment") {
      let comment = window.prompt("Type out your comment for: " + name, "");

      if (comment != null && comment != "") {
        window.alert("Your comment has been saved");
      }
    } else if (action == "view") {
    }

    // console.log(dummies);
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
        <Table columns={columns} dataSource={people}></Table>
        <Row>
          {showCommentBox ? (
            <span style={{ width: "100%" }}>
              <h2>Leave a Comment for {targetCommentUser}</h2>
              <TextArea placeholder="Leave a comment..." rows={4}></TextArea>
              {contextHolder}
              <Button type="link" onClick={handleCommentSubmission}>
                Submit Comment
              </Button>
            </span>
          ) : null}
        </Row>
        <Row>
          {showViewBox ? (
            <span style={{ width: "100%", textAlign: "center" }}>
              <h2>View {targetViewUser}'s Dashboard</h2>
              <img src={img} width="30%" />
            </span>
          ) : null}
        </Row>
      </Layout>

      {/* Benson's below
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tr>
          <th style={{ width: "10%" }}>ID</th>
          <th>Last, First</th>
          <th>Email</th>
          <th style={{ width: "10%" }}>Year</th>
          <th style={{ width: "25%" }}>Action</th>
        </tr>

        {dummies.map((user) => {
          return <UserElement user={user}></UserElement>;
        })}
      </table> */}
    </>
  );
};

export default Admin_dashboard;
