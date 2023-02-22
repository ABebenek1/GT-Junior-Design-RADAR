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
  color: "white",
  backgroundColor: "#108ee9",
};

export default function Login() {
  // event handle when clicking submit button
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
          <Row>
            <Col span={24}>
              <img
                src={EmoryLogo}
                alt="logo"
                className="logo"
                style={{ height: "260px" }}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
