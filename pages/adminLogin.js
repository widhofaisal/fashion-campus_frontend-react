import { Fragment, useEffect } from "react";
import { setCookie, hasCookie } from 'cookies-next';

import Image from "next/image";
import { useRouter } from "next/router";
import Link from 'next/link';

import styled from "styled-components";
import { EndPoint, SignIn } from "../SystemApis";

import {
  Card,
  Input,
  Button,
  Typography,
  Form,
  notification
} from "antd";
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
  top: 15%;
  left: 40%;
  padding: 10px;

  width: 20vw;
  height: 30vw;
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

function AdminLogin() {
  const router = useRouter();

  //useEffect if the user already login or not - if remember me so get from localstorage
  useEffect(() => {
    if (hasCookie('adminToken')) {
      router.push('/admin');
    }
  });

  const onFinish = (values) => {
    fetch(EndPoint + SignIn, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data.message.indexOf("success"));
        if (data.message.indexOf("success") == -1) {
          notification["error"]({
            message: "Login Failed",
            description: data.message
          })
        } else if (data.user_information.type != "seller") {
          notification["error"]({
            message: "Login Failed",
            description: "Wrong Login Page! you will be redirected to the right login page in 5 seconds!"
          })

          setTimeout(function () {
            router.push('/Login');
          }, 5000);
        }
        else {
          notification["success"]({
            message: "Login Success",
            description: data.message
          });

          setCookie("adminToken", data.token);
          setCookie("adminEmail", data.user_information.email);
          setCookie("adminName", data.user_information.name);
          setCookie("adminPhoneNumber", data.user_information.phone_number);

          setTimeout(function () {
            router.push('/admin');
          }, 5000);
        }
        //setCategoriesNavbar(data.data)
      });
  };

  return (
    <Fragment>
      <WebsiteHead
        title="Login to SC SIM"
        desc="Login page to enter Startup Campus Sistem Informasi"
      />
      <Background>
        <LoginCard>
          <Image
            src="/images/Fashion Campus Logo.png"
            alt="Fashion Campus Logo"
            width={70}
            height={70}
          />
          <Title level={4}>Login to MIS</Title>
          <LoginForm name="login form" onFinish={onFinish}>
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
                Login
              </LoginButton>
            </Form.Item>
          </LoginForm>
        </LoginCard>
      </Background>
    </Fragment>
  );
}

export default AdminLogin;
