import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Typography, Row, Col, Button, Divider, Select, notification } from "antd";
import styled from "styled-components";

import PublicLayout from "../layouts/PublicLayout";
import IndividualCartItem from "../components/general/IndividualCartItem";

import { EndPoint, CartApi, UserShippingAddress, ShippingPrice, UserBalances, OrderApi } from "../SystemApis";
import { getCookie } from 'cookies-next';

const { Title } = Typography;
const { Option } = Select;

//Styling components
const CheckoutBox = styled.div`
    margin: 2vh 3vw;
`;

const PaymentBox = styled.div`
    background-color: lightgray;
    padding: 2vh 3vw;
`;

const CheckoutButton = styled(Button)`
    color: white;
    background-color: #237804;
    padding: 0 10vw;
    &:hover, :active, :focus {
        border: none;
        color: white;
        background-color: #52c41a;
    }
`;

const ChangeAddressLink = styled.u`
    cursor: pointer;
`;

const PriceTitle = styled(Col)`
    text-align: right;
    font-weight: bold;
`;

function Checkout() {
    const router = useRouter();

    const [shippingName, setShippingName] = useState("");
    const [shippingPhone, setShippingPhone] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingSelfAddress, setShippingSelfAddress] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingMethods, setShippingMethods] = useState([]);
    const [balances, setBalances] = useState(0);

    const [products, setProducts] = useState([]);

    const [subtotal, setSubtotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(-1);

    useEffect(() => {
        fetch(EndPoint + UserShippingAddress, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.data){
                    setShippingName(data.data.name);
                    setShippingPhone(data.data.phone_number);
                    setShippingAddress(data.data.address + ", " + data.data.city);
                    setShippingSelfAddress(data.data.address);
                    setShippingCity(data.data.city);
                }
            });

        fetch(EndPoint + ShippingPrice, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.data){
                    setShippingMethods(data.data);
                }
            });

        fetch(EndPoint + UserBalances, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                setBalances(data.data.balance);
            });

        fetch(EndPoint + CartApi, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data.data);
                setProducts(data.data);

                var productTotal = 0;
                data.data.map(item => {
                    productTotal += (item.price * item.details.quantity);
                });
                setSubtotal(productTotal);
            });

    }, []);

    const shippingMethodChangeHandler = e => {
        setShippingCost(e);
    }

    const checkoutHandler = () => {

        if (shippingAddress == "") {
            openNotificationWithIcon("warning", "Please set your shipping address!");
        }
        else if (shippingCost == -1 && products.length != 0) {
            openNotificationWithIcon("warning", "Please set your shipping method!");
        }
        else if (products.length == 0) {
            openNotificationWithIcon("warning", "You have no product to proceed!");
        }
        else {
            var shipping_mtd = shippingMethods.find(o => o.price === shippingCost);
            //console.log(shipping_mtd.name)
            fetch(EndPoint + OrderApi, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authentication': getCookie("userToken")
                },
                body: JSON.stringify({
                    shipping_method: shipping_mtd.name,
                    shipping_address: {
                        "name" : shippingName,
                        "phone_number": shippingPhone,
                        "address": shippingSelfAddress,
                        "city": shippingCity
                    }
                })
            })
                .then(response => response.json())
                .then(data => {
                    openNotificationWithIcon("success", data.message);

                    setTimeout(function () {
                        router.push('/');
                    }, 5000);
                });
            //dispatch(clearCartHandler());
        }
    }

    const openNotificationWithIcon = (type, bodyMessage) => {
        const title = type == "success" ? "Your cart has been checked out!" : "There are some problem on your form!";

        notification[type]({
            message: title,
            description: bodyMessage,
        });
    };

    const formatNumberCurrency = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const deleteItemHandler = itemId => {
        fetch(EndPoint + CartApi + "/" + itemId, {
            method: "DELETE",
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                notification["success"]({
                    message: "Deleted Cart Item Success"
                })
                fetch(EndPoint + CartApi, {
                    headers: {
                        'Authentication': getCookie("userToken")
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        //console.log(data.data);
                        setProducts(data.data);

                        var productTotal = 0;
                        data.data.map(item => {
                            productTotal += (item.price * item.details.quantity);
                        });
                        setSubtotal(productTotal);
                    });
            });
    }

    return (
        <PublicLayout title="Checkout">
            <CheckoutBox>
                <Title level={2}>SHOPPING CART</Title>
                <Row gutter={16}>
                    <Col className="gutter-row" span={16}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={16}><Title level={5}>Products</Title></Col>
                            <Col className="gutter-row" span={8}><Title level={5}>Total Price</Title></Col>

                            {products.length != 0 &&
                                <Fragment>
                                    {products.map((item) => {
                                        return (
                                            <Fragment key={`FragmentCheckout${item.id}`}>
                                                <Col className="gutter-row" span={16}>
                                                    <IndividualCartItem
                                                        picture={EndPoint + item.image}
                                                        itemId={item.id}
                                                        itemName={item.name}
                                                        qty={item.details.quantity}
                                                        size={item.details.size}
                                                        key={item.id}
                                                        onDelete={deleteItemHandler}
                                                    />
                                                </Col>
                                                <Col className="gutter-row" span={8}>Rp. {formatNumberCurrency(item.price * item.details.quantity)}</Col>
                                            </Fragment>
                                        );
                                    })}
                                </Fragment>
                            }
                            {products.length == 0 && "You have no item in the cart!"}

                        </Row>
                        <Divider />
                        <Row gutter={16}>
                            <PriceTitle className="gutter-row" span={16}>Subtotal</PriceTitle>
                            <Col className="gutter-row" span={8}>Rp. {formatNumberCurrency(subtotal)}</Col>
                        </Row>
                        {(shippingAddress != "" && products.length != 0) &&
                            <Fragment>
                                <Title level={5}>Shipping Method</Title>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Select
                                            style={{
                                                width: 120,
                                            }}
                                            onChange={shippingMethodChangeHandler}
                                        >
                                            {shippingMethods.map(item => {
                                                return <Option key={`ShippingMethodOption${item.name}`} value={item.price}>{item.name}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={8}>Shipping fee</Col>
                                    <Col span={8}>Rp. {formatNumberCurrency(shippingCost == -1 ? 0 : shippingCost)}</Col>
                                </Row>
                            </Fragment>
                        }
                        <Divider />
                        <Row gutter={16}>
                            <PriceTitle className="gutter-row" span={16}>Total</PriceTitle>
                            <Col className="gutter-row" span={8}>Rp. {formatNumberCurrency(shippingCost == -1 ? subtotal : (subtotal + shippingCost))}</Col>
                        </Row>
                        <Title level={5}>Shipping Address</Title>
                        {(shippingAddress == "") && "You have not set the shipping address"}
                        {(shippingAddress != "") &&
                            <Fragment>
                                {shippingName}
                                <br />
                                {shippingPhone}
                                <br />
                                {shippingAddress}
                            </Fragment>
                        }
                        <br /><br />
                        <Link href={`/profile/myAccount`}><ChangeAddressLink>Change Address</ChangeAddressLink></Link>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <PaymentBox>
                            <Title level={5}>Your Balance</Title>
                            <Title level={4}>Rp. {formatNumberCurrency(balances)}</Title>
                            <br /><br />
                            {(subtotal + shippingCost) > balances && <Link href={"/profile/myBalances"}><CheckoutButton> TOP UP </CheckoutButton></Link>}
                            {(subtotal + shippingCost) < balances && <CheckoutButton onClick={checkoutHandler}> CHECK OUT </CheckoutButton>}
                        </PaymentBox>
                    </Col>
                </Row>
            </CheckoutBox>
        </PublicLayout>
    );
}

export default Checkout;