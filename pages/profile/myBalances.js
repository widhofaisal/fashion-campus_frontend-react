import { useState, useEffect } from "react";

import { EndPoint, UserBalances } from "../../SystemApis";
import { getCookie } from 'cookies-next';

import { Divider, Typography, Form, Button, notification, InputNumber } from "antd";
import styled from "styled-components";

import ProfilePageLayout from "../../layouts/ProfilePageLayout";
import PublicLayout from "../../layouts/PublicLayout";

const { Title, Text } = Typography;

//Styling components
const BalancePageDivider = styled(Divider)`
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

function MyBalances() {
    const [balances, setBalances] = useState(0);

    const [form] = Form.useForm();

    useEffect(()=>{
        fetch(EndPoint + UserBalances, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                setBalances(data.data.balance);
            });
    },[]);

    const onFinish = (values) => {
        //console.log('Received values of form:', values);
        fetch(EndPoint + UserBalances, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authentication': getCookie("userToken")
            },
            body: JSON.stringify({
                amount: values.amount
            })
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                notification["success"]({
                    message: "Top Up Success",
                    description: "Your Top Up Has Been Added To Your Balance"
                });

                setBalances(data.data.balance);
                form.setFieldsValue({
                    amount: 0,
                });
            });
    };

    return (
        <PublicLayout title="My Balances">
            <ProfilePageLayout menuKey="myBalances">
                <Title level={3}>My Balances</Title>
                <Text strong>Your Balances : {balances} <br /></Text>
                <BalancePageDivider />
                <Title level={3}>Top Up</Title>
                <Form
                    form={form}
                    name="balanceForm"
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item label="Amount: " name="amount">
                        <InputNumber min={0} defaultValue={0} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </ProfilePageLayout>
        </PublicLayout>
    );
}

export default MyBalances;