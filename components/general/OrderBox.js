import { useState, useEffect } from "react";
import Image from "next/image";

import { Card, Row, Col, Divider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import styled from "styled-components";

import { shippingMethods } from "../../SystemConfig";
import ProductBox from "./ProductBox";

import { EndPoint } from "../../SystemApis";

const OrderBoxContainer = styled(Card)`
    margin-bottom: 2vh;
`;

const IdText = styled.span`
    color: gray;
    opacity: 0.7;
    padding-left: 1vw;
`;

const IconCircleOutlined = styled.span`
    border-radius: 20px;
    border: 3px solid black;
    vertical-align: middle;
    padding: 0.5vw;
    padding-bottom: 0.2vw;
    display:inline-block;
`;

const IconCircleOutlinedText = styled.span`
    font-weight: bold;
    font-size: 23px;
    padding-left: 0.3vw;
`;

const IconCircleOutlinedDetailText = styled.div`
    padding-left: 3vw;
`;
const IconCircleOutlinedDetailTextDiv = styled.div`
    padding-left: 3vw;
`;

const StatusBox = styled.div`
    &.active {
        font-weight: bold;
    }
    text-align: center;
    display: inline-block;
    vertical-align: top;
`;

const IconCircleFilled = styled.span`
    border-radius: 20px;
    background-color: aquamarine;
    vertical-align: middle;
    padding: 0.5vw;
    padding-bottom: 0.2vw;
    display:inline-block;
    .active & {
        background-color: mediumaquamarine;
    }
`;

const DividerStatus = styled(Divider)`
    width: 10vw;
    min-width: 1vw;
    display: inline-block;
    border-top: 3px solid aquamarine;
    margin-top: 2vh;
    &.active {
        border-top: 3px solid mediumaquamarine;
    }
`;

const ProductsList = styled.div`
    padding-top: 1vw;
`;


function OrderBox(props) {
    //const [dateStr, setDateStr] = useState("");
    const { orderStatus, products } = props;

    /*useEffect(() => {
        console.log(props.date);
        setDateStr(new Date(props.date).toLocaleString('en-US', {
            weekday: 'short', // long, short, narrow
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
            second: 'numeric', // numeric, 2-digit
        }));

    }, [])*/


    return (
        <OrderBoxContainer key={`Order${props.id}`}>
            <CalendarOutlined /> {props.date} <br />
            <IdText>#ID {props.idItem}</IdText> <br /><br />

            <Row gutter={16}>
                <Col span={12}>
                    <IconCircleOutlined>
                        <Image
                            src="/images/icons/cargo-truck.png"
                            alt="Shipping Icon"
                            width={15}
                            height={15}
                        />
                    </IconCircleOutlined><IconCircleOutlinedText>Shipping</IconCircleOutlinedText> <br />
                    <IconCircleOutlinedDetailText>
                        {props.shpMthd} <br />
                        Status: <b>{props.orderStatus}</b>
                    </IconCircleOutlinedDetailText>
                    {/*shippingMethods.map(shipMethod => {
                        if (shipMethod.price == props.shpMthd) {
                            return (<IconCircleOutlinedDetailText>{shipMethod.name}</IconCircleOutlinedDetailText>);
                        }
                    })*/} 
                </Col>
                <Col span={12}>
                    <IconCircleOutlined>
                        <Image
                            src="/images/icons/placeholder-filled-point.png"
                            alt="Pinpoint Icon"
                            width={15}
                            height={15}
                        />
                    </IconCircleOutlined><IconCircleOutlinedText>Shipping Address</IconCircleOutlinedText> <br />
                    {/*<IconCircleOutlinedDetailTextDiv dangerouslySetInnerHTML={{ __html: props.address }} />*/}
                    <IconCircleOutlinedDetailTextDiv>
                        {props.address.name}<br/>
                        {props.address.phone_number}<br/>
                        {props.address.address}, {props.address.city}<br/>
                    </IconCircleOutlinedDetailTextDiv>
                </Col>
            </Row> <br />
            <IconCircleOutlinedText>Order Status</IconCircleOutlinedText> <br />
            <div>
                <StatusBox className={`${orderStatus == "waiting" ? "active" : ""}`}>
                    <IconCircleFilled>
                        <Image
                            src="/images/icons/check-mark.png"
                            alt="Approved Icon"
                            width={15}
                            height={15}
                        />
                    </IconCircleFilled><br />
                    Waiting for <br />
                    Confirmation
                </StatusBox>
                <DividerStatus className={`${orderStatus == "processed" ? "active" : ""}`} />
                <StatusBox className={`${orderStatus == "processed" ? "active" : ""}`}>
                    <IconCircleFilled>
                        <Image
                            src="/images/icons/box.png"
                            alt="Processed Icon"
                            width={15}
                            height={15}
                        />
                    </IconCircleFilled><br />
                    Processed
                </StatusBox>
                <DividerStatus className={`${orderStatus == "delivered" ? "active" : ""}`} />
                <StatusBox className={`${orderStatus == "delivered" ? "active" : ""}`}>
                    <IconCircleFilled>
                        <Image
                            src="/images/icons/shopping-bag.png"
                            alt="Delivered Icon"
                            width={15}
                            height={15}
                        />
                    </IconCircleFilled><br />
                    Delivered
                </StatusBox>
                <DividerStatus className={`${orderStatus == "arrived" ? "active" : ""}`} />
                <StatusBox className={`${orderStatus == "arrived" ? "active" : ""}`}>
                    <IconCircleFilled>
                        <Image
                            src="/images/icons/received.png"
                            alt="Arrived Icon"
                            width={15}
                            height={15}
                        />
                    </IconCircleFilled><br />
                    Arrived
                </StatusBox>
            </div>
            <ProductsList>
                <Row gutter={16}>
                    {products.map(item => {
                        return (
                            <ProductBox
                                key={item.name}
                                pId={item.id}
                                name={item.name}
                                image={EndPoint + item.image}
                                price={item.price}
                                details={item.details}
                            />
                        );
                    })}
                </Row>
            </ProductsList>
        </OrderBoxContainer>
    )
}


export default OrderBox;