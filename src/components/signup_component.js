import React, { Component, useState } from "react";
import { state, storedData } from "../storeData";
import { Layout, Space } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Typography } from "antd";
import { Radio } from "antd";
import { withTheme } from "@emotion/react";
import { Col, Row } from "antd";
const { Header, Footer, Sider, Content } = Layout;
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

export default function SignUp() {
  const onFinish = (values) => {
    console.log("Success:", values);
    sessionStorage.setItem(values.username, JSON.stringify(values));
  };

  return (
    <div>
      <Layout>
        <Content style={contentStyle}>
          <Title>Sign Up</Title>

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
                <Form.Item label="User Type" name="usertype">
                  <Radio.Group value={"resident"}>
                    <Radio value={"resident"}>resident</Radio>
                    <Radio value={"admin"}>admin</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="FirstName"
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstname!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="LastName"
                  name="lastname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastName!",
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
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col flex={2}></Col>
          </Row>

          <Row>
            <Col span={24}>Already registered? Sign-in</Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
