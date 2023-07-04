import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Row, Col, Card, Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

import PublicLayout from "../../layouts/PublicLayout";
import ProfilePageLayout from "../../layouts/ProfilePageLayout";
import styled from "styled-components";

//Use Redux
import { useDispatch, useSelector } from "react-redux";
import { wishlistItems, addItemWishlistHandler, removeItemWishlistHandler } from "../../store/features/wishlistReducer";

const { Meta } = Card;

//Styling components
const WishlistsShowcase = styled.div`
    clear: both;
`;

const WishlistShowcaseCol = styled(Col)`
    margin-bottom: 2vh;
`;

function WishlistPage() {
    const dispatch = useDispatch();
    const selector = useSelector;
    var wishlistsList = selector(wishlistItems);
    const [wishlistArr, setWishlistArr] = useState([]);

    useEffect(() => {
        setWishlistArr(wishlistsList);
    });

    const RemoveWishlistHandler = (pId) => {
        dispatch(removeItemWishlistHandler({itemId: pId}));
    }


    return (
        <PublicLayout title="My Account Page">
            <ProfilePageLayout menuKey="wishlist">
                {(wishlistArr.length == 0) && "You have no items on the wishlist yet!"}
                {(wishlistArr.length > 0) &&
                    <WishlistsShowcase>
                        <Row gutter={16}>
                            {wishlistArr.map(item => {
                                return (
                                    <WishlistShowcaseCol key={"item " + item} span={8}>
                                        <Card
                                            hoverable
                                            cover={(<Link href={`/product/detail/${item}`}><img alt={"item " + item} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></Link>)}
                                        >
                                            <Meta title={"item" + item} description={(<Button onClick={() => RemoveWishlistHandler(item)} type="primary" danger><DeleteOutlined /></Button>)} />
                                        </Card>
                                    </WishlistShowcaseCol>
                                );
                            })}
                        </Row>
                    </WishlistsShowcase>
                }
            </ProfilePageLayout>
        </PublicLayout>
    );
}

export default WishlistPage;