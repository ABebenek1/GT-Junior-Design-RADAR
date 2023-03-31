import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmoryLogo from "../images/emory.png";
import { state } from "../storeData";
import { history } from "../index";
import { Layout, Space } from "antd";
import { Button, Form, Input, Checkbox } from "antd";
import { Typography } from "antd";
import { Col, Row } from "antd";
const { Content } = Layout;
const { Title } = Typography;

const contentStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  textAlign: "center",
  minHeight: 120,
  color: "black",
  backgroundColor: "#108ee9",
};

const parentDiv = {
  width: "600px",
  height: "500px",
  backgroundColor: "lightgrey",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50px",
};

const divStyle = {
  width: "95%",
  height: "400px",
};

const titleStyle = {
  width: "100%",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const containerStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const checkboxStyle = {
  width: "200px",
};

const pad_down = {
  paddingBottom: "10px",
};

export default function Login() {
  const [signinError, setSignInError] = useState(null);
  // event handle when clicking submit button
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    sessionStorage.setItem(values.username, JSON.stringify(values));

    // check username and password from db
    async function checkUserCred() {
      try {
        const res = await fetch(`http://localhost:8000/sign-in`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
        });

        if (res.status == 401) {
          // password incorrect
          setSignInError("Password incorrect");
        } else if (res.status == 400) {
          // sth went wrong perhaps with server
          setSignInError("Unknown error");
        } else {
          // status 200
          // redirect to dashboard
          navigate("/resident_dashboard");
        }
      } catch (e) {
        console.error(e);
      }
    }
    checkUserCred();
  };

  return (
    <div>
      <Layout>
        <Content style={contentStyle}>
          <div style={parentDiv}>
            <div style={divStyle}>
              <div style={titleStyle}>
                {" "}
                <Title>Welcome to RADAR</Title>{" "}
              </div>
              {/* conditional rendering / null coalescing: AND short circuiting*/}
              {signinError && <Row>{signinError}</Row>}
              <Row>
                <Col flex={2}></Col>
                <Col flex={3}>
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <div>
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
                    </div>

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

                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      style={containerStyle}
                    >
                      <div style={checkboxStyle}>
                        <Checkbox>Remember me</Checkbox>
                      </div>
                    </Form.Item>

                    <Form.Item style={containerStyle}>
                      <Button type="primary" htmlType="submit">
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col flex={2}></Col>
              </Row>

              <Row style={pad_down}>
                <Col span={24}>
                  New User?
                  <Link to="/sign-up" style={{ color: "yellow" }}>
                    {" "}
                    Register{" "}
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Link to="/sign-up" style={{ color: "yellow" }}>
                    {" "}
                    Forget Password
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
