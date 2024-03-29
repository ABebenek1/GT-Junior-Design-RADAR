import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Button, Form, Input, Checkbox, Radio } from "antd";
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
  const [userRole, setUserRole] = useState(1);

  // keep track of user type for sign-in redirect
  const onChangeUserRole = (e) => {
    setUserRole(e.target.value);
  };

  // event handle when clicking submit button
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    sessionStorage.setItem(values.username, JSON.stringify(values));

    // check username and password from db
    async function checkUserCred() {
      try {
        console.log(values);
        const res = await fetch(`http://localhost:8000/sign-in`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
        });
        if (res.status === 401) {
          // password incorrect
          setSignInError("Password incorrect");
        } else if (res.status === 400) {
          // sth went wrong perhaps with server
          setSignInError("Username not found");
        } else {
          const parsedRes = await res.json();
          localStorage.setItem("token", parsedRes.token);
          // status 200
          // redirect to user dashboard
          console.log(userRole);
          if (userRole === 1) {
            navigate("/resident_dashboard");
          } else if (userRole === 2) {
            navigate("/admin_dashboard");
          }
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
              <Row style={{ color: "red", paddingBottom: "5px" }}>
                <Col flex={3}></Col>
                {/* conditional rendering / null coalescing: AND short circuiting*/}
                {signinError && <Row>{signinError}</Row>}
                <Col flex={3}></Col>
              </Row>
              <Row>
                <Col flex={2}></Col>
                <Col flex={3}>
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
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
                      label="User role"
                      name="userRole"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}
                      style={{ maxWidth: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please choose a user role!",
                        },
                      ]}
                    >
                      <Radio.Group onChange={onChangeUserRole} value={userRole}>
                        <Radio value={1}>Resident</Radio>
                        <Radio value={2}>Admin</Radio>
                      </Radio.Group>
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
                  <Link to="/sign-up">
                    {" "}
                    Register{" "}
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Link to="/sign-up">
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
