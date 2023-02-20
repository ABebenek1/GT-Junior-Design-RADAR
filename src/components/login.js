import React from "react";
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
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  width: "100%",
  // color: "#fff",
  color: "white",
  backgroundColor: "#108ee9",
};

export default function Login() {
  // event handle when clicking submit button
  //   function handleSubmit(event) {
  //     for (var i = 0; i < sessionStorage.length; i++) {
  //       var key = sessionStorage.key(i);
  //       var value = sessionStorage.getItem(key);
  //       const password = value.split(",")[2].split(":")[1];
  //       const usertype = value.split(",")[0].split(":")[1];
  //       if (
  //         JSON.stringify("resident") == usertype &&
  //         state.username === key &&
  //         JSON.stringify(state.password) === password
  //       ) {
  //         history.push("/resident_dashboard");
  //       } else if (
  //         JSON.stringify("admin") == usertype &&
  //         state.username === key &&
  //         JSON.stringify(state.password) === password
  //       ) {
  //         history.push("/admin_dashboard");
  //       }
  //     }
  //   }

  //   //  set username field for state object
  //   const getUsername = (event) => {
  //     state.username = event.target.value;

  //     console.log("Username:", state.username);
  //   };

  //   //  set passowrd field for state object
  //   const getPassword = (event) => {
  //     state.password = event.target.value;

  //     console.log("Password:", state.password);
  //   };
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    sessionStorage.setItem(values.username, JSON.stringify(values));

    // redirect to sign-in
    if (values) {
      navigate("/resident_dashboard");
    }
  };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <div>
      <Layout>
        <Content style={contentStyle}>
          <Title>Sign In</Title>
          <Row>
            <Col flex={2}></Col>
            <Col flex={3}>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
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

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col flex={2}></Col>
          </Row>
          <Row>
            <Col span={24}>
              New User?
              <Link to="/sign-up"> Register</Link>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Link to="/sign-up"> Forget Password</Link>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <img src={EmoryLogo} alt="logo" className="logo" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
