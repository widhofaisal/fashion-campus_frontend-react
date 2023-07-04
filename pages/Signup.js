import { Fragment, useEffect } from "react";
import { hasCookie } from 'cookies-next';

import Image from "next/image";
import { useRouter } from "next/router";
import Link from 'next/link';

import styled from "styled-components";

import { EndPoint, SignUp } from "../SystemApis";

import { Card, Input, Button, Typography, Form, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

//Extending ANTD import
const { Title } = Typography;

//Import Components
import WebsiteHead from "../components/WebsiteHead";

//Styling Components
const Background = styled.div`
  background-color: #143F5D;
  width: 100vw;
  height: 100vh;
`;

const LoginCard = styled(Card)`
  position: relative;
  top: 10%;
  left: 40%;
  padding: 10px;

  width: 20vw;
  height: 45vw;
  border-radius: 10px;
  text-align: center;
`;

const LoginForm = styled(Form)`
  padding-top: 5vh;
  text-align: left;
`;

const LoginInput = styled(Input)`
  margin-bottom: 2vh;
  border-bottom: 1px solid lightgray;
  &:hover,
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const LoginInputPassword = styled(Input.Password)`
  border-bottom: 1px solid lightgray;
  &:hover,
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const LoginButton = styled(Button)`
  background-color: #143F5D;
`;

const SignupText = styled.div`
  padding: 1vh 0;
  font-weight: 400
`;

function Signup() {
  const router = useRouter();

  //useEffect if the user already login or not - if remember me so get from localstorage
  useEffect(() => {
    if (hasCookie('userToken')) {
      router.push('/');
    }
  });

  const onFinish = (values) => {
    //console.log("Success:", values);
    fetch(EndPoint + SignUp, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: values.name, 
        email: values.email, 
        phone_number: values.phone, 
        password: values.password })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data.message.indexOf("success"));
        if (data.message.indexOf("success") == -1) {
          notification["error"]({
            message: "Signup Failed",
            description: data.message
          })
        } else {
          notification["success"]({
            message: "Signup Success",
            description: data.message
          });

          setTimeout(function () {
            router.push('/Login');
          }, 5000);
        }
        //setCategoriesNavbar(data.data)
      });
  };

  return (
    <Fragment>
      <WebsiteHead
        title="Signup to FC SIM"
        desc="Signup page to enter Fashion Campus Sistem Informasi"
      />
      <Background>
        <LoginCard>
          <Image
            src="/images/Fashion Campus Logo.png"
            alt="Fashion Campus Logo"
            width={70}
            height={70}
          />
          <Title level={4}>Signup to MIS</Title>
          <LoginForm name="login form" onFinish={onFinish}>
            Name
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <LoginInput placeholder="Type your name" bordered={false} />
            </Form.Item>
            Email
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  required: false,
                  type: "email",
                  message: "The input is not valid E-mail!",
                }
              ]}
            >
              <LoginInput placeholder="Type your email" bordered={false} />
            </Form.Item>
            Phone Number
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <LoginInput placeholder="Type your phone number" bordered={false} />
            </Form.Item>
            Password
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <LoginInputPassword
                placeholder="Type your password"
                bordered={false}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <LoginButton type="primary" shape="round" block htmlType="submit">
                Signup
              </LoginButton>
            </Form.Item>
            <SignupText>If you already have an account. Please click here to <Link href={'/Login'}>login</Link></SignupText>
          </LoginForm>
        </LoginCard>
      </Background>
    </Fragment>
  );
}

export default Signup;
