import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  width:"600px",
  height:"500px",
  backgroundColor:"lightgrey",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  borderRadius:"50px",
}

const divStyle = {
  width:"95%",
  height:"400px",
  // backgroundColor:"red"

}

const titleStyle = {
  width:"100%",
  height:"100px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}

const containerStyle = {
  width:"100%",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",

} 

const checkboxStyle = {
  width:"200px",
}

const pad_down = {
  paddingBottom:"10px"
  
}

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

          <div style={parentDiv}>

          <div style ={divStyle}>

          <div style={titleStyle}> <Title>Welcome to RADAR</Title> </div>

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
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
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
                  // wrapperCol={{
                  //   offset: 8,
                  //   span: 16,
                  // }}
                >
                <div style={checkboxStyle}><Checkbox>Remember me</Checkbox></div>
                
                </Form.Item>

                <Form.Item
                  // wrapperCol={{
                  //   offset: 8,
                  //   span: 16,
                  // }}

                  style={containerStyle}
                >
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
          </div>

        </Content>
      </Layout>
    </div>
  );
}
