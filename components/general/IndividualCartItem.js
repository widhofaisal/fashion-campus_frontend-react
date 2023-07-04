import Image from "next/image";

import { Row, Col, Typography, Button } from "antd"
import { DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";

//Use Redux
import { useDispatch } from "react-redux";
import { removeItemCartHandler } from "../../store/features/cartReducer";

const { Title } = Typography;

//Styling components
const CartPicture = styled.img`
    width: 15vw;
    margin-bottom: 1vh;
`;

function IndividualCartItem(props) {
    const dispatch = useDispatch();

    const deleteItemHandler = () => {
        //dispatch(removeItemCartHandler({itemId: props.itemId, size: props.size}));
        props.onDelete(props.itemId)
    }

    return (
        <Row gutter={16}>
            <Col span={10}>
                <CartPicture src={props.picture} />
            </Col>
            <Col span={14}>
                <Title level={5}>{props.itemName}</Title>
                Size: {props.size}
                <br />
                Qty: {props.qty}
                <br />
                <Button type="primary" danger onClick={deleteItemHandler}><DeleteFilled /></Button>
            </Col>
        </Row>
    )
}

export default IndividualCartItem;