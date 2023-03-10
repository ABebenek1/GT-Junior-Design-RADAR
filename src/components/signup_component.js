import React, { Component, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { state, storedData } from "../storeData";
import { Layout, Space } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Typography } from "antd";
import { Radio } from "antd";
import { withTheme } from "@emotion/react";
import EmoryLogo from "../images/emory.png";
import { Col, Row } from "antd";
import { borderRadius, style } from "@mui/system";
const { Content } = Layout;
const { Title } = Typography;

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  // lineHeight: "120px",
  // width: "100%",
  color: "white",
  backgroundColor: "#108ee9",

  width:"100vw",
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const containerStyle = {
  width:"900px",
  height:"600px",
  backgroundColor:"lightgray",
  borderRadius:"50px"
}

const titleStyle = {
  width:"100%",
  marginBottom:"30px",
  marginTop:"50px"
}

export default function SignUp() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    sessionStorage.setItem(values.username, JSON.stringify(values));

    // redirect to sign-in
    if (values) {
      navigate("/sign-in");
    }
  };

  return (
    <div>
      <Layout>
        <Content style={contentStyle}>
          <div style={containerStyle}>
          
          <div style={titleStyle}><Title>Sign up to use RADAR</Title></div>

          <Row>
            <Col flex={2}></Col>
            <Col flex={3}>
              
              <Form
                name="basic"
                // labelCol={{
                //   span: 8,
                // }}
                // wrapperCol={{
                //   span: 16,
                // }}
                // style={{
                //   maxWidth: 600,
                // }}
                initialValues={{
                  remember: true,
                }}

                labelAlign="right"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                
                <Form.Item
                  label="User Type"
                  name="usertype"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group value={"resident"}>
                    <Radio value={"resident"}>resident</Radio>
                    <Radio value={"admin"}>admin</Radio>
                  </Radio.Group>
                </Form.Item>


                <Form.Item
                  label="First Name"
                  name="firstname"
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
                  name="lastname"
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

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  // wrapperCol={{
                  //   offset: 8,
                  //   span: 16,
                  // }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
w
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
            <Col span={24}>
              Already registered?
              <Link to="/sign-in"> Sign-in</Link>
            </Col>
          </Row>

          {/* <Row>
            <Col span={24}>
              <img
                src={EmoryLogo}
                alt="logo"
                className="logo"
                style={{ height: "260px" }}
              />
            </Col>
          </Row> */}
          </div>
        </Content>
      </Layout>
    </div>
  );
}
