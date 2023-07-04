import { useState, useEffect } from "react";
import { Typography, Divider, Form, Input, Button, notification } from "antd";
import styled from "styled-components";

import { getCookie } from 'cookies-next';

import PublicLayout from "../../layouts/PublicLayout";
import ProfilePageLayout from "../../layouts/ProfilePageLayout";
import { shippingFormStructure } from "../../SystemConfig";

import { EndPoint, UserProfile, UserShippingAddress } from "../../SystemApis";

const { Title, Text } = Typography;
const { TextArea } = Input;

//Styling components
const ProfilePageDivider = styled(Divider)`
    border: 1px solid gray;
`;

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 10,
    },
};

function MyAccountPage() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");

    const [form] = Form.useForm();
    let formItems = [];

    useEffect(() => {
        fetch(EndPoint + UserProfile, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.data){
                    setUserEmail(data.data.email);
                    setUserName(data.data.name);
                    setUserPhone(data.data.phone_number);
                }
            });

        fetch(EndPoint + UserShippingAddress, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.data){
                    form.setFieldsValue({
                        name: data.data.name,
                        phone: data.data.phone_number,
                        address: data.data.address,
                        city: data.data.city
                    });
                }
            });


    }, []);

    const fieldType = (formItem) => {
        const attrs = {
            label: formItem[0],
            name: formItem[1],
        }

        if (formItem[3] != "none") attrs.rules = formItem[3];

        if (formItem[2] == "text") {
            return (
                <Form.Item {...attrs}>
                    <Input />
                </Form.Item>);
        }
        else if (formItem[2] == "multilineText") {
            return (
                <Form.Item {...attrs}>
                    <TextArea />
                </Form.Item>);
        }
    }

    const onFinish = (values) => {
        //console.log('Received values of form:', values);
        fetch(EndPoint + UserShippingAddress, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authentication': getCookie("userToken")
            },
            body: JSON.stringify({
                name: values.name,
                phone_number: values.phone,
                address: values.address,
                city: values.city,
            })
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data.message.indexOf("success") == -1) {
                    notification["error"]({
                        message: "Update Failed",
                        description: data.message
                    })
                } else {
                    notification["success"]({
                        message: "Update Success",
                        description: data.message
                    });
                }
            });
    };

    shippingFormStructure.forEach(formItem => {
        formItems.push(fieldType(formItem));
    })

    return (
        <PublicLayout title="My Account Page">
            <ProfilePageLayout menuKey="myAccount">
                <Title level={3}>General Information</Title>
                <Text strong>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {userName} <br /></Text>
                <Text strong>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {userEmail} <br /></Text>
                <Text strong>Phone Number : {userPhone} <br /></Text>

                <ProfilePageDivider />
                <Title level={3}>Shipping Address</Title>
                <Form
                    form={form}
                    name="shippingForm"
                    {...layout}
                    onFinish={onFinish}
                >
                    {formItems}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </ProfilePageLayout>
        </PublicLayout>
    );
}

export default MyAccountPage;