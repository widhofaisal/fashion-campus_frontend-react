import { useState, useEffect, Fragment, useRef } from "react";
import Link from "next/link";

import { Typography, Row, Col, Button, Input, DatePicker, Divider, Select, notification } from "antd";
import MaskedInput from 'antd-mask-input';
import styled from "styled-components";

import PublicLayout from "../layouts/PublicLayout";
import IndividualCartItem from "../components/general/IndividualCartItem";

import { EndPoint, CartApi, UserShippingAddress, ShippingPrice } from "../SystemApis";
import { getCookie } from 'cookies-next';

//Use Redux
import { useDispatch, useSelector } from "react-redux";
import { cartItems, clearCartHandler } from "../store/features/cartReducer";

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

const PaymentOptionButton = styled(Button)`
    color: white;
    background-color: #237804;
    margin: 0.5vh 0.25vw;
    &:hover, :active, :focus {
        border: none;
        color: white;
        background-color: #52c41a;
    }
`;

const PaymentInput = styled(Input)`
    border-bottom: 2px solid darkgray;
    &:hover, :focus{
        border-bottom: 2px solid darkgray;
    }
`;

const PaymentInputMaskedInput = styled(MaskedInput)`
    border-bottom: 2px solid darkgray;
    &:hover, :focus{
        border-bottom: 2px solid darkgray;
    }
`;

const DatePickerInput = styled(DatePicker)`
    border: transparent;
    background-color: transparent;
    border-bottom: 2px solid darkgray !important;
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
    const dispatch = useDispatch;
    const selector = useSelector;
    const cartArr = selector(cartItems);

    const [shippingName, setShippingName] = useState("");
    const [shippingPhone, setShippingPhone] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingMethods, setShippingMethods] = useState([]);

    const [products, setProducts] = useState([]);

    const [subtotal, setSubtotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(-1);
    const [paymentMethod, setPaymentMethod] = useState("");
    const cardNameRef = useRef("");
    const cardNoRef = useRef("");
    const [cardExpMonth, setCardExpMonth] = useState("");
    const [cardExpYear, setCardExpYear] = useState("");
    const cardCvvRef = useRef("");

    useEffect(() => {
        fetch(EndPoint + UserShippingAddress, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                setShippingName(data.data.name);
                setShippingPhone(data.data.phone_number);
                setShippingAddress(data.data.address + ", " + data.data.city);
            });

        fetch(EndPoint + ShippingPrice, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                setShippingMethods(data.data);
            });

        fetch(EndPoint + CartApi, {
            headers: {
                'Authentication': getCookie("userToken")
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setProducts(data.data);

                var productTotal = 0;
                data.data.map(item => {
                    productTotal += (item.price * item.details.quantity);
                });
                setSubtotal(productTotal);
            });


        /*setProducts(cartArr);

        let productsArr = [];
        let productTotal = 0;
        cartArr.map(item => {
            let cart = JSON.parse(item);
            let itemDetail = getDetail(cart.itemId);
            const itemSubtotal = cart.qty * itemDetail.price;
            const itemKey = item.itemId + item.size + item.qty;

            const itemObj = { ...cart, ...itemDetail, itemSubtotal, itemKey };
            productsArr.push(itemObj);
            productTotal += itemSubtotal;
        })

        setProducts(productsArr);*/
        //setSubtotal(productTotal);

    }, [cartArr]);

    const getDetail = itemId => {
        let pDetail = { name: "Product " + itemId, price: 100000, picture: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/4/d1ce779e-adaf-4449-bd52-d91f73dcc23c.jpg.webp?ect=4g" }
        return pDetail;
    }

    const shippingMethodChangeHandler = e => {
        setShippingCost(e);
    }
    const setExpMonthHandler = (date, dateString) => {
        setCardExpMonth(dateString);
    }
    const setExpYearHandler = (date, dateString) => {
        setCardExpYear(dateString);
    }

    const checkoutHandler = () => {
        const cardName = cardNameRef.current.input.value;
        const cardNo = cardNoRef.current.input.value;
        const cardCvv = cardCvvRef.current.input.value;

        if (shippingAddress == "") {
            openNotificationWithIcon("warning", "Please set your shipping address!");
        }
        else if (shippingCost == -1 && products.length != 0) {
            openNotificationWithIcon("warning", "Please set your shipping method!");
        }
        else if (paymentMethod == "" || paymentMethod == "" || cardExpMonth == "" || cardExpYear == "" || cardName == "" || (cardNo == "" || cardNo.indexOf("_") != -1) || (cardCvv == "" || cardCvv.indexOf("_") != -1)) {
            openNotificationWithIcon("warning", "Please check your payment details!");
        }
        else if (products.length == 0) {
            openNotificationWithIcon("warning", "You have no product to proceed!");
        }
        else {
            openNotificationWithIcon("success", "");
            dispatch(clearCartHandler());
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
                                                    />
                                                </Col>
                                                <Col className="gutter-row" span={8}>Rp {formatNumberCurrency(item.price * item.details.quantity)}</Col>
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
                            <Col className="gutter-row" span={8}>Rp {formatNumberCurrency(subtotal)}</Col>
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
                                    <Col span={8}>Rp {formatNumberCurrency(shippingCost == -1 ? 0 : shippingCost)}</Col>
                                </Row>
                            </Fragment>
                        }
                        <Divider />
                        <Row gutter={16}>
                            <PriceTitle className="gutter-row" span={16}>Total</PriceTitle>
                            <Col className="gutter-row" span={8}>Rp {formatNumberCurrency(shippingCost == -1 ? subtotal : (subtotal + shippingCost))}</Col>
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
                            <Title level={5}>Payment Method</Title>
                            <PaymentOptionButton onClick={() => { setPaymentMethod("debit") }}>Credit/Debit Card</PaymentOptionButton>
                            <PaymentOptionButton onClick={() => { setPaymentMethod("gopay") }}>Gopay</PaymentOptionButton>
                            <PaymentOptionButton onClick={() => { setPaymentMethod("ovo") }}>OVO</PaymentOptionButton>
                            <PaymentOptionButton onClick={() => { setPaymentMethod("shopee") }}>Shopee Pay</PaymentOptionButton>
                            <br /><br />
                            Name on Card
                            <PaymentInput bordered={false} ref={cardNameRef} />
                            <br /><br />
                            Card Number
                            <PaymentInputMaskedInput ref={cardNoRef} bordered={false} mask={'0000 0000 0000 0000'} />
                            <br /><br />
                            <Row gutter={16} >
                                <Col className="gutter-row" span={12}>
                                    Exp. Date
                                    <Row gutter={16} >
                                        <Col span={12}>
                                            <Row>
                                                <Col span={23}>
                                                    <DatePickerInput
                                                        format="MM"
                                                        picker="month"
                                                        placeholder="MM"
                                                        onChange={setExpMonthHandler}
                                                    />
                                                </Col>
                                                <Col span={1}>
                                                    /
                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <DatePickerInput
                                                picker="year"
                                                placeholder="YYYY"
                                                onChange={setExpYearHandler}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    CVV
                                    <PaymentInputMaskedInput ref={cardCvvRef} bordered={false} mask={'000'} />
                                </Col>
                            </Row>
                            <br /><br />
                            <CheckoutButton onClick={checkoutHandler}> CHECK OUT </CheckoutButton>
                        </PaymentBox>
                    </Col>
                </Row>
            </CheckoutBox>
        </PublicLayout>
    );
}

export default Checkout;