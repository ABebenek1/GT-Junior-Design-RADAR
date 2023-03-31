import React, { Component, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { state, storedData } from "../storeData";
import { Layout, Space } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Typography } from "antd";
import { Radio } from "antd";
import { Col, Row } from "antd";
import Axios from "axios";
const { Content } = Layout;
const { Title } = Typography;

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  color: "white",
  backgroundColor: "#108ee9",

  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const containerStyle = {
  width: "900px",
  height: "600px",
  backgroundColor: "lightgray",
  borderRadius: "50px",
};

const titleStyle = {
  width: "100%",
  marginBottom: "30px",
  marginTop: "50px",
};

export default function SignUp() {
  // const [isAdmin, setIsAdmin] = useState(null);
  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [username, setUsername] = useState(null);
  // const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  // maybe use axios in the future
  // https://www.makeuseof.com/react-form-data-mongodb-database-store/

  const onFinish = (values) => {
    // store user info locally
    console.log("Success:", values);
    // console.log(values.password);
    sessionStorage.setItem(values.username, JSON.stringify(values));

    // store user info into database
    async function postData() {
      try {
        // https://stackoverflow.com/questions/61986655/react-hooks-how-to-make-a-post-request-to-server
        await fetch(`http://localhost:8000/sign-up/`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
    postData();
    // redirect to sign-in
    navigate("/sign-in");
  };

  /////
  return (
    <div>
      <Layout>
        <Content style={contentStyle}>
          <div style={containerStyle}>
            <div style={titleStyle}>
              <Title>Sign up to use RADAR</Title>
            </div>

            <Row>
              <Col flex={2}></Col>
              <Col flex={3}>
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  labelAlign="right"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="User Type"
                    name="isAdmin"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Radio.Group value={"admin"}>
                      <Radio value={false}>resident</Radio>
                      <Radio value={true}>admin</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item w>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col flex={2}></Col>
            </Row>

            <Row>
              <Col span={24}>
                Already registered?
                <Link to="/sign-in"> Sign-in</Link>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
