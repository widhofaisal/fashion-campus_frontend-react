import Link from 'next/link';
import { Col, Card } from 'antd';
import styled from "styled-components";

const { Meta } = Card;

const ShowcaseCol = styled(Col)`
    margin-bottom: 2vh;
`;

function ProductBox(item) {
    const formatNumberCurrency = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var extraDesc = item.details ? (" (Size: "+item.details.size + " - " + item.details.quantity+")") : "";
    var price ="Rp. "+ formatNumberCurrency(item.details ? (item.price * item.details.quantity) : item.price);

    return (
        <ShowcaseCol key={item.name} span={8}>
            <Link href={`/product/detail/${item.pId}`}>
                <Card
                    hoverable
                    cover={<img alt={item.name} src={item.image} />}
                >
                    <Meta title={item.name+extraDesc} description={price} />
                </Card>
            </Link>
        </ShowcaseCol>
    );
}

export default ProductBox;